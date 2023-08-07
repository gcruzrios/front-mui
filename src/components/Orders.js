import React, { useEffect, useState } from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import Button from '@mui/material/Button';

import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { Info } from "@mui/icons-material";



function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  const [obsSeleccionado, setobsSeleccionado] = useState({
    id: 1,
    nombre: "",
    telefono: "",
    celular: "",
    email: "",
    fechaCreacion: "0001-01-01T00:00:00",
  });

  // jefe:localStor
  const Token = localStorage.getItem("Token");
  //console.log(Token);
  const [data, setData] = useState([]);

  const peticionGet = async () => {
    //const idUsuario = localStorage.getItem('idUsuario');

    await axios.get("/api/contactos").then((response) => {
      setData(response.data);
    });
  };

  const eliminar_completo = async (id) => {
    const respuesta = await axios.delete(`api/contactos/${id}`);
    peticionGet();
  };
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Está seguro de borrar el registro?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Borrar",
      denyButtonText: `No borrar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        eliminar_completo(id);
        Swal.fire("Contacto borrado!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("El contacto no ha sido borrado", "", "info");
      }
    });
  };
  const handleEdit = async(id) => {
    localStorage.setItem('Id', id);

      window.location.href = "/editcontacto";
    console.log(obsSeleccionado);
  };

  useEffect(() => {
    peticionGet();
  }, []);

  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 20;

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const startIndex = currentPage * itemsPerPage;
  const selectedItems = data.slice(startIndex, startIndex + itemsPerPage);

  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Telefono</TableCell>
            <TableCell>Celular</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selectedItems.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.nombre}</TableCell>
              <TableCell>{row.telefono}</TableCell>
              <TableCell>{row.celular}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.fechaCreacion}</TableCell>
              <TableCell>
              {/* <Button
                type="submit"
                color = "success"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={()=>handleDetail(row.id)}
                size="small"  
                         
                >
                Detalle
              </Button> */}
              <Button
                type="submit"
                color = "primary"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={()=>handleEdit(row.id)}
                size="small"
                            
                >
                Editar
              </Button>
              <Button
                type="submit"
                color = "error"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={()=>handleDelete(row.id)}
                size="small"         
                >
                Borrar
              </Button>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
     
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        Ver más contactos
      </Link>
    </React.Fragment>
  );
}
