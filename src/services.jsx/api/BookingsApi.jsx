const BASE_URL = "https://v2.api.noroff.dev";

const BOOKINGS_ENDPOINT = `${BASE_URL}/holidaze/bookings`;

export const getAllBookings = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const apiKey = localStorage.getItem("apiKey");
    console.log("Access Token:", accessToken); // Log the token
    console.log("API Key:", apiKey); // Log the API key

    const response = await fetch(
      "https://v2.api.noroff.dev/holidaze/bookings",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "X-Noroff-API-Key": apiKey,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Response status:", response.status); // Log the response status
    console.log("Response status text:", response.statusText); // Log the response status text

    if (!response.ok) {
      console.error(`Error: ${response.status} ${response.statusText}`);
      throw new Error(
        `Failed to fetch bookings: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log("Response data:", data); // Log the response data
    return data;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
};

export const getBookingById = async (id) => {
  try {
    const response = await fetch(`${BOOKINGS_ENDPOINT}/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching booking by id:", error);
    throw error;
  }
};

export const createBooking = async (booking) => {
  const apiKey = localStorage.getItem("apiKey");
  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await fetch(`${BASE_URL}/holidaze/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": apiKey,
      },
      body: JSON.stringify(booking),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create booking");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
};

export const updateBooking = async (id, booking) => {
  try {
    const response = await fetch(`${BOOKINGS_ENDPOINT}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(booking),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating booking:", error);
    throw error;
  }
};

export const deleteBooking = async (id) => {
  try {
    const response = await fetch(`${BOOKINGS_ENDPOINT}/${id}`, {
      method: "DELETE",
    });
    return response.status === 204;
  } catch (error) {
    console.error("Error deleting booking:", error);
    throw error;
  }
};
