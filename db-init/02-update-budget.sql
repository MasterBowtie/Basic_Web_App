ALTER TABLE budget
    ADD budget_start date,
    ADD budget_end date,
    ADD budget_active boolean;

ALTER TABLE expense
    ADD expense_name varchar(255),
    DROP COLUMN created,
    DROP COLUMN amount,
    ADD expense_created datetime DEFAULT CURRENT_TIMESTAMP,
    ADD expense_amount decimal(10,2) NOT NULL;