import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import type { Car } from "../types/Car";

type DialogFormProps = {

    car: Car;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function CarDialogContent({ car, handleChange }: DialogFormProps) {

    return (
        <>
            <DialogContent>
                <Stack spacing={2} mt={1}>
                    <TextField margin="dense" label="Brand" name="brand" fullWidth value={car.brand} onChange={handleChange} />
                    <TextField margin="dense" label="Model" name="model" fullWidth value={car.model} onChange={handleChange} />
                    <TextField margin="dense" label="Colour" name="colour" fullWidth value={car.colour} onChange={handleChange} />
                    <TextField margin="dense" label="Reg No" name="registrationNumber" fullWidth value={car.registrationNumber} onChange={handleChange} />
                    <TextField margin="dense" label="Year" name="modelYear" fullWidth value={car.modelYear} onChange={handleChange} />
                    <TextField margin="dense" label="Price" name="price" fullWidth value={car.price} onChange={handleChange} />
                </Stack>
            </DialogContent>
        </>
    )
}

export default CarDialogContent;
