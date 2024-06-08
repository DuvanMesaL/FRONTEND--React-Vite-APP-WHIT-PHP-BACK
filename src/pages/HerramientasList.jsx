// src/pages/HerramientasList.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import HerramientaCard from "../components/HerramientaCard";
import FloatingButton from "../components/FloatingButton";
import SearchSidebar from "../components/SearchSidebar";
import ToolStats from "../components/ToolStats";
import InfoModal from "../components/InfoModal";
import { FaFilter, FaInfoCircle } from "react-icons/fa";

const HerramientasList = () => {
  const [herramientas, setHerramientas] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  useEffect(() => {
    const fetchHerramientas = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://127.0.0.1:8000/api/herramientas",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
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

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilters = (newFilters) => {
    setFilters(newFilters);
  };

  const filteredHerramientas = herramientas.filter((herramienta) => {
    return (
      herramienta.nombre.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filters.category ? herramienta.categoria === filters.category : true) &&
      (filters.status ? herramienta.estado === filters.status : true)
    );
  });

  const toolStats = [
    {
      label: "Total",
      value: herramientas.length,
    },
    {
      label: "Disponibles",
      value: herramientas.filter((h) => h.estado === "Disponible").length,
    },
    {
      label: "En Mantenimiento",
      value: herramientas.filter((h) => h.estado === "En Mantenimiento").length,
    },
    {
      label: "Asignadas",
      value: herramientas.filter((h) => h.estado === "Asignada").length,
    },
    {
      label: "Perdidas",
      value: herramientas.filter((h) => h.estado === "Perdida").length,
    },
  ];

  const searchFilters = [
    {
      name: "category",
      label: "Categoría",
      options: [
        { value: "categoria1", label: "Categoría 1" },
        { value: "categoria2", label: "Categoría 2" },
      ],
    },
    {
      name: "status",
      label: "Estado",
      options: [
        { value: "Disponible", label: "Disponible" },
        { value: "Asignada", label: "Asignada" },
        { value: "Perdida", label: "Perdida" },
        { value: "En Mantenimiento", label: "En Mantenimiento" },
        { value: "Eliminado", label: "Eliminado" },
      ],
    },
  ];

  return (
    <div className="flex min-h-screen">
      <div className="flex-grow p-9">
        <div className="flex justify-between items-center mb-4 mt-4">
          <h1 className="text-3xl font-bold">Lista de Herramientas</h1>
          <div className="flex space-x-4">
            <button
              className="text-blue-500 flex items-center"
              onClick={() => setIsSidebarOpen(true)}
            >
              <FaFilter className="mr-1" />
              Filtros
            </button>
            <button
              className="text-blue-500 flex items-center"
              onClick={() => setIsInfoModalOpen(true)}
            >
              <FaInfoCircle className="mr-1" />
              Información
            </button>
          </div>
        </div>
        <ToolStats stats={toolStats} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {filteredHerramientas.map((herramienta) => (
            <HerramientaCard
              key={herramienta.id}
              herramienta={herramienta}
              expanded={expanded === herramienta.id}
              toggleExpand={toggleExpand}
            />
          ))}
        </div>
        <FloatingButton text="Añadir Herramienta" to="/app/create-tool" />
      </div>
      <SearchSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onSearch={handleSearch}
        filters={searchFilters}
        onFilterChange={handleFilters}
      />
      <InfoModal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
      />
    </div>
  );
};

export default HerramientasList;
