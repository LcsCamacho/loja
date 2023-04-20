import { Router } from "express";
import { listar, inserir, atualizar, excluir, listarComOVendedor,vendasComValorTotal } from "../controller/vendas.controller";

export const routerVendas = Router();

routerVendas.get('/vendas', listar);
routerVendas.get('/vendas/v1/detalhada', listarComOVendedor);
routerVendas.get('/vendas/v2/detalhada', vendasComValorTotal);
routerVendas.post('/vendas', inserir);
routerVendas.put('/vendas/:id', atualizar);
routerVendas.delete('/vendas/:id', excluir);




