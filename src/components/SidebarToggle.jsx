// src/components/SidebarToggle.jsx
import PropTypes from "prop-types";
import { FaCaretLeft } from "react-icons/fa";

const SidebarToggle = ({ isActive, handleMenuBtnClick }) => (
  <div
    className="absolute right-[-14px] top-3.5 w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer text-gray-500 border-2 border-gray-200 bg-white transition-all duration-300 hover:text-black"
    onClick={handleMenuBtnClick}
  >
    <FaCaretLeft
      className={`transition-transform duration-300 ${
        isActive ? "rotate-180" : ""
      }`}
    />
  </div>
);

SidebarToggle.propTypes = {
  isActive: PropTypes.bool.isRequired,
  handleMenuBtnClick: PropTypes.func.isRequired,
};

export default SidebarToggle;
