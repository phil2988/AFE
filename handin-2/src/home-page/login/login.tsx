import React, { Component } from "react";
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import "./login.css"

interface LoginProps {
    
}

class Login extends Component<LoginProps> {
    render() { 
        return (
            <Card className="login">
                <TextField className="username-textfield" variant="outlined" label="Username" fullWidth/>
                <TextField className="password-textfield" variant="outlined" label="Password" fullWidth/>
            </Card> 
        );
    }
}
 
export default Login;