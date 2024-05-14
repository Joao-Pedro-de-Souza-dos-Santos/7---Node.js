import express from "express";
import { router } from "./routes";
import { sqliteConection } from "./databases/sqlite3";
import { runMigration } from "./databases/sqlite3/migrations";
import { pageNotFoundError } from "./middlewares/pageNotFound";
import { appErrors } from "./middlewares/appErrors";

const app = express();
const port = 3000;

app.use(express.json());
app.use(router);

app.use(pageNotFoundError);
app.use(appErrors);

app.listen(port, () => {
  console.log(`Server is running in port ${port}`);
});

sqliteConection()
  .then(() => console.log("Database is connected..."))
  .catch((error) => console.error(error));

runMigration();
