import { useQuery } from "@tanstack/react-query";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";

import type { CarResponse } from "../types/CarResponse";
import { getCars } from "../api/carAPI";

function Cars() {

    const columns: GridColDef[] = [

        {field: "brand", headerName: "Brand", width: 200},
        {field: "model", headerName: "Model", width: 200},
        {field: "colour", headerName: "Colour", width: 200},
        {field: "registrationNumber", headerName: "Reg No", width: 150},
        {field: "modelYear", headerName: "Model Year", width: 150},
        {field: "price", headerName: "Price", width: 150},
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

            <DataGrid
                rows={data}
                columns={columns}
                getRowId={row => row._links.self.href}
            />
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
