import React, { useEffect, useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import axios from "axios";

import Swal from "sweetalert2";
//import { Link } from "react-router-dom";




function Copyright(props) {
return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Sistema MUI React
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignInSide() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  useEffect(() => {
    //obtenerToken();
  }, []);

  // const obtenerToken = async () => {

  //     const auth_user = { Username: "c0n4p4n$AppSIPAMUser", Password: "c0n4p4n$AppSIPAMpass" }
  //     const respuesta = await axios.post(`/wsSIPAM/Authenticate`, auth_user);

  //     const token = respuesta.data.Token;

  //     localStorage.setItem('Token', token);

  // }

  const handleLogin = async (e) => {
    e.preventDefault();

//    const token = data.Token;
//    localStorage.setItem("Token", token);

    const ingreso = { email, password };
    
    console.log(ingreso);

    // const response = await axios.post(`/api/login`, ingreso, {
    //     "Content-Type": "application/json", headers: { Authorization: 'No Auth' } 
    // });

    const response = await axios.post(`/api/usuario/login`, ingreso);

    
    

    const mensaje = response.data.mensaje;
    console.log(mensaje);
    
    
    if (mensaje ==="Las Credenciales de usuario fallaron") {
      Swal.fire({
        text: "Usuario o contraseña incorrectas..",
        icon: "error",
      });
    } else {
      const token = response.data.token;
      const id_usuario = response.data.id;
      const nombre_usuario = response.data.nombre;
      const role_usuario = response.data.role;
      localStorage.setItem('Token', token);
      localStorage.setItem('idUsuario', id_usuario);
      localStorage.setItem('nombreUsuario', nombre_usuario);
      localStorage.setItem('role', role_usuario);
      window.location.href = "/index";
    }
  };


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
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={9}
          sx={{
            backgroundImage: 'url(https://mui.greiv.in/background.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={3} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleLogin}              
                >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/reset" variant="body2">
                    Olvido el password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/registro" variant="body2">
                    {"No tiene cuenta aún? Registrarse"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
