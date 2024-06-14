import { useState } from "react";
import { baseUrl } from "./constants/constants";
import { Container, Typography, Box, Button } from "@mui/material";

import Login from "./components/Login";
import Comments from "./components/Comments";
import Header from "./components/Header";
function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  return (
    <Container>
      {user ? (
        <>
          <Header user={user} setUser={setUser} />
          <Comments user={user} />
        </>
      ) : (
        <Login onLogin={handleLogin} baseUrl={baseUrl} />
      )}
    </Container>
  );
}

export default App;
