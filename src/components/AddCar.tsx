import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCar } from "../api/carAPI";
import CarDialogContent from "./CarDialogContent";

function AddCar() {

    const [open, setOpen] = useState(false);

    const [car, setCar] = useState({

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

    const handleOpen = () => {

        setOpen(true);
    }

    const handleClose = () => {

        setOpen(false);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        setCar({...car, [event.target.name]: event.target.value});
    }

    return (

        <>
            <button onClick={handleOpen}>New Car</button>
            <Dialog maxWidth="xs" open={open} onClose={handleClose}>
                <DialogTitle>New car</DialogTitle>
                <CarDialogContent car={car} handleChange={handleChange} />
                <DialogActions>
                    <button onClick={handleClose}>Cancel</button>
                    <button onClick={handleSave}>Save</button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AddCar;
