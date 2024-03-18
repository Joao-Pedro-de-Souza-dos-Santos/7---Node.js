import { Request, Response } from "express";
 
export const userControllers = {
    create(req: Request, res: Response) {
        res.send({ message: "user created!"});
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