
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";

import Index from "./templates/dashboard/Dashboard";
import Login from "./templates/sign-in-side/SignInSide";
import Registro from "./templates/sign-up/SignUp";
import NotFound from "./templates/sticky-footer/StickyFooter";

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
        {/*
        <Route path="/addcontact" exact element={estaAutenticado() ? <AddContact/> : <Navigate to="/" />} />
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
