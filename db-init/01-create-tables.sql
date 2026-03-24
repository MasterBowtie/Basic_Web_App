CREATE TABLE IF NOT EXISTS expense (
    expense_id int NOT NULL AUTO_INCREMENT,
    created datetime DEFAULT CURRENT_TIMESTAMP,
    amount decimal(10,2) NOT NULL,
    PRIMARY KEY (expense_id)
);

CREATE TABLE IF NOT EXISTS budget (
    budget_id int NOT NULL AUTO_INCREMENT,
    budget_name varchar(255) NOT NULL,
    budget_period varchar(10) NOT NULL,
    budget_limit decimal(10,2),
    PRIMARY KEY (budget_id)
);

CREATE TABLE IF NOT EXISTS expense_budget (
    expense_id INT NOT NULL,
    budget_id INT NOT NULL,
    PRIMARY KEY (expense_id, budget_id),
    FOREIGN KEY (expense_id) REFERENCES expense(expense_id) ON DELETE CASCADE,
    FOREIGN KEY (budget_id) REFERENCES budget(budget_id) ON DELETE CASCADE
);
