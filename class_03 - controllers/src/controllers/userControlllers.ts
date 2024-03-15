import { Request, Response } from "express";

export const userControllers = {
    create(req: Request, res: Response) {
        const { id, classes, attack } = req.body;
        res.json({ status: `user ${id} created!` });

        if (id && classes && attack) {
            res.status(201).json({ status: `user ${id} created!`});
            return;
        }

        res.status(400).json({ status: `user not created`});
    },

    read(req: Request, res: Response) {
        const { id } = req.params;
        res.json({ user : id });
    },

    update(req: Request, res: Response) {
        const { id } = req.params;
        const { classes, attack } = req.body;

        if ( id && classes && attack ) {
            console.log("updated", { id, classes, attack});
            res.json({ status: `user ${id} updated!`});
            return;
        }

        res.status(400).json({ status: `error updated user`});
    },

    delete(req: Request, res: Response) {
        const { id } = req.params;
        res.status(200).json({ status: `user ${id} deleted`});
    }
}