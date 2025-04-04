import { Box, Button, Container, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import '../Styles/login.css'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [userInput, setUserInput] = useState({
        email: "",
        password: ""
    })
    const [errors, setErrors] = useState({})
    const nav=useNavigate()
    const handleInputChange = (e) => {
        setUserInput({ ...userInput, [e.target.name]: e.target.value })
    }

    // eye icon
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
   

    const validateForm = () => {
        let newErrors = {}
        if (!userInput.email) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userInput.email)) {
            newErrors.email = "Invalid email address";
        }
        if (!userInput.password) {
            newErrors.password = "Password is required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validateForm()) return
        axios.post("https://jewellaryshop.onrender.com/api/login", userInput)
            .then((res) => {
                console.log('login successfully ', res.data);
                localStorage.setItem("token", res.data.token); 
                localStorage.setItem("userId", res.data.logindoc.id); 
                localStorage.setItem("name", res.data.logindoc.name);
                nav('/')
            })
            .catch(error => {
                console.error("login error:", error);
                alert("Failed to login. Please try again.");
            })
    }
    return (
        <div className='login-page'>
            <Container maxWidth="xs" className='login-container'>
                <Box>
                    <Typography variant='h5' gutterBottom textAlign="center">
                        Login
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Email"
                            name="email"
                            fullWidth
                            margin="normal"
                            value={userInput.email}
                            onChange={handleInputChange}
                            error={!!errors.email}
                            helperText={errors.email} />

                        <TextField
                            label="Password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            fullWidth
                            margin="normal"
                            value={userInput.password}
                            onChange={handleInputChange}
                            error={!!errors.password}
                            helperText={errors.password}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Button type="submit" variant="contained" className="login-button">
                            Login
                        </Button>
                    </form>
                </Box>
            </Container>

        </div>
    )
}

export default Login
