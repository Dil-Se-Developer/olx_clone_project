import React, { useState, useEffect } from 'react'
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";

import './ToggleButton.css'

const ToggleButton = () => {
    const [theme, setTheme] = useState("light_theme");

    const styleChanger = () => {
        theme === "dark_theme" ? setTheme("light_theme") : setTheme("dark_theme");
    }

    useEffect(() => {
        document.body.className = theme;
    }, [theme])

    return (
        <div>
            <button className='togglebtn' onClick={() => styleChanger()}>{theme === "light_theme" ? <BsFillMoonFill /> : <BsFillSunFill />}</button>
        </div>
    )
}

export default ToggleButton