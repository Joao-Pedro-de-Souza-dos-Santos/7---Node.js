import { sqliteConection } from "../databases/sqlite3";
import { randomUUID } from "node:crypto";
import { hash } from "bcrypt";

type UserData = {
    name: string;
    email: string;
    password: string;
}

type UserUpdate = {
    name: string;
    email: string;
    newPassword: string;
    id: string;
}

export const userRepository = {
    async create({ name, email, password }: UserData) {
        const uuid = randomUUID();
        const db = await sqliteConection();
        const passwordHash = await hash(password, 10);
        await db.run(
            "INSERT INTO users (id, name, email, password) VALUES (?,?,?,?)",
            [uuid, name, email, passwordHash]
        );

        return { status: 201, id: uuid }
    },

    async getById (id : string) {
        const db = await sqliteConection();
        const user = await db.get("SELECT * FROM users WHERE id=?", [id]);
        return user;
    },

    async getByEmail (email: string) {
        const db = await sqliteConection();
        const userEmail = await db.get("SELECT * FROM users WHERE email = ?", [
            email,
        ]);
        return userEmail;
    },

    async update ({name, email, newPassword, id}: UserUpdate) {
        const db = await sqliteConection();
        const passwordHash = await hash(newPassword, 10);
        const updateQuery = 
            `UPDATE users 
             SET name = ?, email = ?, password = ?, updated_at = DATETIME ('now')
             WHERE id = ?`;

        await db.run(updateQuery, [name, email, passwordHash, id]);

        return { status: 200, message: "User Update!"}
    },

    async delete (id: string) {
        const db = await sqliteConection();
        await db.run("DELETE FROM users WHERE id = ?",[id]);

        return { status: 200, message: `User ${id} Deleted!`}
    }
}