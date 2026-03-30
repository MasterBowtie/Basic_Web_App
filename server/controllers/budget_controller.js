import { Router } from "express";
import { BudgetRepository } from "../modules/database/budget.js"

export function buildBudgetController() {
    const budgetRepository = BudgetRepository.getInstance();
    const router = Router();

    router.get("/", (req, res) => {
        return res.json({results: "Hello Budget!"})
    })

    router.get('/ids', async (req, res) => {
        var results = await budgetRepository.getBudgets()
        return res.json(results);
    })

    router.post("/id", async (req, res) => {
        console.log("REQUEST BODY:", req.body);
        console.log("REQUEST PARAMS:", req.params);
        console.log("REQUEST QUERY:", req.query);
        var results = await budgetRepository.getBudget(req.body.id)
        console.log("RESULTS:", results);
        return res.json(results);
    })

    return router;
}