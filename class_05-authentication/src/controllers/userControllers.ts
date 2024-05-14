import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { userRepositorie } from "../repositories/userRepositories";

export const userControllers = {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const userSchema = z.object({
                name: z
                    .string({ 
                        required_error: "Nome Obrigatório",
                        invalid_type_error: "Somente tipo textual",
                    })
                    .min(3, { message: "Nome no mínimo com 3 caracteres"})
                    .max(20, "Tamanho máximo do nome atingido"),

                email: z
                    .string({
                        required_error: "Email Obrigatório",
                        invalid_type_error: "Somente Texto",
                    })
                    .email({ message: "Email Inválido" }),

                password: z
                    .string({
                      required_error: "Senha Obrigatória",
                      invalid_type_error: "Use somente senha string",
                    })
                    .min(7)
                    .regex(
                      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{7,}$/,
                      { message: "Digite uma senha com no mínimo 7 caracteres, uma letra maiúscula, um número e  um caractére especial" }
                    ),
                    });

            const { name, email, password } = userSchema.parse(req.body);

            const userExist = await userRepositorie.getByEmail(email);
            if (userExist) throw res.status(400).json({ message: "Email already exists "});

            const userCreated = await userRepositorie.create({ name, email, password });

            return res.status(200).json({ message: `User ${name} Created!`, userCreated });
        }
        catch (error) {
            return next(error);
        }
    },

    async read (req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.userID;
            const user = await userRepositorie.getById(userId);
            if (!user) throw res.status(404).json({ message: "User Not Found!"});

            const { name, email } = user;
            return res.status(200).json({ name, email });
        } catch (error) {
            return next(error);
        }
    },

    async put(req: Request, res: Response, next: NextFunction) {
        try {
            return res.status(200).json({ message: "User Updated!" });
        } catch (error) {
            return next(error);
        }
    },

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            return res.status(200).json({ message: "User Deleted!" });
        } catch (error) {
            return next(error);
        }
    },   
}