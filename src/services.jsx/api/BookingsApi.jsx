const BASE_URL = "https://v2.api.noroff.dev";

const BOOKINGS_ENDPOINT = `${BASE_URL}/holidaze/bookings`;

export const getAllBookings = async () => {
  const accessToken = localStorage.getItem("accessToken");
  const apiKey = localStorage.getItem("apiKey");

  const response = await fetch(
    "https://v2.api.noroff.dev/holidaze/bookings?_venue=true",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": apiKey,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

export const getBookingById = async (venueId) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const apiKey = localStorage.getItem("apiKey");

    const response = await fetch(`${BOOKINGS_ENDPOINT}?venueId=${venueId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": apiKey,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch bookings: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching bookings by venue id:", error);
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

    if (response.ok) {
      // Booking successfully created
      const data = await response.json();
      return data;
    } else if (response.status === 409) {
      // Conflict - handle accordingly
      console.error("Conflict occurred:", response.statusText);
      // You can capture and handle the conflict scenario here
      throw new Error("Booking conflict occurred");
    } else {
      // Handle other error scenarios
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create booking");
    }
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error; // Propagate the error to the caller
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
