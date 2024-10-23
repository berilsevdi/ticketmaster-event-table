import React from 'react';

const FilterBar = ({ selectedType, setSelectedType, handleFilter, eventTypes }) => {
  return (
    <div className="filter-bar">
      <select
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
      >
        {eventTypes.map((type) => (
          <option key={type.id} value={type.id}>
            {type.name}
          </option>
        ))}
      </select>
      <button onClick={handleFilter}>Apply Filter</button>
    </div>
  );
};

export default FilterBar;
