import { Request, Response } from "express";

export const userControllers = {
    create(req: Request, res: Response) {
        const { id, classes, attack } = req.body;
        res.json({ status: `user ${id} created!` });

        if (id && classes && attack) {
            res.json({ status: `user ${id} created!`});
            return;
        }

        res.json({ status: `user not created`});
    },

    read(req: Request, res: Response) {
        const { id } = req.params;
        res.json({ user : id });
    },
}