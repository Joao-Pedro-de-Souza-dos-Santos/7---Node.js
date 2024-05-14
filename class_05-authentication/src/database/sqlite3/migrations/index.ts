import { sqliteConnection } from "..";
import { tableUsers } from "./tableUser";

export async function runMigrations() {
  const schema = [tableUsers].join("");

  sqliteConnection()
    .then((db) => db.exec(schema))
    .catch((error) => console.error("Migraion Error - ", error));
}
