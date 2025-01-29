import { Link } from "react-router-dom"; 
import { useState } from "react"; 
import Alerta from "../components/Alerta";
import clienteAxios from "./config/axios";

const Registrar = ()=>{
    //definiendo state por cada campo 
    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repetirPassword, setRepetirPassword] = useState('')

    const [alerta, setAlerta] = useState({}); 

    const handleSubmit = async(e)=>{
        e.preventDefault();

        if([nombre, email, password, repetirPassword].includes('')){
            setAlerta({msg: "Los campos son obligatorios", error: true}); 
            return; 
        }

        if(password !== repetirPassword){
            setAlerta({msg: "Los password no coinciden", error: true}); 
            return;
        }

        if(password.length < 6){
            setAlerta({msg: "El password no es seguro, se requieren más carácteres", error: true}); 
            return; 
        }

        setAlerta({}); 

        //Crear el usuario en la api 
        try {
            const url = `/veterinarios`; 
            await clienteAxios.post(url, { nombre, email, password } ); 
            setAlerta({
                msg: "Usuario creado correctamente, revisa tu email",
                error: false
            });

        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            }); 
        }


    }

    const {msg} = alerta

    return(
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-5xl ">Crea una cuenta y administra tus
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
                        <label className="uppercase text-gray-500 block text-xl font-bold">Nombre</label>
                        <input 
                            type="text" 
                            placeholder="Tu nombre" 
                            className="border w-full p-3 mt-2 bg-gray-50 rounded-lg"
                            value={nombre}
                            onChange={ e => setNombre(e.target.value)}
                        />
                    </div>

                    <div className="my-5">
                        <label className="uppercase text-gray-500 block text-xl font-bold" >Email</label>
                        <input 
                            type="email" 
                            placeholder="Email de usuario" 
                            className="border w-full p-3 mt-2 bg-gray-50 rounded-lg"
                            value={email}
                            onChange={ e => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="my-5">
                        <label className="uppercase text-gray-500 block text-xl font-bold" >Password</label>
                        <input 
                            type="password" 
                            placeholder="Introduce tu password" 
                            className="border w-full p-3 mt-2 bg-gray-50 rounded-lg"
                            value={password}
                            onChange={ e => setPassword(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="uppercase text-gray-500 block text-xl font-bold" >Repetir password</label>
                        <input 
                            type="password" 
                            placeholder="Repetir password" 
                            className="border w-full p-3 mt-2 bg-gray-50 rounded-lg"
                            value={repetirPassword}
                            onChange={ e => setRepetirPassword(e.target.value)}
                        />
                    </div>

                    <input 
                        type="submit" 
                        value="Regístrate"
                        className="bg-indigo-700 w-full py-3 px-10 rounded-lg text-white uppercase font-bold mt-7 
                                    hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
                    />
                </form>

                <nav className="mt-5 lg:flex lg:justify-between">
                    <Link 
                        className="block text-center my-7 text-gray-500 hover:underline"
                        to="/">¿Ya tienes cuenta? Inicia sesión
                    </Link>
                    
                    <Link 
                        className="block text-center my-7 text-gray-500 hover:underline"
                        to="/olvidepass">He olvidado el password
                    </Link>
                </nav>

            </div>

        </>
    )
}

export default Registrar;


