import React from "react";

const searchBar = ({ searchKeyword, setSearchKeyword, handleSearch }) => {
  return (
    <div className="search-bar">
      <input
        id="searchInput"
        type="text"
        placeholder="Search..."
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default searchBar;
