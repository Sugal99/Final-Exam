// SingleVenue.jsx

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getVenueById } from "../services.jsx/api/VenuesApi";

const SingleVenuePage = () => {
  const { id } = useParams(); // Get the ID parameter from the URL
  const [venue, setVenue] = useState(null);

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const { data } = await getVenueById(id); // Fetch venue data by ID
        console.log("Fetched venue data:", data); // Log fetched data
        setVenue(data); // Set the fetched venue data to state
      } catch (error) {
        console.error("Error fetching venue:", error);
      }
    };

    fetchVenue();
  }, [id]);

  // Log the venue state to check if data is stored correctly
  console.log("Venue:", venue);

  // Render loading state while fetching data
  if (!venue) {
    return <div>Loading...</div>;
  }

  // Render venue details once data is fetched
  return (
    <div>
      <h2>{venue.name}</h2>
      <img
        src={venue.media[0].url}
        alt="Venue"
        style={{ height: "200px", objectFit: "cover" }}
      />
      <p>Description: {venue.description}</p>
      <p>
        Owner: {venue.owner.name}
        <img
          src={venue.owner.avatar.url}
          alt="Owner Avatar"
          className="rounded-circle me-2"
          style={{ width: "30px", height: "30px" }}
        />
      </p>
      <p>Rating: {venue.rating}</p>
      <p>Price: ${venue.price}</p>
      {/* Render other details of the venue */}
    </div>
  );
};

export default SingleVenuePage;
