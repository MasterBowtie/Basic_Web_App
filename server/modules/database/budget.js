import mysql from "mysql2/promise"

export class BudgetRepository {
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
            this.instance = new BudgetRepository();
        }
        return this.instance;
    }

    async getBudgets(active) {
        var query = `SELECT budget_id
            FROM budget ${active === "true" ? "WHERE budget_active = 1": ""}`;
            // console.log(query);
        var [rows] = await this.pool.execute(
            query
        );
        return rows;
    }

    // CREATE budget
    async createBudget(name, period, limit, start, end) {
        var [result] = await this.pool.execute(
            `INSERT INTO budget (budget_name, budget_period, budget_limit, budget_start, budget_end) VALUES (?, ?, ?, ?, ?)`,
            [name, period, limit, start, end]
        );
        return result.insertId;
    }

    // READ Budget
    async getBudget(budgetId) {
        var[rows] = await this.pool.execute(
            `SELECT *
            FROM budget
            WHERE budget_id = ?`
            , [budgetId]
        );
        return rows[0]
    }

    // RE-ACTIVATE budget
    async activateBudget(budget_id) {
        await this.pool.execute(
            `UPDATE budget SET budget_active = 1 WHERE budget_id = ?`,
            [budget_id]
        );
        return {budget_active: true};
    }

    // DISABLE budget 
    async disableBudget(budget_id) {
        await this.pool.execute(
            `UPDATE budget SET budget_active = 0 WHERE budget_id = ?`,
            [budget_id]
        );
        return {budget_active: false};
    }

    // DELETE budget
    async deleteBudget(budgetId) {
        await this.pool.execute(
            `DELETE FROM budget WHERE budget_id = ?`,
            [budgetId]
        );
        return true;
    }

    // Get expenses for a budget
    async getExpensesForBudget(budgetId) {
        const [rows] = await this.pool.execute(
            `SELECT e.expense_id
            FROM expense e
            JOIN expense_budget eb ON e.expense_id = eb.expense_id
            WHERE eb.budget_id = ?`,
            [budgetId]
        );
        return [rows]
    }

}