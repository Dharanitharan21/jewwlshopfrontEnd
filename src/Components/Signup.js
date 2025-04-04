import React, { useState } from "react";
import { TextField, Button, Container, IconButton, InputAdornment, Typography, Box } from "@mui/material";
import axios from "axios";
import '../Styles/Signup.css'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  let nav =useNavigate()
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  }

  // eye icon
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  }


  const validateForm = () => {
    let newErrors = {};
    if (!userInput.name) newErrors.name = "Full name is required";
    if (!userInput.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userInput.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!userInput.password) {
      newErrors.password = "Password is required"
    } else if (userInput.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }
    if (!userInput.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (userInput.confirmPassword !== userInput.password) {
      newErrors.confirmPassword = "Passwords do not match"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    axios.post("https://jewellaryshop.onrender.com/api/signup", userInput)
      .then(response => {
        console.log(response.data.data)
        alert("Successfully Registered")
        nav('/login')

      })
      .catch(error => {
        console.error("Signup error:", error)
        alert("Failed to register. Please try again.")
      });
  };



  return (
    <div className="signup-page">
      <Container maxWidth="xs" className="signup-container">
        <Box className="signup-box">
          <Typography variant="h5" gutterBottom textAlign="center">
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit} className="signup-form">
            <TextField
              className="textfeild"
              label="Name"
              name="name"
              fullWidth
              margin="normal"
              value={userInput.name}
              onChange={handleInputChange}
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              className="textfeild"

              label="Email"
              name="email"
              fullWidth
              margin="normal"
              value={userInput.email}
              onChange={handleInputChange}
              error={!!errors.email}
              helperText={errors.email}
            />

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
            <TextField
              className="textfeild"

              label="Confirm Password"
              name="confirmPassword"
              type="password"
              fullWidth
              margin="normal"
              value={userInput.confirmPassword}
              onChange={handleInputChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
            />
            <Button type="submit" variant="contained" className="signup-button">
              Sign Up
            </Button>
          </form>
        </Box>
      </Container>
    </div>
  );
};

export default SignupForm;
