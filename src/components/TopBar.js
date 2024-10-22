import React, { useEffect, useState } from "react";
//import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from '@mui/icons-material/Menu';
import Button from "@mui/material/Button";

function TopBar() {
  const Logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  const Token = localStorage.getItem("Token");
  const Nombre = localStorage.getItem("nombreUsuario");
  
  console.log(Nombre);
  
  const [menu, setMenu] = useState(false);
  const [nombre, setNombre] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (Token) {
      var decoded = jwt_decode(Token);
      setNombre(decoded.name);
      setRole(decoded.sub);
      //console.log(decoded.sub);
      setMenu(true);
    }
  }, []);
  return (
    <div>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="open drawer"
        onClick={toggleDrawer}
        sx={{
          marginRight: "36px",
          ...(open && { display: "none" }),
        }}
      >
        <MenuIcon />
      </IconButton>
      <Typography
        component="h1"
        variant="h6"
        color="inherit"
        noWrap
        sx={{ flexGrow: 1 }}
      >
         {Nombre}
      </Typography>
      {/* <IconButton color="inherit">
        <Badge badgeContent={4} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton> */}
      <Button
        type="submit"
        color="secondary"
        //fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={Logout}
      >
        Salir
      </Button>
    </div>
  );
}

export default TopBar;
