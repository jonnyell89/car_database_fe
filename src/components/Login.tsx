import { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import SnackBar from "@mui/material/Snackbar";
import Cars from "./Cars";

type User = {

    username: string;
    password: string;
}

function Login() {

    const [user, setUser] = useState<User>({

        username: "",
        password: "",
    })

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [open, setOpen] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        setUser({...user, [event.target.name]: event.target.value});
    }

    const handleLogin = async () => {

        try {
            
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, user, {
                
                headers: { "Content-Type": "application/json" }
            })

            const jwtToken = response.headers.authorization;

            if (jwtToken) {

                sessionStorage.setItem("jwt", jwtToken);
                setIsAuthenticated(true);
            }
        }

        catch (error) {
            
            console.error(`Login failed: ${error}`);
            setOpen(true);
        }
    }

    if (isAuthenticated) {

        return <Cars />
    }

    else {

        return (
            
            <Stack spacing={2} alignItems="center" mt={2}>
                <TextField name="username" label="Username" onChange={handleChange} />
                <TextField type="password" name="password" label="Password" onChange={handleChange} />
                <Button variant="outlined" color="primary" onClick={handleLogin}>
                    Login
                </Button>
                <SnackBar open={open} autoHideDuration={3000} onClose={() => setOpen(false)} message="Login failed: Please check your username and password" />
            </Stack>
        )
    }
}

export default Login;
