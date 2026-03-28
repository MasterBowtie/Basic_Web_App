INSERT INTO budget (budget_name, budget_period, budget_limit, budget_start, budget_end, budget_active) 
    VALUES("Furniture", "month", 200.00, "2026-04-01", "2026-04-30", 1);


INSERT INTO budget (budget_name, budget_period, budget_limit, budget_start, budget_end, budget_active) 
    VALUES("Groceries", "week", 80.00, "2026-03-29", "2026-04-04", 1);

INSERT INTO expense (expense_name, expense_amount)
    VALUES("Hobby", 20.00)

INSERT INTO expense (expense_name, expense_amount)
    VALUES("Wal-Mart", 64.37)

INSERT INTO expense (expense_name, expense_amount)
    VALUES("Smiths", 15.78)

INSERT INTO expense (expense_name, expense_amount)
    VALUES("Wal-Mart Jumper", 50.64)

INSERT INTO expense_budget (expense_id, budget_id)
    VALUES(2, 2)

INSERT INTO expense_budget (expense_id, budget_id)
    VALUES(3, 2)

INSERT INTO expense_budget (expense_id, budget_id)
    VALUES(4, 1)
