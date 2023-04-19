import { Request, Response } from "express";
import prisma from "../dao/prisma";

export const listar = (req: Request, res: Response) => {
    prisma.produtos.findMany()
    .then((data) => {
        res.json(data);
    }).catch((err) => {
        res.status(500).json(err);
    });
}
export const inserir = (req: Request, res: Response) => {
    const { nome, valor } = req.body;

    prisma.produtos.create({
        data: {
            nome: String(nome),
            valor: Number(valor),
        }
    }).then((data) => {
        res.json(data);
    }).catch((err) => {
        console.log(err)
        res.status(500).json(err);
    });
}
export const atualizar = (req: Request, res: Response) => {
    const { nome, valor } = req.body;

    prisma.produtos.update({
        where: {
            id: Number(req.params.id)
        },
        data: {
            nome: String(nome),
            valor: Number(valor),
        }
    }).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.status(500).json(err);
    });
}
export const excluir = (req: Request, res: Response) => {
    prisma.produtos.delete({
        where: {
            id: Number(req.params.id)
        }
    }).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.status(500).json(err);
    });
}

