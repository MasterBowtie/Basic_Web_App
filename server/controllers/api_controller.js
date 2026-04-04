import { Router } from "express"
import { buildBudgetController } from "./budget_controller.js";
import { buildExpenseController } from "./expense_controller.js";

export function buildApiController() {
    const router = Router();

    router.use("/budget", buildBudgetController());

    router.use("/expense", buildExpenseController());

    return router;
}