import express from "express";
import "dotenv/config";
import { routes } from "./routes";
import { pageNotFound } from "./errors/pageNotFound";
import { appErrors } from "./errors/appErrors";
import { sqliteConnection } from "./database/sqlite3";
import { runMigrations } from "./database/sqlite3/migrations";
import cookieParser from "cookie-parser";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser())
app.use(routes);

app.use(pageNotFound);
app.use(appErrors);

app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`);
});

sqliteConnection()
  .then(() => console.log("Database is connected baby..."))
  .catch((error) => console.error("Database isn't connected :C", error));

runMigrations();
