import { Router } from "express"
import { buildBudgetController } from "./budget_controller.js";

export function buildApiController() {
    const router = Router();

    router.use("/budget", buildBudgetController());

    // router.get("/expense", buildExpenseController());

    return router;
}