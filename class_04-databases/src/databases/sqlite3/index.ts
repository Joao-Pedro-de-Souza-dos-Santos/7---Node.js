import sqlite3 from "sqlite3";
import * as sqlite from "sqlite";
import path from "path";

export async function sqliteConection(): 
Promise<sqlite.Database> {
    const database = await sqlite.open({
        filename: path.resolve(__dirname, "..", "database.db"), // <= Caminho do arquivo Banco de Dados
        driver: sqlite3.Database, // <= Executa e Retorna a conexão Banco de Dados
    });

    return database;
}