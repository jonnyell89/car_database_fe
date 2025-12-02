import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import type { CarResponse } from "../types/CarResponse";
import type { Car } from "../types/Car";
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

    const handleClickOpen = () => {

        setOpen(true);
    }

    const handleClose = () => {

        setOpen(false);
    }

    const handleSave = () => {

        setOpen(false);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        setCar({ ...car, [event.target.name]: event.target.value });
    }

    return (

        <>
            <button onClick={handleClickOpen}>Edit</button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Car</DialogTitle>
                <CarDialogContent car={car} handleChange={handleChange} />
                <DialogActions>
                    <button onClick={handleClose}>Cancel</button>
                    <button onClick={handleSave}>Save</button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default EditCar;
