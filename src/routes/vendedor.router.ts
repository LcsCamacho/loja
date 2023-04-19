import { Router } from "express";
import { listar, inserir, atualizar, excluir, listarMinhasVendas, listarComOTotalDeVendasEComissao } from "../controller/vendedor.controller";

export const routerVendedor = Router();

routerVendedor.get('/vendedor', listar);
routerVendedor.get('/vendedor/v1/detalhada', listarComOTotalDeVendasEComissao);
routerVendedor.get('/vendedor/v1/minhasvendas', listarMinhasVendas);
routerVendedor.post('/vendedor', inserir);
routerVendedor.put('/vendedor/:id', atualizar);
routerVendedor.delete('/vendedor/:id', excluir);




