// services/api/VenuesApi.jsx
const BASE_URL = "https://v2.api.noroff.dev/holidaze";

const VENUES_ENDPOINT = `${BASE_URL}/venues`;

export const getAllVenues = async (includeOwner = false) => {
  const queryParams = new URLSearchParams();
  if (includeOwner) {
    queryParams.append("_owner", true);
  }

  try {
    const response = await fetch(`${VENUES_ENDPOINT}?${queryParams}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching venues:", error);
    throw error;
  }
};
export const getVenueById = async (id, includeOwner = true) => {
  const queryParams = new URLSearchParams();
  if (includeOwner) {
    queryParams.append("_owner", true);
  }

  try {
    const response = await fetch(`${VENUES_ENDPOINT}/${id}?${queryParams}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching venue by id:", error);
    throw error;
  }
};

export const createVenue = async (venue) => {
  try {
    const response = await fetch(VENUES_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(venue),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating venue:", error);
    throw error;
  }
};

export const updateVenue = async (id, venue) => {
  try {
    const response = await fetch(`${VENUES_ENDPOINT}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(venue),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating venue:", error);
    throw error;
  }
};

export const deleteVenue = async (id) => {
  try {
    const response = await fetch(`${VENUES_ENDPOINT}/${id}`, {
      method: "DELETE",
    });
    return response.status === 204;
  } catch (error) {
    console.error("Error deleting venue:", error);
    throw error;
  }
};

export const searchVenues = async (query) => {
  try {
    const response = await fetch(`${VENUES_ENDPOINT}/search?q=${query}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error searching venues:", error);
    throw error;
  }
};
