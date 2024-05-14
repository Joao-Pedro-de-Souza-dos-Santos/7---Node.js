import { Request, Response, NextFunction } from "express";
import { JwtPayload, decode, verify } from "jsonwebtoken";

export function authMiddleware (req: Request, res: Response, next: NextFunction) {
    const { cookie } = req.headers;
    if (!cookie) return res.status(401).json({ message: "Token Obrigatório!" });

    const splitCookieToken = cookie.split("=");
    if (splitCookieToken.length != 2) return res.status(401).json({ message: "Token mal formatado" });

    const [key, token] = splitCookieToken;
    if (key != process.env.KEY_TOKEN) return res.status(401).json({ message: "Token Inválido!" });

    verify(key, process.env.SECRET_TOKEN, (error, decode) => {
        if (error) throw res.status(401).json({ message: error.message || "Erro no Token" });
        const { id } = decode as JwtPayload;
        req.userID = id;
        return next();
    });
}