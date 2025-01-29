import { useState } from "react"; 
import { Link } from "react-router-dom"; 
import Alerta from "../components/Alerta";
import clienteAxios from "./config/axios";

const OlvidePass = ()=>{
    const [email, setEmail] = useState("");
    const [alerta, setAlerta] = useState({}); 

    const handleSubmit = async (e)=>{
        e.preventDefault();

        if(email === "" || email.length < 5){
            setAlerta({msg: 'Se requiere su email', error: true}); 
            return
        }

        try {
            const { data } = await clienteAxios.post('/veterinarios/olvide-password', { email });
            console.log(data); 

            setAlerta({msg: data.msg}); 
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            });
        }
    }

    const {msg} = alerta; 

    return(
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-5xl ">Recupera tu contraseña y no pierdas a tus
                    <span className="text-black"> Pacientes</span>
                </h1>
           </div>

           <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-lg bg-white">

                {msg && <Alerta 
                    alerta={alerta}
                />}

                <form
                    onSubmit={handleSubmit}
                >
                    <div className="my-5">
                        <label className="uppercase text-gray-500 block text-xl font-bold" >Email</label>
                        <input 
                            type="email" 
                            placeholder="Email de usuario" 
                            className="border w-full p-3 mt-2 bg-gray-50 rounded-lg"
                            value={email}
                            onChange={e=> setEmail(e.target.value)}
                        />
                    </div>

                    <input 
                        type="submit" 
                        value="Enviar instrucciones"
                        className="bg-indigo-700 w-full py-3 px-10 rounded-lg text-white uppercase font-bold mt-5 
                                    hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
                    />

                </form>

                <nav className="mt-5 lg:flex lg:justify-between">
                    <Link 
                        className="block text-center my-7 text-gray-500 hover:underline"
                        to="/registrar">Regístrate
                    </Link>
                    
                    <Link 
                        className="block text-center my-7 text-gray-500 hover:underline"
                        to="/">¿Ya tienes cuenta? Inicia sesión
                    </Link>
                </nav>
                
            </div>

        </>
    )
}

export default OlvidePass;