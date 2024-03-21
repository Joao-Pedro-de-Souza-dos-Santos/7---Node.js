import { Request, Response, NextFunction } from "express";
import { sqliteConection } from "../databases/sqlite3";
 
export const userControllers = {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { id, name, email, password } = req.body;
            const  db = await sqliteConection();
            await db.run("INSERT INTO users (id, name, email, password) VALUES (?,?,?,?)", [ id, name, email, password, ]);

            res.send({ message: "user created!", id });
        } catch (error) {
            return next(error);
        }   
    },

    read(req: Request, res: Response) {
        res.send({ message: "user readed!"});
    },

    update(req: Request, res: Response) {
        res.send({ message: "user updated!"});
    },

    delete(req: Request, res: Response) {
        res.send({ message: "user deleted!"});
    }
}