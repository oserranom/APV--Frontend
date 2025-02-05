
const Alerta = ({alerta})=>{
    return(
        <div 
            className={`${alerta.error ? 'from-red-400 to-red-600' : 'from-indigo-400 to-indigo-600'} 
            bg-gradient-to-r text-center p-3 rounded-lg uppercase text-white font-bold text-sm mb-5`}>

            {alerta.msg}
        </div>
    )
}

export default Alerta; 