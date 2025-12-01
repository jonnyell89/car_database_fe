import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCar } from "../api/carAPI";

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
                <DialogContent>
                    <TextField margin="dense" label="Brand" name="brand" fullWidth value={car.brand} onChange={handleChange} />
                    <TextField margin="dense" label="Model" name="model" fullWidth value={car.model} onChange={handleChange} />
                    <TextField margin="dense" label="Colour" name="colour" fullWidth value={car.colour} onChange={handleChange} />
                    <TextField margin="dense" label="Reg No" name="registrationNumber" fullWidth value={car.registrationNumber} onChange={handleChange} />
                    <TextField margin="dense" label="Year" name="modelYear" fullWidth value={car.modelYear} onChange={handleChange} />
                    <TextField margin="dense" label="Price" name="price" fullWidth value={car.price} onChange={handleChange} />
                </DialogContent>
                <DialogActions>
                    <button onClick={handleClose}>Cancel</button>
                    <button onClick={handleSave}>Save</button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AddCar;
