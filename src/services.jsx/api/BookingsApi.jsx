const BASE_URL = "https://v2.api.noroff.dev/holidaze";

const BOOKINGS_ENDPOINT = `${BASE_URL}/bookings`;

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
    const response = await fetch(`${BASE_URL}/bookings`, {
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
