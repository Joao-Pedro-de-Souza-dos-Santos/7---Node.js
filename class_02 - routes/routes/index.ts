import { Router } from "express";

export const router = Router();

router.get("/", (_req, res) => {
    res.send({  name: "JPSS" });
});

router.get("/jojo", (_req, res) => {
    res.send([
        { id: 1, name: "Jonathan Joestar" },
        { id: 2, name: "Joseph Joestar" },
        { id: 3, name: "Jotaro Kujo"},
        { id: 4, name: "Higashikata Josuke"},
        { id: 5, name: "Giorno Giovana"},
        { id: 6, name: "Jolyne Kujo"},
        { id: 7, name: "Jonny Joestar"},
        { id: 8, name: "Higashikata Josuke"},
        { id: 9, name: "Jodio Joestar"}
    ]);
});

