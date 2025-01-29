import { useState, useEffect, createContext } from "react";
import clienteAxios from "../paginas/config/axios";

const AuthContext = createContext();

const AuthProvider = ({children})=>{

    const [cargando, setCargando] = useState(true); 
    const [auth, setAuth] = useState({}); 

    useEffect(()=>{

        const autenticarUser = async ()=>{

            const token = localStorage.getItem('token');
            if(!token){
                setCargando(false);
                return; 
            }

            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const { data } = await clienteAxios.get('/veterinarios/perfil', config); 
                setAuth(data.perfil); 
            } catch (error) {
                console.log(error.response.data.msg);
                setAuth({}); 
            }

            setCargando(false); 
        }

        autenticarUser(); 
        
    }, [])

    const cerrarSesion = ()=>{
        localStorage.removeItem('token');
        setAuth({}); 
    }

    const actualizarPerfil =  async (datos) =>{
        const token = localStorage.getItem('token');
        if(!token){
            setCargando(false);
            return; 
        }

        const config = {
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const url = `/veterinarios/perfil/${datos._id}`;
            const { data } = await clienteAxios.put(url, datos, config);
            
            return{
                msg: "Datos modificacios con éxito"
            }

        } catch (error) {
            return{
                msg: error.response.data.msg,
                error: true
            }
        }


    }

    const guardarPassword = async (datos) =>{
        const token = localStorage.getItem('token');
        if(!token){
            setCargando(false);
            return; 
        }

        const config = {
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const url = `/veterinarios/actualizar-password`;
            const { data } = await clienteAxios.put(url, datos, config);

            console.log(data); 

            return{
                msg: data.msg
            }

        } catch (error) {
            return{
                msg: error.response.data.msg,
                error: true
            } 
        }
    }

    return(
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesion,
                actualizarPerfil,
                guardarPassword
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}


export default AuthContext; 

export{AuthProvider}



//Para manejar contexto de forma global en todos los componentes