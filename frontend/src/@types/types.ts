interface Vendedor {
    id: number | string;
    nome: string;
    matricula: string;
}

interface Produtos {
    id: number | string;
    nome: string;
    valor: number;
}

interface Vendas {
    id: number | string;
    nome: string;
    matricula: string;
    valor?: number;
    quantidade?: number;
    Vendedor: Vendedor;
    Produto: Produtos;
}

export type { Vendedor, Produtos, Vendas }