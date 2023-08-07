
import React, { useEffect, useState }  from 'react'
//import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Typography from "@mui/material/Typography";

function NavBarTitle() {
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
      
    </div>
  );
}

export default NavBarTitle;
