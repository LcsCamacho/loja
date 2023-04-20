import { Router } from "express";
import { listar, inserir, atualizar, excluir } from "../controller/produto.controller";

export const routerProdutos = Router();

routerProdutos.get('/produtos', listar);
routerProdutos.post('/produtos', inserir);
routerProdutos.put('/produtos/:id', atualizar);
routerProdutos.delete('/produtos/:id', excluir);




