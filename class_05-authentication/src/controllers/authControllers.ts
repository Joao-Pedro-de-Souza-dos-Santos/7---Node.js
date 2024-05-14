import { Request, Response, NextFunction } from "express";
import { userRepositorie } from "../repositories/userRepositories";
import { compare } from "bcrypt";
import { z } from "zod";
import {sign} from "jsonwebtoken"

export const authControllers = {
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const userSchema = z.object({
                email: z
                    .string({
                        required_error: "Digite o Email",
                        invalid_type_error: "",
                    })
                    .max(250),

                password: z
                    .string({
                        required_error: "Digite a Senha",
                        invalid_type_error: "",
                    })
            }).strict();

            const { email, password } = userSchema.parse(req.body);

            const userLogin = await userRepositorie.getByEmail(email);
            if (!userLogin) throw res.status(404).json({ message: "Email or Password Invalid!" });

            const userPassword = await compare(password, userLogin.password);
            if (!userPassword) throw res.status(404).json({ message: "Email or Password Invalid!" });

            const token = 
                sign({ id: userLogin.id}, 
                    process.env.SECRET_TOKEN, {
                    expiresIn: process.env.EXPIRESIN_TOKEN,
            });

            res.cookie(process.env.KEY_TOKEN, token, {
                httpOnly: true,
                sameSite: "none",
                secure: true,
                maxAge: 1000 * 60 * 15,
            });

            return res.status(200).json({ message: "User Logged in!", token });
        } catch (error) {
            return next(error);
        }
    }
}