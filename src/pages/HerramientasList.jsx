import { useState, useEffect } from 'react';
import axios from 'axios';

const HerramientasList = () => {
    const [herramientas, setHerramientas] = useState([]);
    const [expanded, setExpanded] = useState(null);

    useEffect(() => {
        const fetchHerramientas = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://127.0.0.1:8000/api/herramientas", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setHerramientas(response.data);
            } catch (error) {
                console.error("Hubo un error al obtener las herramientas:", error);
            }
        };

        fetchHerramientas();
    }, []);

    const toggleExpand = (id) => {
        setExpanded(expanded === id ? null : id);
    };

    return (
        <div className="min-h-screen p-9 bg-gray-100">
            <h1 className="text-3xl font-bold text-center mb-8">Lista de Herramientas</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {herramientas.map((herramienta) => (
                    <div key={herramienta.id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center p-4">
                            <img 
                                src={`http://127.0.0.1:8000/storage/photos/${herramienta.foto_url}`} 
                                alt={herramienta.nombre} 
                                className="w-20 h-20 object-cover rounded mr-4"
                            />
                            <div className="flex flex-col justify-between flex-grow">
                                <h2 className="text-xl font-semibold mb-2">{herramienta.nombre}</h2>
                                <p className={`text-gray-700 mb-2 ${expanded === herramienta.id ? '' : 'line-clamp-2'}`}>{herramienta.descripcion}</p>
                                <span className={`font-semibold ${herramienta.estado === 'Disponible' ? 'text-green-600' : 'text-red-600'}`}>{herramienta.estado}</span>
                            </div>
                        </div>
                        {expanded === herramienta.id && (
                            <div className="p-4">
                                <p className="text-gray-500">Fecha de Adquisición: {herramienta.fecha_adquisicion}</p>
                                <p className="text-gray-500">Último Mantenimiento: {herramienta.ultimo_mantenimiento}</p>
                                <p className="text-gray-500">Ubicación Actual: <span className="font-semibold">{herramienta.ubicacion_actual}</span></p>
                            </div>
                        )}
                        <div className="p-4 flex justify-between items-center">
                            <button onClick={() => toggleExpand(herramienta.id)} className="text-blue-500 hover:underline">
                                {expanded === herramienta.id ? 'Show less' : 'View more...'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HerramientasList;
