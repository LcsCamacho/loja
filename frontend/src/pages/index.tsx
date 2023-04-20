import { UseAxios } from '@/hooks/UseAxios';
import DatagridModel from './../components/datagrid-model/index';
import { useState, useEffect, useMemo } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { Vendedor, Produtos, Vendas } from '@/@types/types';
import FormCadastroVenda from '@/components/form-cadastro-venda';
import { useQuery } from 'react-query';


export default function Home() {
  const [rowsVendedores, setRowsVendedores] = useState<Vendedor[]>([]);
  const [rowsVendas, setRowsVendas] = useState<Vendas[]>([])
  const { api } = UseAxios();

  const { data, isLoading, isError, refetch } = useQuery('myData', async () => {
    const [vendedores, vendas] = await Promise.all([
      api.get('/vendedor'),
      api.get('/vendas/v1/detalhada')
    ]);
    const newVendas = vendas.data.map((item: any) => {
      return {
        id: item.id,
        data: new Date(item.data).toISOString().slice(0,10),
        quantidade: item.quantidade,
        vendedor: item.Vendedor.nome,
        produto: item.Produtos.nome
      }
    })
    return { vendedores: vendedores.data, vendas: newVendas };
  })

  const columnsVendedores: GridColDef[] = useMemo(
    () => ([
      { field: 'id', headerName: 'ID', width: 70, editable: true  },
      { field: 'nome', headerName: 'Nome', width: 200, editable: true  },
      { field: 'matricula', headerName: 'Matricula', width: 50, editable: true  },
    ]), [])


  const columnsVendas: GridColDef[] = useMemo(
    () => ([
      { field: 'id', headerName: 'ID', width: 70, editable: true  },
      { field: 'data', headerName: 'Data', width: 130, editable: true  },
      { field: 'quantidade', headerName: 'Quantidade', width: 80, editable: true  },
      { field: 'vendedor', headerName: 'Vendedor', width: 200, editable: true  },
      { field: 'produto', headerName: 'Produto', width: 130, editable: true  },
    ]), [])


  if(isLoading) return <p>Carregando...</p>
  if(isError) return <p>Ocorreu um erro ao carregar os dados</p>
  

  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-24">
      <div className="flex flex-col items-center justify-center">
        <h1>Painel de controle</h1>
      </div>
      <div className="flex flex-col items-center min-w-full justify-center shadow-2xl p-8 rounded-md">
        <h1 className="p-4">Vendedores</h1>
        <DatagridModel type={"vendedor"} rows={data?.vendedores} columns={columnsVendedores} />
      </div>
      <div className="flex flex-col min-w-full items-center  justify-center shadow-2xl p-8 rounded-md">
        <h1 className="p-4">Vendas feitas</h1>
          <DatagridModel type={'vendas'} rows={data?.vendas} columns={columnsVendas} />
      </div>
      <div className="flex flex-col min-w-full items-center  justify-center shadow-2xl p-8 rounded-md">
        <h1>Cadastrar nova venda</h1>
        <FormCadastroVenda refetch={refetch}/>
      </div>

    </main>
  )
}
