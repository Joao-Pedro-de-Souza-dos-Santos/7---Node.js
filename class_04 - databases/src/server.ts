import express from "express";
import { router } from "./routes";
import { sqliteConection } from "./databases/sqlite3";
import { runMigration } from "./databases/sqlite3/migrations";
import { appErrors } from "./databases/sqlite3/migrations/appErrors";

const app = express();
const port =  3000;

app.use(express.json());
app.use(router);

app.use(appErrors);

app.listen(port, () => {
    console.log(`Server is running in port ${port}`);
});

sqliteConection()
    .then(() => console.log("Database is connected..."))
    .catch((error) => console.error(error));

runMigration();