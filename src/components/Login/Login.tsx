import React, { useRef, useState } from "react";
import { TextField, Button, Container, Typography, Alert, Paper, Box } from "@mui/material";
import { loginContainer, loginPaper, formStyles, inputField, buttonStyle } from "./login.styles";

const Login: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const emailInputRef = useRef<HTMLInputElement>(null);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!name.trim() || !email.trim()) {
      setError("Both fields are required.");
      setLoading(false);
      return;
    }

    if (emailInputRef.current && !emailInputRef.current.checkValidity()) {
      setError("Enter a valid email address.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("https://frontend-take-home-service.fetch.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ name, email }),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed. Please try again.");
      }

      setError("");
      alert("Login successful! You are now authenticated.");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={loginContainer}>
      <Paper elevation={3} sx={loginPaper}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>

        {error && (
          <Typography >
            {error}
          </Typography>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={formStyles} aria-labelledby="login-heading">
          <Typography id="login-heading" variant="h5" component="h2">
            Enter Your Details
          </Typography>

          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            sx={inputField}
            required
          />

          <TextField
            label="Email"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            sx={inputField}
            required
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={buttonStyle}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
