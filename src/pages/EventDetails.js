import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_KEY } from "../config";
import "./EventDetail.css";

const EventDetail = () => {
  const { id } = useParams(); //event id from URL
  const [event, setEvent] = useState(null); //.

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(
          `https://app.ticketmaster.com/discovery/v2/events/${id}.json`,
          {
            params: {
              apikey: API_KEY,
            },
          }
        );
        //console.log('API Response:', response.data);
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchEventDetails();
  }, [id]); // When id changed, call back API

  if (!event) {
    return <div>Loading...</div>;
  }

  const {
    name,
    dates,
    info,
    priceRanges,
    images,
    _embedded,
    classifications,
    promoter,
    sales,
    seatmap,
  } = event;

  const eventDate = dates?.start?.localDate || "Date not available";
  const eventTime = dates?.start?.localTime || "Time not available";
  const eventVenue = _embedded?.venues?.[0]?.name || "Venue not available";
  const eventAddress =
    _embedded?.venues?.[0]?.address?.line1 || "Address not available";
  const eventCity = _embedded?.venues?.[0]?.city?.name || "City not available";
  const eventState =
    _embedded?.venues?.[0]?.state?.name || "State not available";
  const eventCountry =
    _embedded?.venues?.[0]?.country?.name || "Country not available";
  const eventPrice = priceRanges
    ? `${priceRanges[0].min} - ${priceRanges[0].max} ${priceRanges[0].currency}`
    : "Price not available";
  const salesStartDate = sales?.public?.startDateTime
    ? new Date(sales.public.startDateTime).toLocaleString()
    : "Sales start date not available";
  const salesEndDate = sales?.public?.endDateTime
    ? new Date(sales.public.endDateTime).toLocaleString()
    : "Sales end date not available";
  const promoterName = promoter?.name || "Promoter not available";
  const promoterDescription =
    promoter?.description || "No promoter description available";
  const eventSegment =
    classifications?.[0]?.segment?.name || "Segment not available";
  const eventGenre = classifications?.[0]?.genre?.name || "Genre not available";
  const eventSubGenre =
    classifications?.[0]?.subGenre?.name || "Sub-genre not available";
  const eventImage = images?.[0]?.url || "";
  console.log(eventImage);
  const eventSeatMap = seatmap?.staticUrl || "";

  return (
    <div className="event-detail">
      <h1>{name}</h1>
      {eventImage && <img src={eventImage} alt={name} />}
      <p>
        <strong>Date:</strong> {eventDate}
      </p>
      <p>
        <strong>Time:</strong> {eventTime}
      </p>
      <p>
        <strong>Venue:</strong> {eventVenue}
      </p>
      <p>
        <strong>Address:</strong> {eventAddress}, {eventCity}, {eventState},{" "}
        {eventCountry}
      </p>
      <p>
        <strong>Price:</strong> {eventPrice}
      </p>
      <p>
        <strong>Sales Start:</strong> {salesStartDate}
      </p>
      <p>
        <strong>Sales End:</strong> {salesEndDate}
      </p>
      <p>
        <strong>Promoter:</strong> {promoterName}
      </p>
      <p>
        <strong>Promoter Description:</strong> {promoterDescription}
      </p>
      <p>
        <strong>Segment:</strong> {eventSegment}
      </p>
      <p>
        <strong>Genre:</strong> {eventGenre}
      </p>
      <p>
        <strong>Sub-genre:</strong> {eventSubGenre}
      </p>
      {eventSeatMap && <img src={eventSeatMap} alt="Seat Map" />}
      <p>
        <strong>Additional Info:</strong>{" "}
        {info || "No additional information available"}
      </p>
    </div>
  );
};

export default EventDetail;
