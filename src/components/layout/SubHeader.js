import React from "react";
import "./SubHeader.css";

const SubHeader = ({ selectedCategory,handleCategorySelect }) => {
  
  return (
    
    <nav className="subheader_section">
      <button className={selectedCategory === "all" ? "button-selected" : ""} onClick={(event) => handleCategorySelect(event)} value="all">All</button>
      <button className={selectedCategory === "cars" ? "button-selected" : ""} onClick={(event) => handleCategorySelect(event)} value="cars">Cars</button>
      <button className={selectedCategory === "motorcycles" ? "button-selected" : ""} onClick={(event) => handleCategorySelect(event)} value="motorcycles">Motorcycles</button>
      <button className={selectedCategory === "mobilephones" ? "button-selected" : ""} onClick={(event) => handleCategorySelect(event)} value="mobilephones">Mobile Phones</button>
      <button className={selectedCategory === "scooters" ? "button-selected" : ""} onClick={(event) => handleCategorySelect(event)} value="scooters">Scooters</button>
      <button className={selectedCategory === "commercial&othervehicles" ? "button-selected" : ""} onClick={(event) => handleCategorySelect(event)} value="commercial&othervehicles">Commercial & Other Vehicles</button>
    </nav>
  );
};

export default SubHeader;
