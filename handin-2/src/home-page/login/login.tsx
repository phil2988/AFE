import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import "./login.css"
import { Button, Typography } from "@mui/material";
import { useState } from 'react';

export interface userLogin{
    email?: string,
    password?: string
}

const Login = () => {
    const [inputs, setInputs] = useState<userLogin>({email: "", password: ""});

    function submitLogin(): void {
        console.log("Submitted login:" , inputs)
    }

    return (
        <Paper className="login" elevation={3}>
            <form>
                <Typography variant="h5" fontWeight={600} >Login</Typography>
                <TextField name="email" 
                    variant="outlined" 
                    label="Emal" 
                    onChange={(event) => 
                        setInputs({ email: event.target.value, password: inputs.password })
                    }
                    fullWidth />
                <TextField name="password" 
                    variant="outlined" 
                    label="Password" 
                    onChange={(event) => 
                        setInputs({password: event.target.value, email: inputs.email})
                    }
                    fullWidth />
                <Button variant='contained' 
                    onClick={() => {
                        submitLogin();
                    }}> Login
                </Button>
            </form>
        </Paper> 
    );
}
 
export default Login;