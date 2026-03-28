import {fileURLToPath} from "node:url"
import express from "express"
import { engine } from "express-handlebars"
import dotenv from "dotenv"
import * as http from "node:http";
import { BudgetRepository } from "./modules/database/budget.js";
import { ExpenseRepository } from "./modules/database/expense.js";
import { buildBudgetController } from "./controllers/budget_controller.js";

dotenv.config();

const DEBUG = process.env.NODE_ENV !== "production";
const MANIFEST = DEBUG ? {} : JSON.parse(fs.readFileSync("static/.vite/manifest.json").toString())

// Repositories
const budgetRepository = BudgetRepository.getInstance();
const expenseRepository = ExpenseRepository.getInstance();

const app = express();
const server = http.createServer(app)

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
});

if (!DEBUG) {
  app.use(express.static('static'));
} else {
  app.use((req, res, next) => {
    if (req.url.includes(".")) {
      res.redirect(`http://localhost:5173${req.url}`)
    } else {
      next();
    }
  });
}

app.get("/", (req, res) => {
  res.render('index', {
    debug: DEBUG,
    jsBundle: DEBUG ? "../client" : MANIFEST["src/main.jsx"]["file"],
    cssBundle: DEBUG ? "../client" : MANIFEST["src/main.jsx"]["css"][0],
    assetUrl: process.env.ASSET_URL || "http://localhost:5173",
    entryPoint: "main.jsx",
    pageTitle: "Main Page",
    layout: false
  });
});

app.get("/main", (req, res) => {
    res.redirect("/")
});
app.use("/budget", buildBudgetController(budgetRepository));

server.listen(3000, () => {
  console.log(`Listening on port http://localhost:${process.env.PORT}...`);
});


