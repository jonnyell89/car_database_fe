import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import type { Car } from "../types/Car";
import { addCar } from "../api/carAPI";
import CarDialogContent from "./CarDialogContent";

function AddCar() {

    const [open, setOpen] = useState(false);

    const [car, setCar] = useState<Car>({

        brand: "",
        model: "",
        colour: "",
        registrationNumber: "",
        modelYear: 0,
        price: 0,
    })

    const queryClient = useQueryClient();

    const { mutate } = useMutation({

        mutationFn: addCar,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cars"] });
        },
        onError: (err: Error) => {
            console.error(err);
        },
    })

    const handleClickOpen = () => {

        setOpen(true);
    }

    const handleClose = () => {

        setOpen(false);
    }

    const handleSave = () => {

        mutate(car);
        setCar({
            brand: "",
            model: "",
            colour: "",
            registrationNumber: "",
            modelYear: 0,
            price: 0,
        })
        handleClose();
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        setCar({...car, [event.target.name]: event.target.value});
    }

    return (

        <>
            <Button onClick={handleClickOpen}>New Car</Button>
            <Dialog maxWidth="xs" open={open} onClose={handleClose}>
                <DialogTitle>New Car</DialogTitle>
                <CarDialogContent car={car} handleChange={handleChange} />
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AddCar;
