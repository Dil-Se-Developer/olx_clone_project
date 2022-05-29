import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsChat, BsSearch } from "react-icons/bs";
import { MdNotificationsNone } from "react-icons/md";
import { IoAddSharp } from "react-icons/io5";
import ToggleButton from "../ToggleMode/ToggleButton";
import "./Header.css";

const Header = (props) => {
  const [searchInput, setSearchInput] = useState("")
  const onSearchHandle = (event) => {
    event.preventDefault();
  };

  const Navigate = useNavigate();

  const sellHandler = (event) => {
    event.preventDefault();
    Navigate("post");
  };

  const logoutHandler = (event) => {
    event.preventDefault();
    Navigate("/", { replace: true });
  }

  return (
    <header className="header_section">
      <svg
        width="48px"
        height="48px"
        viewBox="0 0 1024 1024"
        data-aut-id="icon"
        fillRule="evenodd"
      >
        <path d="M661.333 256v512h-128v-512h128zM277.333 298.667c117.824 0 213.333 95.531 213.333 213.333s-95.509 213.333-213.333 213.333c-117.824 0-213.333-95.531-213.333-213.333s95.509-213.333 213.333-213.333zM794.496 384l37.504 37.504 37.504-37.504h90.496v90.496l-37.504 37.504 37.504 37.504v90.496h-90.496l-37.504-37.504-37.504 37.504h-90.496v-90.496l37.504-37.504-37.504-37.504v-90.496h90.496zM277.333 426.667c-47.061 0-85.333 38.293-85.333 85.333s38.272 85.333 85.333 85.333c47.061 0 85.333-38.293 85.333-85.333s-38.272-85.333-85.333-85.333z"></path>
      </svg>
      <form onSubmit={onSearchHandle}>
        <div className="header_input">
          <input
            type="text"
            placeholder="Find Cars,Mobile Phones and more..."
            value={searchInput}
            onChange={(event) => {
              setSearchInput(event.target.value)
            }}
          />
          <button onClick={() => props.handleSearch(searchInput)}>
            <BsSearch />
          </button>
        </div>
      </form>
      <BsChat size="2rem" />
      <MdNotificationsNone size="2rem" />
      <button className="header_sell_btn" onClick={sellHandler}>
        <IoAddSharp size="2rem" />
        SELL
      </button>
      <button className="header_sell_btn logout_btn" onClick={logoutHandler}>
        Logout
      </button>
      <ToggleButton/>
    </header>
  );
};

export default Header;
