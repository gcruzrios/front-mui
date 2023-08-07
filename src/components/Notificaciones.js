import React, { useEffect, useState } from "react";
//import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Button from "@mui/material/Button";
function Notificaciones() {
  const Logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  const Token = localStorage.getItem("Token");
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
      <Typography
        edge="end"
        component="h3"
        variant="h6"
        color="inherit"
        noWrap
        sx={{ flexGrow: 1 }}
      >
        {nombre}
      </Typography>
      <IconButton color="inherit"  edge="end">
        <Badge badgeContent={4} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Button
        edge="end"
        type="submit"
        color="secondary"
        //fullWidth
        variant="contained"
        sx={{ mt: 2, mb: 2 }}
        onClick={Logout}
      >
        Salir
      </Button>
    </div>
  );
}

export default Notificaciones;
