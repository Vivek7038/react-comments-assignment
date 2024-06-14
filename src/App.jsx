import { useEffect, useState } from "react";
import { baseUrl } from "./constants/constants";
import { Container, Typography, Box, Button } from "@mui/material";

import Login from "./components/Login";
import Comments from "./components/Comments";
import Header from "./components/Header";
import useAuth from "./hooks/useAuth";
function App() {
  const { user, login, logout } = useAuth();

  return (
    <Container>
      {user ? (
        <>
          <Header user={user} setUser={logout} />
          <Comments user={user} />
        </>
      ) : (
        <Login onLogin={login} baseUrl={baseUrl} />
      )}
    </Container>
  );
}

export default App;
