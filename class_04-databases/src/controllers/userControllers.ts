import { Request, Response, NextFunction } from "express";
import { compare } from "bcrypt";
import { userRepository } from "../repositories/userRepository";
import { z } from "zod";

export const userControllers = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userShema = z.object({
          name: z.string({
              required_error: "Nome Obrigatório",
              invalid_type_error: "Somente Texto",
            })
            .min(3, { message: "Mínimo De 3 Caracteres" }),

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
              {
                message:
                  "Digite uma senha com no mínimo 7 caracteres, uma letra maiúscula, um número e  um caractére especial",
              }
            ),
        })
        .strict();

      const { name, email, password } = userShema.parse(req.body);

      console.log(name, email, password);

      const userEmail = await userRepository.getByEmail(email);
      if (userEmail) {
        throw res.status(400).json({ message: "Email already exists!" });
      }

      const userCreated = await userRepository.create({
        name,
        email,
        password,
      });

      res.status(201).send({ message: "User Created!", ...userCreated });

      return res.json({ name, email, password });
    } catch (error) {
      return next(error);
    }
  },

  async read(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { password } = req.body;

      if (!password)
        throw res.status(400).json({ message: "Please confirm your password" });

      const user = await userRepository.getById(id);
      if (!user) throw res.status(400).json({ message: "User not founnd" });

      const passwordCheck = await compare(password, user.password);

      if (!passwordCheck)
        throw res.status(401).json({ message: "Invalid password" });

      const { name, email } = user;
      res.status(200).json({ name, email });
    } catch (error) {
      return next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { name, email, password, newPassword } = req.body;

      const user = await userRepository.getById(id);
      if (!user) throw res.status(404).json({ message: "User not found!" });

      const passwordCheck = await compare(password, user.password);
      if (!passwordCheck)
        throw res.status(401).json({ message: "Invalid password!" });

      if (password == newPassword)
        throw res.status(401).json({ message: "Alterar senha igual" });

      const userEmail = await userRepository.getByEmail(email);
      if (userEmail && userEmail.id != id)
        throw res.status(404).json({ message: "Invalid Email!" });

      const UserUpdate = await userRepository.update({
        name,
        email,
        newPassword,
        id,
      });

      return res.status(200).json(UserUpdate);
    } catch (error) {
      return next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { password } = req.body;

      const user = await userRepository.getById(id);
      if (!user) throw res.status(404).json({ message: "User not found!" });

      const passwordCheck = await compare(password, user.password);
      if (!passwordCheck)
        throw res.status(401).json({ message: "Invalid password!" });

      const userDeleted = await userRepository.delete(id);

      return res.status(200).json({ userDeleted });
    } catch (error) {
      return next(error);
    }
  },
};
