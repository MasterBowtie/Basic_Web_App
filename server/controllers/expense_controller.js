import { Router } from "express";
import { ExpenseRepository } from "../modules/database/expense.js"

export function buildExpenseController() {
    const expenseRepository = ExpenseRepository.getInstance();
    const router = Router();

    router.get("/", (req, res) => {
        return res.json({results: "Hello Expense"});
    })

    router.post("/id", async (req, res) => {
        console.log(req.body.id);
        var results = await expenseRepository.getExpense(req.body.id)
        return res.json(results);
    })

    return router;
}