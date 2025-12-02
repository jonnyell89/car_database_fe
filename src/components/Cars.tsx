import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import type { GridCellParams, GridColDef } from "@mui/x-data-grid";
import { Snackbar } from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AddCar from "./AddCar";
import { getCars, deleteCar } from "../api/carAPI";
import type { CarResponse } from "../types/CarResponse";
import EditCar from "./EditCar";

function Cars() {

    const [open, setOpen] = useState(false);

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        
        mutationFn: deleteCar,
        onSuccess: () => {
            setOpen(true);
            queryClient.invalidateQueries({ queryKey: ["cars"] });
        },
        onError: (err: Error) => {
            console.error(err);
        },
    })

    const columns: GridColDef[] = [

        {field: "brand", headerName: "Brand", width: 200},
        {field: "model", headerName: "Model", width: 200},
        {field: "colour", headerName: "Colour", width: 200},
        {field: "registrationNumber", headerName: "Reg No", width: 150},
        {field: "modelYear", headerName: "Year", width: 150},
        {field: "price", headerName: "Price", width: 150},
        {
            field: "edit",
            headerName: "",
            width: 90,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params: GridCellParams) => (
                <EditCar carData={params.row} />
            )
        },
        {
            field: "delete",
            headerName: "",
            width: 90,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params: GridCellParams) => (
                <button 
                    onClick={() => {
                        if (window.confirm(`Are you sure you want to delete ${params.row.brand} ${params.row.model}?`)) {
                            mutate(params.row._links.car.href);
                        }
                    }}
                >
                    Delete
                </button>
            ),
        },
    ];

    const { data, error, isSuccess } = useQuery<CarResponse[], Error>({

        queryKey: ["cars"],
        queryFn: getCars
    })

    if (!isSuccess) {

        return <span>Loading...</span>
    }

    else if (error) {

        return <span>Error when fetching cars...</span>
    }

    else {

        return (

            <>
                <AddCar />
                <DataGrid
                    rows={data}
                    columns={columns}
                    disableRowSelectionOnClick={true}
                    getRowId={row => row._links.self.href}
                />
                <Snackbar
                    open={open}
                    autoHideDuration={2000}
                    onClose={() => setOpen(false)}
                    message="This car has been deleted"
                />
            </>
        )
    }

    // else {

    //     return (
            
    //         <table>
    //             <tbody>
    //                 {
    //                     data.map((car: CarResponse) =>
    //                     <tr key={car._links.self.href}>
    //                         <td>{car.brand}</td>
    //                         <td>{car.model}</td>
    //                         <td>{car.colour}</td>
    //                         <td>{car.registrationNumber}</td>
    //                         <td>{car.modelYear}</td>
    //                         <td>{car.price}</td>
    //                     </tr>)
    //                 }
    //             </tbody>
    //         </table>
    //     )
    // }
}

export default Cars;
