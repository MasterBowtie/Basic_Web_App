import mysql from "mysql2/promise"
import dotenv from "dotenv"

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

// Create a budget
export async function createBudget(name, period, limit) {
    const [result] = await pool.execute(
        `INSERT INTO budget (budget_name, budget_period, budget_limit) VALUES (?, ?, ?)`,
        [name, period, limit]
    );
    return result.insertId;
}

// Create an expense and link to multiple budgets
export async function createExpense(amount, budgetIds, created) {
    const [expenseResult] = await pool.execute(
        `INSERT INTO expense (amount) VALUES (?)`,
        [amount, created || new Date()]
    );
    var expenseId = expenseResult.insertId;
    
    var links = budgetIds.map(budgetIds => [expenseId, budgetIds]);
    await pool.query(
        `INSERT INTO expense_budget (expense_id, budget_id) VALUES ?`,
        [links]
    );

    return expenseId;
}

// READ Expense
export async function getExpense(expenseId) {
    const [rows] = await pool.execute(
        `SELECT e.*,
        GROUP_CONCANT(eb.budget_id) as budgets
        FROM expense e
        LEFT JOIN expense_budget eb
        ON e.expense_id = eb.expense_id
        WHERE e.expense_id = ?
        GROUP BY e.expense_id`,
        [expenseId]
    );

    return rows[0]
}

// READ Budget
export async function getBudget(budgetId) {
    const [rows] = await pool.execute(
        `SELECT *,
        FROM budget
        WHERE budget_id = ?`
        , [budgetId]
    );
    return rows[0]
}


// Get budgets for an expense
export async function getBudgetsForExpenses(expenseId) {
    const [rows] = await pool.execute(
        `SELECT b.*
        FROM budget b
        JOIN expense_budget eb ON b.budget_id = eb.budget_id
        WHERE eb.expense_id = ?`,
        [expenseId]
    );
    return rows;
}

// Get expenses for a budget
export async function getExpensesForBudget(budgetId) {
    const [rows] = await pool.execute(
        `SELECT e.*
        FROM expense e
        JOIN expense_budget eb ON e.expense_id = eb.expense_id
        WHERE eb.budget_id = ?`,
        [budgetId]
    );
    return [rows]
}

// UPDATE Expense
export async function updateExpense(expenseId, amount, budgetsIds, created) {
    await pool.execute(
        `UPDATE expense
        SET amount = ?,
        created = ?, 
        WHERE expense_id = ?`,
        [amount, created, expenseId]
    );

    var currentBudgets = await getBudgetsForExpenses(expenseId);
    var newBudgets = []
    for (let b of budgetsIds) {
        if (!currentBudgets.includes(b)) {
            newBudgets.push(b)
        }
    }

    for (let b of newBudgets) {
        await pool.execute(
            `INSERT INTO execute_budget (expense_id, budget_id) VALUES (?, ?)`,
            [expenseId, b]
        )
    }
    return true;
}

// DELETE expense
export async function deleteExpense(expenseId) {
    await pool.execute(
        `DELETE FROM expense WHERE expense_id = ?`,
        [expenseId]
    );
    return true;
}

// DELETE budget
export async function deleteBudget(budgetId) {
    await pool.execute(
        `DELETE FROM budget WHERE budget_id = ?`,
        [budgetId]
    );
    return true;
}

