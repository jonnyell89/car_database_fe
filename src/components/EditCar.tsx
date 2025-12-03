import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import type { Car } from "../types/Car";
import type { CarEntry } from "../types/CarEntry";
import type { CarResponse } from "../types/CarResponse";
import { updateCar } from "../api/carAPI";
import CarDialogContent from "./CarDialogContent";

type EditCarProps = {

    carData: CarResponse;
}

function EditCar({ carData }: EditCarProps) {

    const [open, setOpen] = useState(false);

    const [car, setCar] = useState<Car>({

        brand: "",
        model: "",
        colour: "",
        registrationNumber: "",
        modelYear: 0,
        price: 0,
    });

    const clientQuery = useQueryClient();

    const { mutate } = useMutation({

        mutationFn: updateCar,
        onSuccess: () => {
            clientQuery.invalidateQueries({ queryKey: ["cars"]});
        },
        onError: (err: Error) => {
            console.error(err);
        }
    })

    const handleClickOpen = () => {

        setCar({

            brand: carData.brand,
            model: carData.model,
            colour: carData.colour,
            registrationNumber: carData.registrationNumber,
            modelYear: carData.modelYear,
            price: carData.price,
        })

        setOpen(true);
    }

    const handleClose = () => {

        setOpen(false);
    }

    const handleSave = () => {

        const url = carData._links.self.href;
        const carEntry: CarEntry = {
            car,
            url,
        }
        mutate(carEntry);
        setCar({
            brand: "",
            model: "",
            colour: "",
            registrationNumber: "",
            modelYear: 0,
            price: 0,
        });
        setOpen(false);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        setCar({ ...car, [event.target.name]: event.target.value });
    }

    return (

        <>
            <Button size="small" onClick={handleClickOpen}>Edit</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Car</DialogTitle>
                <CarDialogContent car={car} handleChange={handleChange} />
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default EditCar;
