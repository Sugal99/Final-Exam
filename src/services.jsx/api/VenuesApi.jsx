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
    const accessToken = localStorage.getItem("accessToken");
    const apiKey = localStorage.getItem("apiKey");

    const response = await fetch(VENUES_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": apiKey,
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

export const updateVenue = async (venueId, venueData, accessToken, apiKey) => {
  try {
    const response = await fetch(`${VENUES_ENDPOINT}/${venueId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(venueData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to update venue");
  }
};

export const deleteVenue = async (venueId, accessToken, apiKey) => {
  try {
    const response = await fetch(`${VENUES_ENDPOINT}/${venueId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": apiKey,
      },
    });
    if (response.ok) {
      console.log("Venue deleted successfully");
      return true;
    } else {
      throw new Error("Failed to delete venue");
    }
  } catch (error) {
    console.error("Error deleting venue:", error);
    return false;
  }
};
export const searchVenues = async (query, includeOwner = false) => {
  const queryParams = new URLSearchParams();
  queryParams.append("q", query);
  if (includeOwner) {
    queryParams.append("_owner", true);
  }

  try {
    const response = await fetch(`${VENUES_ENDPOINT}/search?${queryParams}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error searching venues:", error);
    throw error;
  }
};

export const getVenuesByProfile = async (profileName) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const apiKey = localStorage.getItem("apiKey");
    const url = `${BASE_URL}/profiles/${profileName}/venues`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": apiKey,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching venues:", error);
    throw error;
  }
};
