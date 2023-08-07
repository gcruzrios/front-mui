
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";

import Index from "./pages/Dashboard";
import Login from "./pages/SignInSide";
import Registro from "./pages/SignUp";
import NotFound from "./pages/StickyFooter";
import AddContact from './pages/AddContact';
import EditContact from './pages/EditContact';
import Machote from './pages/Machote';
import Usuarios from './pages/Usuarios';
import AddUsuario from './pages/AddUsuario';
const estaAutenticado = () => {
  const token = localStorage.getItem("Token");
  
  if (token) {
    return <Navigate to="/" replace />;
  } else {
    return false;
  }
};


function App() {
  return (
    <Router>
    <div>
      {/* A <Switch> looks through its children <Route>s and
        renders the first one that matches the current URL. */}
      <Routes>
        <Route path="/" exact element={<Login />} />
         
        <Route path="/registro" exact element={<Registro />} />
              
        <Route path="/index" exact element={estaAutenticado() ? <Index /> : <Navigate to="/" />} />
        
        <Route path="/addcontacto" exact element={estaAutenticado() ? <AddContact/> : <Navigate to="/" />} />
        <Route path="/editcontacto" exact element={estaAutenticado() ? <EditContact/> : <Navigate to="/" />} />
        <Route path="/machote" exact element={estaAutenticado() ? <Machote/> : <Navigate to="/" />} />
        
        <Route path="/usuarios" exact element={estaAutenticado() ? <Usuarios/> : <Navigate to="/" />} />
        <Route path="/addusuario" exact element={estaAutenticado() ? <AddUsuario/> : <Navigate to="/" />} />
        {/*
        <Route path="/editcontact/:id" exact element={estaAutenticado() ? <EditContact/> : <Navigate to="/" />} />
        <Route path="/detailcontact/:id" exact element={estaAutenticado() ? <DetalleContact/> : <Navigate to="/" />} /> 
        */}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
