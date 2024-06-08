// src/components/SidebarItem.jsx
import PropTypes from "prop-types";

const SidebarItem = ({ href, icon: Icon, text, isActive }) => (
  <li className="relative list-none mb-1">
    <a
      href={href}
      className="flex items-center gap-2 text-sm font-medium text-gray-500 no-underline py-3 px-2 rounded-lg transition-all duration-300 hover:text-black hover:bg-gray-100"
    >
      <Icon className="text-lg" />
      {!isActive && <span className="flex-1">{text}</span>}
    </a>
  </li>
);

SidebarItem.propTypes = {
  href: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  text: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default SidebarItem;
