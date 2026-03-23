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