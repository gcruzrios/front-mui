import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function FormEditContact() {

  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [celular, setCelular] = useState("");
  const [email, setEmail] = useState("");
  const id = localStorage.getItem("Id");
  
  const GetContact = async () => {
    
    const response = await axios.get(`/api/contactos/${id}`);
    const mensaje = response.data;
   
    setNombre(mensaje.nombre);
    setTelefono(mensaje.telefono);
    setCelular(mensaje.celular);
    setEmail(mensaje.email);
        
    console.log(mensaje);
    
  }

  const handleEdit = async (e) => {
    e.preventDefault();

//    const token = data.Token;
//    localStorage.setItem("Token", token);

    const contacto = { nombre, telefono, celular, email };
    
    console.log(contacto);

    // const response = await axios.post(`/api/login`, ingreso, {
    //     "Content-Type": "application/json", headers: { Authorization: 'No Auth' } 
    // });

    const response = await axios.put(`/api/contactos/${id}`, contacto);

    
    

    const respuesta = response.data;
    console.log(respuesta);
    
    
    if (respuesta ===null) {
      Swal.fire({
        text: "Error actualizando contacto..",
        icon: "error",
      });
    } else {
        Swal.fire({
            text: "Contacto actualizado con éxito..",
            icon: "success",
          });
     
      window.location.href = "/index";
    }
  };

  useEffect(() => {
    GetContact();
    //peticionGet();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <GroupAddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Editar Contacto
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="nombre"
                  name="nombre"
                  required
                  fullWidth
                  id="nombre"
                  label="Nombre"
                  value={nombre}  
                  onChange={(e) => setNombre(e.target.value)}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  id="telefono"
                  label="Telefono"
                  name="telefono"
                  autoComplete="family-name"
                  value={telefono}  
                  onChange={(e) => setTelefono(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  id="celular"
                  label="Celular"
                  name="celular"
                  autoComplete="family-name"
                  value={celular} 
                  onChange={(e) => setCelular(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              {/* 
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid> 
              */}
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleEdit}
            >
              Editar Contacto
            </Button>
            
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}