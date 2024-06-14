import React from "react";
import { Box, Button, Typography } from "@mui/material";

const Header = ({ user = { id: "", name: "Guest" }, setUser }) => {
  return (
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
  );
};

export default Header;
