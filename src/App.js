import React from "react";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import EventsTable from "./pages/EventsTable";
import EventDetail from "./pages/EventDetails";

function App(){
  return(
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<EventsTable />} /> 
          <Route path="/event/:id" element={<EventDetail />} /> 
        </Routes>
      </div>
    </Router>
  );
} 

export default App;
