// src/components/SidebarMenu.jsx
import PropTypes from "prop-types";
import { FaCaretDown } from "react-icons/fa";

const SidebarMenu = ({
  icon: Icon,
  text,
  items,
  isActive,
  index,
  activeMenu,
  handleMenuClick,
}) => (
  <li
    className={`relative list-none mb-1 ${
      activeMenu === index ? "active" : ""
    }`}
    onClick={() => handleMenuClick(index)}
  >
    <a
      href="#"
      className="flex items-center gap-2 text-sm font-medium text-gray-500 no-underline py-3 px-2 rounded-lg transition-all duration-300 hover:text-black hover:bg-gray-100"
    >
      <Icon className="text-lg" />
      {!isActive && <span className="flex-1">{text}</span>}
      <FaCaretDown
        className={`text-base transition-transform duration-300 ${
          activeMenu === index ? "rotate-180" : ""
        }`}
      />
    </a>
    <ul
      className={`pl-5 pt-1 border-l border-gray-200 transition-all duration-300 ${
        activeMenu === index ? "block" : "hidden"
      } ${
        isActive
          ? "absolute left-[40px] top-0 ml-4 w-48 bg-white p-2 rounded-lg shadow-lg"
          : ""
      }`}
    >
      {items.map((item, idx) => (
        <li className="mb-1" key={idx}>
          <a
            href={item.href}
            className="py-2 px-2 text-xs block transition-all duration-300 hover:text-black hover:bg-gray-100 rounded-lg"
          >
            {item.text}
          </a>
        </li>
      ))}
    </ul>
  </li>
);

SidebarMenu.propTypes = {
  icon: PropTypes.elementType.isRequired,
  text: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
  isActive: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  activeMenu: PropTypes.number,
  handleMenuClick: PropTypes.func.isRequired,
};

export default SidebarMenu;
