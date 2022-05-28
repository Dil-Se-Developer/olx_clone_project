import React from "react";
import { NavLink } from "react-router-dom";
import "./SubHeader.css";

const SubHeader = () => {
  const navLinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? "bold" : "normal",
    };
  };
  return (
    <nav className="subheader_section">
      <NavLink style={navLinkStyles} to="/">
        All Categories
      </NavLink>
      <NavLink style={navLinkStyles} to="/">
        Cars
      </NavLink>
      <NavLink style={navLinkStyles} to="/">
        Motorcycles
      </NavLink>
      <NavLink style={navLinkStyles} to="/">
        Mobile Phones
      </NavLink>
      <NavLink style={navLinkStyles} to="/">
        Scooters
      </NavLink>
      <NavLink style={navLinkStyles} to="/">
        Commercial & Other Vehicles
      </NavLink>
    </nav>
  );
};

export default SubHeader;
