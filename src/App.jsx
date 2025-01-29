import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from './layout/AuthLayout';
import RutaProtegida from "./layout/RutaProtegida";
import AdministrarPacientes from "./paginas/AdministrarPacientes";
import Login from "./paginas/Login";
import Registrar from "./paginas/Registrar";
import OlvidePass from "./paginas/OlvidePass";
import ConfirmarCuenta from "./paginas/ConfirmarCuenta";
import NuevoPassword from "./paginas/nuevoPass";
import EditarPerfil from "./paginas/EditarPerfil";
import CambiarPassword from "./paginas/CambiarPassword";

import { AuthProvider } from "./context/AuthProvider";
import { PacientesProvider } from "./context/PacientesProvider";

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Routes>
            {/*PUBLIC AREA*/}
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />}/>
              <Route path="registrar" element={<Registrar />}/>
              <Route path="olvidepass" element={<OlvidePass />}/>
              <Route path="olvidepass/:token" element={<NuevoPassword />}/>
              <Route path="confirmar/:id" element={<ConfirmarCuenta />}/>
            </Route>

            {/*PRIVATE AREA*/}
            <Route path="/admin" element={<RutaProtegida />}>
              <Route index element={<AdministrarPacientes />} />
              <Route path="perfil" element={<EditarPerfil />} />
              <Route path="cambiar-password" element={<CambiarPassword />} />
            </Route>
          </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
