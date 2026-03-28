import { Router } from "express";

export function buildBudgetController(budgetRepository) {
    const router = Router();

    router.get("/", (req, res) => {
        return res.json({results: "Hello Budget!"})
    })

    router.get('/ids', async (req, res) => {
        var results = await budgetRepository.getBudgets()
        return res.json(results);
    })
    return router;
}