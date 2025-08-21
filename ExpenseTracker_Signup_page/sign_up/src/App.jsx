import React, { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
} from "@mui/material";
import axios from "axios";

// Dark Theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#4cafef",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

export default function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // input handle
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // validation
  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Name is required";
    if (!formData.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Invalid email format";
    }
    if (!formData.phone) {
      tempErrors.phone = "Phone is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      tempErrors.phone = "Phone must be 10 digits";
    }
    if (!formData.password) {
      tempErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        const res = await axios.post("http://localhost:5000/signup", formData, {
          headers: { "Content-Type": "application/json" },
        });
        alert("Signup successful: " + res.data.message);
      } catch (err) {
        alert("Error: " + (err.response?.data?.message || err.message));
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {/* Center Box */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "background.default",
        }}
      >
        <Card
          sx={{
            width: 400,
            p: 3,
            borderRadius: "16px",
            background: "rgba(30,30,30,0.9)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
            backdropFilter: "blur(10px)",
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              align="center"
              sx={{ mb: 2, fontWeight: "bold", color: "#4cafef" }}
            >
              Create Account
            </Typography>
            <form onSubmit={handleSubmit} noValidate>
              <TextField
                label="Full Name"
                name="name"
                fullWidth
                margin="normal"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
              />
              <TextField
                label="Email Address"
                name="email"
                fullWidth
                margin="normal"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />
              <TextField
                label="Phone Number"
                name="phone"
                fullWidth
                margin="normal"
                value={formData.phone}
                onChange={handleChange}
                error={!!errors.phone}
                helperText={errors.phone}
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                fullWidth
                margin="normal"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                sx={{
                  mt: 3,
                  borderRadius: "10px",
                  fontWeight: "bold",
                  py: 1.2,
                  background: "linear-gradient(135deg, #4cafef, #1976d2)",
                }}
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </Button>

              {/* Login Link */}
              <Typography
                variant="body2"
                align="center"
                sx={{ mt: 2, color: "gray" }}
              >
                Already have an account?{" "}
                <span style={{ color: "#4cafef", cursor: "pointer" }}>
                  Login
                </span>
              </Typography>
            </form>
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
}
