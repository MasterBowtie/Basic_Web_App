import { Router } from "express";
import { BudgetRepository } from "../modules/database/budget.js"

export function buildBudgetController() {
    const budgetRepository = BudgetRepository.getInstance();
    const router = Router();

    router.get("/", (req, res) => {
        return res.json({results: "Hello Budget!"})
    })

    router.get('/ids/:active', async (req, res) => {
        var results = await budgetRepository.getBudgets(req.params.active)
        return res.json(results);
    })

    router.post("/id", async (req, res) => {
        var results = await budgetRepository.getBudget(req.body.id)
        return res.json(results);
    })

    router.post("/enable", async(req, res) => {
        var result = await budgetRepository.activateBudget(req.body.id)
        return res.json(result);
    })

    router.post("/disable", async (req, res) => {
        var result = await budgetRepository.disableBudget(req.body.id)
        return res.json(result);
    })

    router.post("/expenses", async (req, res) => {
        var result = await budgetRepository.getExpensesForBudget(req.body.id)
        return res.json(result)
    })

    return router;
}