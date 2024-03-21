import e, { Request, Response, NextFunction } from "express";

export const userControllers = {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { id, classes, attack } = req.body;
            if (id && classes && attack) {
                // console.log(a);
                return res.status(201).json({ status: `user ${id} created!`});       
        }
            throw res.status(400).json({ status: `user not created`});
        } catch (error) {
            next(error); 
        }
    },

    read(req: Request, res: Response) {
        const { id } = req.params;
        res.json({ user : id });
    },

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { classes, attack } = req.body;

            if ( id && classes && attack ) {
                console.log("updated", { id, classes, attack});
                res.json({ status: `user ${id} updated!`});
                return;
        }
            throw res.status(400).json({ status: `error updated user`});
        } catch (error) {
            next(error);
        }
    },

    delete(req: Request, res: Response) {
        const { id } = req.params;
        res.status(200).json({ status: `user ${id} deleted`});
    }
}