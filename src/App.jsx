import { useState } from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import Login from "./components/Login";
import { baseUrl } from "./constants/constants";
function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  return (
    <Container>
      {user ? (
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={2}
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setUser(null)}
          >
            Logout
          </Button>
          <Typography variant="h6">Welcome, {user.name}</Typography>
        </Box>
      ) : (
        <Login onLogin={handleLogin} baseUrl={baseUrl}/>
      )}
    </Container>
  );
}

export default App;
