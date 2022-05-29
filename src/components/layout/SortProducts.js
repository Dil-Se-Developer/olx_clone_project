import React from 'react'

import './SortProducts.css'

const SortProducts = ({ handleSoritngSelect }) => {
    return (
        <div className="sort_section">
            <label htmlFor="sort">SORT BY: </label>
            <select name="sort" id="sort" onChange={(event) => handleSoritngSelect(event)}>
                <option value="none" >None</option>
                <option value="lowtohigh">Price: Low to High</option>
                <option value="hightolow">Price: High to Low</option>
            </select>
        </div>
    )
}

export default SortProducts