import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = ()=>{
    return useContext(AuthContext)
}

export default useAuth; 

//Custom Hook para manejar contexto de forma global, de esta manera se guarda el estado del login en todos los componentes