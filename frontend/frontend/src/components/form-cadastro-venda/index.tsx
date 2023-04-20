import { Vendedor, Produtos } from "@/@types/types";
import { FormEvent, useEffect, useState } from "react";
import { UseAxios } from "@/hooks/UseAxios";


export default function FormCadastroVenda({refetch}: {refetch: () => void}) {
    const [vendedor, setVendedor] = useState('');
    const [produto, setProduto] = useState('');
    const [quantidade, setQuantidade] = useState<number | string>(0);
    const [fetchProdutos, setFetchProdutos] = useState<Produtos[]>([]);
    const [fetchVendedores, setFetchVendedores] = useState<Vendedor[]>([]);
    const { api } = UseAxios();

    const requisicoes = async () => {
        const [responseVendedores, responseProdutos] = await Promise.all([
            api.get('/vendedor'),
            api.get('/produtos')
        ]); // Aqui você pode fazer as requisições em paralelo
        setFetchVendedores(responseVendedores.data);
        setFetchProdutos(responseProdutos.data);
    };

    useEffect(() => {
        requisicoes()
            .catch((error) => {
                console.log(error);
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(`Vendedor: ${vendedor}, Produto: ${produto}, Quantidade: ${quantidade}`);
        // Aqui você pode enviar os dados para o servidor ou fazer outras ações
        api.post('/vendas', {
            vendedor_id: vendedor,
            produto_id: produto,
            quantidade: quantidade
        }).then((response) => {
            refetch()
            console.log(response);
        }).catch((error) => {
            console.log(error);
        })

        // Limpa os campos
        setVendedor('');
        setProduto('');
        setQuantidade(0);

    };

    return (
        <>
            <form onSubmit={handleSubmit} className="max-w-md min-w-full mt-8">
                <div className="mb-4 w-full flex flex-col items-center justify-center">
                    <label htmlFor="seller" className="block text-gray-700 font-bold mb-2">Vendedor</label>
                    <select
                        id="seller"
                        value={vendedor}
                        onChange={(e) => setVendedor(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                        <option value="">Selecione um vendedor</option>
                        {fetchVendedores.map((seller, index) => (
                            <option key={index} value={seller.id}>{seller.nome}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4 w-full">
                    <label htmlFor="product" className="block text-gray-700 font-bold mb-2">Produto</label>
                    <select
                        id="product"
                        value={produto}
                        onChange={(e) => setProduto(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                        <option value="">Selecione um produto</option>
                        {fetchProdutos.map((product, index) => (
                            <option key={index} value={product.id}>{product.nome}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="quantity" className="block text-gray-700 font-bold mb-2">Quantidade</label>
                    <input
                        type="number"
                        id="quantity"
                        min={0}
                        value={quantidade}
                        onChange={(e) => setQuantidade(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Digite a quantidade vendida"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Cadastrar venda
                    </button>
                </div>
            </form>
        </>
    )
}