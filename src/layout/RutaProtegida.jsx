import { Outlet, Navigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useAuth from "../hooks/useAuth";

const RutaProtegida = ()=>{

    const { auth, cargando } = useAuth(); 
    if (cargando) return "Cargando..."; 

    //console.log(auth); 

    return(
        <>
            <Header />
            
                {/*Usuario autenticado? => render Outlet, si no render Iniciar sesión */}
                {auth?._id ? (
                    <main className="container mx-auto mt-20">
                        <Outlet /> 
                    </main>
                ): <Navigate to="/" />}

            <Footer />
        </>
        
    )
}

export default RutaProtegida; 