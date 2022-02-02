import Formulario from "../components/Formulario";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EditarCliente = () => {
    const [cliente, setCliente] = useState({});
    const [cargando, setCargando] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const obtenerClientesAPI = async () => {
            try {
                const url = `${import.meta.env.VITE_API_URL}/${id}`;
                const respuesta = await fetch(url);
                const resultado = await respuesta.json();
                setCliente(resultado);
            } catch (error) {
                console.log(error);
            }

            setCargando(!cargando);
        };

        obtenerClientesAPI();
    }, []);

    return (
        <>
            <h1 className='font-black text-4xl text-blue-900'>
                Editar Cliente
            </h1>
            {cliente?.nombre ? (
                <>
                    <p>Edite los datos del cliente</p>
                    <Formulario cliente={cliente} cargando={cargando} />
                </>
            ) : (
                !cargando && <p>ID del cliente no valido</p>
            )}
        </>
    );
};

export default EditarCliente;
