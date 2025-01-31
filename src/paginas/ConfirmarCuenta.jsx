import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import clienteAxios from "./config/axios";
import Alerta from "../components/Alerta";

const ConfirmarCuenta = ()=>{
    const [cuentaConfirmada, setCuentaConfirmada] = useState(false); 
    const [cargando, setCargando] = useState(true); 
    const [alerta, setAlerta] = useState({}); 

    const params = useParams(); //Extrae el token de la url definido en la ruta como ../:id 
    const {id} = params; 

    useEffect(()=>{
        const confirmarCuenta = async ()=>{
            try {
                const url = `/veterinarios/confirmar/${id}`; 
                const { data } = await clienteAxios.get(url); 
                setCuentaConfirmada(true);

                setAlerta({
                    msg: data.msg
                }); 

            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                }); 
            }

            setCargando(false); 
        }
        confirmarCuenta(); 
    }, []);

    return(
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-5xl ">Confirma tu cuenta y comienza a Administrar 
                    <span className="text-black"> tus Pacientes</span>
                </h1>
           </div>

           <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-lg bg-white">
                {!cargando && <Alerta 
                    alerta={alerta}
                />}

                {cuentaConfirmada && (
                    <Link 
                        className="block text-center my-7 text-gray-500 hover:underline"
                        to="/">Iniciar sesión
                    </Link>
                )}
           </div>
        </>
    )
}

export default ConfirmarCuenta;


