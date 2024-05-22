const BASE_URL = "https://v2.api.noroff.dev"; // Base URL

export const createApiKey = async (accessToken) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/create-api-key`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        name: "My API Key name", // Optional
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create API key");
    }

    const data = await response.json();
    return data.data.key; // Return the API key
  } catch (error) {
    console.error("Error creating API key:", error);
    throw error;
  }
};
