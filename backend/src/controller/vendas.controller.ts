import { Request, Response } from "express";
import prisma from "../dao/prisma";

export const vendasComValorTotal = (req: Request, res: Response) => {
    prisma.vendas.findMany({
        select: {
            id: true,
            data: true,
            quantidade: true,
            Produtos: {
                select: {
                    nome: true,
                    valor: true,
                },
            },
        }
    }).then((data) => {
        const newData = data.map((item) => {
            return {
                id: item.id,
                data: item.data,
                quantidade: item.quantidade,
                valorTotal: item.Produtos.valor * item.quantidade,
                nomeProduto: item.Produtos.nome,
            }
        })
        res.json(newData);
    }).catch((err) => {
        res.status(500).json(err);
    });
}

export const listarComOVendedor = (req: Request, res: Response) => {
    prisma.vendas.findMany({
        select: {
            id: true,
            data: true,
            quantidade: true,
            Vendedor: {
                select: {
                    nome: true,
                }
            },
            Produtos: {
                select: {
                    nome: true,
                },
            },
        }
    }).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.status(500).json(err);
    });
}

export const listar = (req: Request, res: Response) => {
    prisma.vendas.findMany()
    .then((data) => {
        res.json(data);
    }).catch((err) => {
        res.status(500).json(err);
    });
}
export const inserir = (req: Request, res: Response) => {
    const { vendedor_id, produto_id, quantidade } = req.body;

    prisma.vendas.create({
        data: {
            vendedor_id: Number(vendedor_id),
            produto_id: Number(produto_id),
            quantidade: Number(quantidade),
        }
    }).then((data) => {
        res.json(data);
    }).catch((err) => {
        console.log(err)
        res.status(500).json(err);
    });
}
export const atualizar = (req: Request, res: Response) => {
    prisma.vendas.update({
        where: {
            id: String(req.params.id)
        },
        data: req.body
    }).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.status(500).json(err);
    });
}
export const excluir = (req: Request, res: Response) => {
    prisma.vendas.delete({
        where: {
            id: String(req.params.id)
        }
    }).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.status(500).json(err);
    });
}

