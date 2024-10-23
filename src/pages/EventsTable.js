import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_KEY } from "../config";
import SearchBar from "../components/SearchBar/SearchBar";
import Table from "../components/Table/Table";
import Pagination from "../components/Pagination/Pagination";

const EventsTable = () => {
  const [events, setEvents] = useState([]); //state of events
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize] = useState(50);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    // To GET DATA FROM API when currentPage or sorting parameters change
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `https://app.ticketmaster.com/discovery/v2/events.json`,
          {
            params: {
              apikey: API_KEY,
              keyword: searchKeyword,
              page: currentPage,
              size: pageSize,
              sort: sortField ? `${sortField},${sortDirection}` : null, // Sort by field and direction
            },
          }
        );

        if (response.data._embedded && response.data._embedded.events) {
          setEvents(response.data._embedded.events); // Save events to state
          setTotalPages(response.data.page.totalPages); // Set total page number
        } else {
          setEvents([]); // Set to empty if no data found
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchEvents(); // Call the fetch function inside useEffect
  }, [currentPage, sortField, sortDirection, searchKeyword, pageSize]); // Add sortField and sortDirection as dependencies

  const handleSearch = () => {
    setCurrentPage(0); // Reset to first page when searching
  };

  const handleSort = (field) => {
    const direction =
      sortField === field && sortDirection === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortDirection(direction);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const columns = [
    { label: "Event Name", accessor: "name", sortable: true },
    { label: "Date", accessor: "date", sortable: false },
    { label: "Venue", accessor: "venue", sortable: false },
    { label: "Details", accessor: "details", sortable: false },
  ];

  const data = events.map((event) => ({
    name: event.name,
    date: new Date(event.dates.start.localDate).toLocaleDateString(),
    venue: event._embedded?.venues?.[0]?.name || "Venue not available",
    details: (
      <Link to={`/event/${event.id}`}>
        <button>Show Details</button>
      </Link>
    ),
  }));

  return (
    <div>
      <h1>Event List</h1>
      <SearchBar
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        handleSearch={handleSearch}
      />
      <Table
        columns={columns}
        data={data}
        onSort={handleSort}
        sortField={sortField}
        sortDirection={sortDirection}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onNextPage={handleNextPage}
        onPrevPage={handlePrevPage}
      />
    </div>
  );
};

export default EventsTable;
