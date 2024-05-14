import { sqliteConection } from "..";
import { userTable } from "./userTable";

export async function runMigration() {
    const schemas = [userTable].join("");

    sqliteConection() //<= Realiza a conexão com o banco de dados
    .then((db) => db.exec(schemas))
    .catch((error) => console.log("Migrations Error!", error));
}