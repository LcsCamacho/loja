/* eslint-disable react/jsx-key */
import CancelIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { Grid, Skeleton } from '@mui/material';
import {
    DataGrid,
    GridActionsCellItem,
    GridCallbackDetails,
    GridColDef,
    GridEventListener,
    GridRowId,
    GridRowModel,
    GridRowModes,
    GridRowModesModel,
    GridRowParams,
    MuiEvent
} from '@mui/x-data-grid';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { UseAxios } from '@/hooks/UseAxios';

interface dataGridProps {
    columns: Array<GridColDef>,
    checkboxSelection?: boolean
    editModel?: "row" | ''
    onPageChange?: Function,
    onRowsPerPageChange?: Function
    onRowModesModelChange?: ((rowModesModel: GridRowModesModel, details: GridCallbackDetails<any>) => void)
    onRowEditStart?: GridEventListener<any>
    onRowEditStop?: GridEventListener<any>
    page?: number,
    processRowUpdate?: ((newRow: any, oldRow: any) => any)
    rows: Array<any>
    rowsPerPage?: number,
    rowsPerPageOptions?: Array<number>,
    rowModesModel?: GridRowModesModel,
    filter?: (row: any) => boolean,
    type?: 'vendedor' | 'vendas' | 'produtos'
}

export default function DatagridModel(props: dataGridProps) {
    const { rows, columns, type } = props;
    const [loading, setLoading] = useState(true);
    const [rowsState, setRowsState] = useState<any>([]);
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
    const { api } = UseAxios();

    const handleRowEditStart = (
        params: GridRowParams,
        event: MuiEvent<React.SyntheticEvent>,
    ) => {
        console.log({params, event})
        event.defaultMuiPrevented = true;
    };

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        event.defaultMuiPrevented = true;
        console.log({params, event})
    };

    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id: GridRowId) => () => {
        let itemid = id
        if (type === 'vendas') {
            itemid = rows[Number(id)].id
        }
        api.delete(`/${type}/${itemid}`)
            .then(() => {
                alert("deletado com sucesso")
            })
        setRowsState(rows.filter((row: any) => row.id !== id));
    };

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });
        const editedRow = rows.find((row: any) => row.id === id);
        if (editedRow!.isNew) {
            setRowsState(rows.filter((row: any) => row.id !== id));
        }
    };

    const updateRow = (newRow: GridRowModel) => {
        const updatedRow = { ...newRow, isNew: false };
        const oldRow = rows.find((row) => row.id === newRow.id)

        //transforma os dados em string para comparar se houve alguma alteração
        const strOldRow = JSON.stringify(oldRow)
        const strNewRow = JSON.stringify(newRow)
        if (strOldRow === strNewRow) {
            alert("nenhum dado foi alterado")
            return updatedRow
        } //se não houve alteração, retorna o oldRow
        let itemid = oldRow.id
        if(type === 'vendas'){
            itemid = rows[Number(oldRow.id)].id
        }
        api.put(`/${type}/${itemid}`, updatedRow)
        setRowsState(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));

        return updatedRow;
    }

    const processRowUpdate = (newRow: GridRowModel) => {
        return updateRow(newRow);
    };

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    useEffect(() => {
        setRowsState(rows)
        setLoading(false)
    }, [rows])

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
         {loading ? (<>
                <Skeleton variant="rectangular" width={'100%'} animation="wave" >
                    <DataGrid
                        rows={rowsState}
                        columns={columns} />
                </Skeleton>

            </>) : (
                
                <DataGrid
                {...props}
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStart={handleRowEditStart}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                autoHeight
                className='min-w-full'
                rows={rowsState}
                columns={[
                    ...columns,
                    {
                        field: 'actions',
                        type: 'actions',
                        headerName: 'Actions',
                        width: 100,
                        cellClassName: 'actions',
                        getActions: ({ id }) => {
                            const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
    
                            if (isInEditMode) {
                                return [
                                    <GridActionsCellItem
                                        icon={<SaveIcon />}
                                        label="Save"
                                        onClick={handleSaveClick(id)}
                                    />,
                                    <GridActionsCellItem
                                        icon={<CancelIcon />}
                                        label="Cancel"
                                        className="textPrimary"
                                        onClick={handleCancelClick(id)}
                                        color="inherit"
                                    />,
                                ];
                            }
    
                            return [
                                <GridActionsCellItem
                                    icon={<EditIcon />}
                                    label="Edit"
                                    className="textPrimary"
                                    onClick={handleEditClick(id)}
                                    color="inherit"
                                />,
                                <GridActionsCellItem
                                    icon={<DeleteIcon />}
                                    label="Delete"
                                    onClick={handleDeleteClick(id)}
                                    color="inherit"
                                />,
                            ];
                        },
                    },
                ]}
            />
            )}
            </Grid>
        </Grid>
        
    )
}