import mysql from 'mysql2/promise'

class ExpenseRepository {
    constructor() {
        this.pool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
    }
    
    static getInstance() {
        if (!this.instance) {
            this.instance = new ExpenseRepository();
        }
        return this.instance;
    }

    // Create expense and link to multiple budgets
    async createExpense(amount, budgetIds, created) {
        var [expenseResult] = await this.pool.execute(
            `INSERT INTO expense (amount) VALUES (?)`,
            [amount, created || new Date()]
        );
        var expenseId = expenseResult.insertId;

        for (let budgetId of budgetIds) {
            await this.pool.execute(
                `INSERT INTO expense_budget (expense_id, budget_id) VALUES (?, ?)`,
                [expenseId, budgetId]
            );
        }
        return expenseId;
    }
    
    // READ Expense
    async  getExpense(expenseId) {
        var [rows] = await this.pool.execute(
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

    // Get budgets for an expense
    async getBudgetsForExpenses(expenseId) {
        var [rows] = await this.pool.execute(
            `SELECT b.*
            FROM budget b
            JOIN expense_budget eb ON b.budget_id = eb.budget_id
            WHERE eb.expense_id = ?`,
            [expenseId]
        );
        return rows;
    }

    // UPDATE Expense
    async updateExpense(expenseId, amount, budgetsIds, created) {
        await this.pool.execute(
            `UPDATE expense
            SET amount = ?,
            created = ?, 
            WHERE expense_id = ?`,
            [amount, created, expenseId]
        );

        var currentBudgets = await this.getBudgetsForExpenses(expenseId);
        var newBudgets = []
        for (let budgetId of budgetsIds) {
            if (!currentBudgets.includes(budgetId)) {
                newBudgets.push(budgetId)
            }
        }

        for (let budgetId of newBudgets) {
            await this.pool.execute(
                `INSERT INTO execute_budget (expense_id, budget_id) VALUES (?, ?)`,
                [expenseId, budgetId]
            )
        }
        return true;
    }

    
// DELETE expense
    async deleteExpense(expenseId) {
        await pool.execute(
            `DELETE FROM expense WHERE expense_id = ?`,
            [expenseId]
        );
        return true;
    }
}