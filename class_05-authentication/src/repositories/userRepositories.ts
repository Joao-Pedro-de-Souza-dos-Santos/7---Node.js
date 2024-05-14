import { sqliteConnection } from "../database/sqlite3";
import { randomUUID } from "node:crypto";
import { hash } from "bcrypt";

type UserData = {
    name: string;
    email: string;
    password: string;
}

export const userRepositorie = {
    async create ({ name, email, password }: UserData) {
        const db = await sqliteConnection();
        const uuid = randomUUID();
        const passwordHash = await hash(password, 10);
        await db.run(
            "INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)",
            [ uuid, name, email, passwordHash ]
        );

        return { status: 201, id: uuid }
    },

    async getById (id: string) {
            const db = await sqliteConnection();
            const user = await db.get("SELECT * FROM users WHERE id  = ?", [ id ]);
            return user;
    },

    async getByEmail (email: string) {
        const db = await sqliteConnection();
        const user = await db.get("SELECT * FROM users WHERE email = ?", [ email ]);
        return user;
    }
}

   