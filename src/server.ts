//imports
import express from 'express'
import cors from 'cors'
import { routerProdutos } from './routes/produto.router';
import { routerVendedor } from './routes/vendedor.router';
import { routerVendas } from './routes/vendas.router';

//app
const app = express();
app.use(cors());
app.use(express.json());

//rotas
app.use(routerProdutos)
app.use(routerVendas)
app.use(routerVendedor)


//teste
app.listen(3777, () => {
    console.log('Server running on port 3777')
});