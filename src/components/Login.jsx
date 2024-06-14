import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import axios from "axios";
import { fetchUsers } from "../api/apiCalls";

const Login = ({ onLogin, baseUrl }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // to directly login with guest credentials
  const handleGuestLogin = () => {
    // Directly calls handleLogin with guest credentials
    handleLogin({ username: "guest", password: "guest" });
  };

  const handleLogin = async (credentials = { username, password }) => {
    const { username, password } = credentials;

    try {
      const response = await fetchUsers();
      const users = response;
      const user = users.find(
        (user) => user.username === username && user.password === password
      );

      if (user) {
        onLogin(user);
      } else {
        setError("Invalid login credentials");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again .");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <form
          onSubmit={handleSubmit}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TextField
            label="Username"
            variant="outlined"
            margin="normal"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="h-4">
            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}
          </div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2, width: "20%" }}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleGuestLogin}
          >
            Login as Guest
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
