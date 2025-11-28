import { useQuery } from "@tanstack/react-query";
import type { CarResponse } from "../types/CarResponse";
import axios from "axios";

function Cars() {

    const getCars = async (): Promise<CarResponse[]> => {

        const response = await axios.get(`http://localhost:8080/api/cars`);

        return response.data._embedded.cars;
    }

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
            
            <table>
                <tbody>
                    {
                        data.map((car: CarResponse) =>
                        <tr key={car._links.self.href}>
                            <td>{car.brand}</td>
                            <td>{car.model}</td>
                            <td>{car.colour}</td>
                            <td>{car.registrationNumber}</td>
                            <td>{car.modelYear}</td>
                            <td>{car.price}</td>
                        </tr>)
                    }
                </tbody>
            </table>
        )
    }
}

export default Cars;
