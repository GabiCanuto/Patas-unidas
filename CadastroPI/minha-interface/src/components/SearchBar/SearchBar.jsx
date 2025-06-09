import React from "react";
import "./SearchBar.css";
import { FiSearch } from "react-icons/fi";

export default function SearchBar({ placeholder }) {
  return (
    <div className="search-bar">
      <FiSearch className="icon-search" />
      <input type="text" placeholder={placeholder} />
    </div>
  );
}
