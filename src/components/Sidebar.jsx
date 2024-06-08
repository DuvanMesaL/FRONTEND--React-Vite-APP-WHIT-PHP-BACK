// src/components/Sidebar.jsx
import { useState } from "react";
import {
  FaHouseUser,
  FaUser,
  FaToolbox,
  FaProjectDiagram,
  FaCalendarAlt,
  FaHistory,
  FaCog,
  FaInfoCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import SidebarToggle from "./SidebarToggle";
import SidebarItem from "./SidebarItem";
import SidebarMenu from "./SidebarMenu";

const Sidebar = () => {
  const [isActive, setIsActive] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  const handleMenuBtnClick = () => {
    setIsActive(!isActive);
  };

  const handleMenuClick = (index) => {
    setActiveMenu(activeMenu === index ? null : index);
  };

  const menuItems = [
    { href: "/app/dashboard", icon: FaHouseUser, text: "Dashboard" },
    {
      icon: FaUser,
      text: "Users",
      items: [
        { href: "/app/usuarios", text: "List Users" },
        { href: "/app/usuarios/roles", text: "Manage Roles" },
        { href: "/app/usuarios/permisos", text: "Manage Permissions" },
      ],
      index: 1,
    },
    {
      icon: FaToolbox,
      text: "Tools",
      items: [
        { href: "/app/herramientas", text: "List Tools" },
        { href: "/app/herramientas/categorias", text: "Manage Categories" },
        {
          href: "/app/herramientas/mantenimiento",
          text: "Maintenance Schedule",
        },
      ],
      index: 2,
    },
    {
      icon: FaProjectDiagram,
      text: "Projects",
      items: [
        { href: "/app/proyectos", text: "List Projects" },
        { href: "/app/proyectos/tareas", text: "Manage Tasks" },
        { href: "/app/proyectos/informes", text: "Project Reports" },
      ],
      index: 3,
    },
    {
      icon: FaCalendarAlt,
      text: "Reservations",
      items: [
        { href: "/app/reservas", text: "List Reservations" },
        { href: "/app/reservas/calendario", text: "Reservation Calendar" },
        { href: "/app/reservas/historial", text: "Reservation History" },
      ],
      index: 4,
    },
    { href: "/app/historial", icon: FaHistory, text: "History" },
    { href: "/app/configuracion", icon: FaCog, text: "Settings" },
    { href: "/app/ayuda", icon: FaInfoCircle, text: "Help" },
    { href: "/logout", icon: FaSignOutAlt, text: "Logout" },
  ];

  return (
    <div
      className={`relative flex flex-col gap-5 bg-white p-6 rounded-[30px] transition-all duration-300 ${
        isActive ? "w-24" : "w-64"
      }`}
    >
      <SidebarToggle
        isActive={isActive}
        handleMenuBtnClick={handleMenuBtnClick}
      />
      <div className="flex gap-5 pb-5 border-b border-gray-200">
        <div className="w-11 h-11 rounded-full overflow-hidden">
          <img src="" alt="User" className="w-full object-cover" />
        </div>
        {!isActive && (
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase mb-2">
              AQ Inventory
            </p>
            <p className="text-sm font-medium">John Doe</p>
          </div>
        )}
      </div>
      <div className="flex-1">
        <div className="menu">
          <p className="text-xs font-medium text-gray-500 uppercase mb-2">
            Main
          </p>
          <ul>
            {menuItems
              .slice(0, 5)
              .map((item, idx) =>
                item.items ? (
                  <SidebarMenu
                    key={idx}
                    icon={item.icon}
                    text={item.text}
                    items={item.items}
                    isActive={isActive}
                    index={item.index}
                    activeMenu={activeMenu}
                    handleMenuClick={handleMenuClick}
                  />
                ) : (
                  <SidebarItem
                    key={idx}
                    href={item.href}
                    icon={item.icon}
                    text={item.text}
                    isActive={isActive}
                  />
                )
              )}
          </ul>
        </div>
        <div className="menu">
          <p className="text-xs font-medium text-gray-500 uppercase mb-2">
            Settings
          </p>
          <ul>
            <SidebarItem
              href={menuItems[5].href}
              icon={menuItems[5].icon}
              text={menuItems[5].text}
              isActive={isActive}
            />
          </ul>
        </div>
      </div>
      <div className="menu">
        <p className="text-xs font-medium text-gray-500 uppercase mb-2">
          Account
        </p>
        <ul>
          {menuItems.slice(6).map((item, idx) => (
            <SidebarItem
              key={idx}
              href={item.href}
              icon={item.icon}
              text={item.text}
              isActive={isActive}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
