import { Request, Response } from "express";
import prisma from "../dao/prisma";

export const listarComOTotalDeVendasEComissao = (req: Request, res: Response) => {
    prisma.vendedores.findMany({
        select: {
            _count: {
                select: {
                    vendas: true
                }
            },
            nome: true,
            matricula: true,
        }
    }).then((data) => {
        const newData = data.map((item) => {
            return {
                nome: item.nome,
                matricula: item.matricula,
                totalVendas: item._count.vendas,
                totalComissao: item._count.vendas * 0.05,
            }
        })
        res.json(newData);
    }).catch((err) => {
        res.status(500).json(err);
    });
}

export const listarMinhasVendas = (req: Request, res: Response) => {
    prisma.vendedores.findMany({
            include: {
                vendas: true,
            }
    }).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.status(500).json(err);
    });
}

export const listar = (req: Request, res: Response) => {
    prisma.vendedores
    .findMany().then((data) => {
        res.json(data);
    }).catch((err) => {
        res.status(500).json(err);
    });
}
export const inserir = (req: Request, res: Response) => {
    const { nome, matricula } = req.body;

    prisma.vendedores.create({
        data: {
            nome: String(nome),
            matricula: String(matricula),
        }
    }).then((data) => {
        res.json(data);
    }).catch((err) => {
        console.log(err)
        res.status(500).json(err);
    });
}
export const atualizar = (req: Request, res: Response) => {
    const { nome, matricula } = req.body;

    prisma.vendedores.update({
        where: {
            id: Number(req.params.id)
        },
        data: {
            nome: String(nome),
            matricula: String(matricula),
        }
    }).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.status(500).json(err);
    });
}
export const excluir = (req: Request, res: Response) => {
    prisma.vendedores.delete({
        where: {
            id: Number(req.params.id)
        }
    }).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.status(500).json(err);
    });
}

