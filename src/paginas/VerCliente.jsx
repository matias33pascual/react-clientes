import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Spinner from "./../components/Spinner";

const VerCliente = () => {
    const [cliente, setCliente] = useState({});
    const [cargando, setCargando] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const obtenerClienteAPI = async () => {
            try {
                const url = `http://localhost:4000/clientes/${id}`;
                const respuesta = await fetch(url);
                const resultado = await respuesta.json();
                setCliente(resultado);
            } catch (error) {
                console.log(error);
            }

            setTimeout(() => {
                setCargando(!cargando);
            }, 500);
        };

        obtenerClienteAPI();
    }, []);
    return cargando ? (
        <Spinner />
    ) : Object.keys(cliente).length === 0 ? (
        <p>No hay resultados</p>
    ) : (
        <div>
            <h1 className='font-black text-4xl text-blue-900'>
                Ver Cliente {cliente.nombre}
            </h1>
            <p className='uppercase text-gray-500'>Informacion del cliente</p>

            <p className='text-2xl text-gray-700'>
                <span className='text-gray-700 uppercase mt-4 font-bold'>
                    Cliente:
                </span>
                {cliente.nombre}
            </p>
            <p className='text-2xl text-gray-700'>
                <span className='text-gray-700 uppercase mt-4 font-bold'>
                    Email:
                </span>
                {cliente.email}
            </p>
            <p className='text-2xl text-gray-700'>
                <span className='text-gray-700 uppercase mt-4 font-bold'>
                    Empresa:
                </span>
                {cliente.empresa}
            </p>
            {cliente.notas && (
                <p className='text-2xl text-gray-700'>
                    <span className='text-gray-700 uppercase mt-4 font-bold'>
                        Notas:
                    </span>
                    {cliente.notas}
                </p>
            )}
        </div>
    );
};

// return Object.keys(cliente).length === 0 ? (
//     <p>Id no identificado</p>
// ) : (
//     <div>
//         {cargando ? (
//             "cargando..."
//         ) : (
//             <>

//         )}
//     </div>
// );

export default VerCliente;
