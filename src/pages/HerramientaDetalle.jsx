import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const HerramientaDetalle = () => {
    const { id } = useParams();
    const [herramienta, setHerramienta] = useState(null);

    useEffect(() => {
        const fetchHerramienta = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`http://127.0.0.1:8000/api/herramientas/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setHerramienta(response.data);
            } catch (error) {
                console.error("Hubo un error al obtener la herramienta:", error);
            }
        };

        fetchHerramienta();
    }, [id]);

    if (!herramienta) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    return (
        <div className="bg-gray-100 min-h-screen p-8">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="col-span-1">
                        {herramienta.foto_url && (
                            <img
                                src={`http://127.0.0.1:8000/storage/photo/${herramienta.foto_url}`}
                                alt={herramienta.nombre}
                                className="w-full h-full object-cover"
                            />
                        )}
                    </div>
                    <div className="col-span-1 p-8">
                        <h2 className="text-4xl font-bold mb-4">{herramienta.nombre}</h2>
                        <p className="text-gray-700 text-lg mb-6">{herramienta.descripcion}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-gray-500 text-lg">Estado: <span className={`font-semibold ${herramienta.estado === 'Disponible' ? 'text-green-600' : 'text-red-600'}`}>{herramienta.estado}</span></p>
                                <p className="text-gray-500 text-lg">Categoría: <span className="font-semibold">{herramienta.categoria}</span></p>
                                <p className="text-gray-500 text-lg">Fecha de Adquisición: <span className="font-semibold">{herramienta.fecha_adquisicion}</span></p>
                            </div>
                            <div>
                                <p className="text-gray-500 text-lg">Último Mantenimiento: <span className="font-semibold">{herramienta.ultimo_mantenimiento}</span></p>
                                <p className="text-gray-500 text-lg">Ubicación Actual: <span className="font-semibold">{herramienta.ubicacion_actual}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HerramientaDetalle;
