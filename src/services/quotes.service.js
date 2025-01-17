import axiosInstance from "./axios.Service";

export const apigetQuotes = async ({ page = 1 }) => {
  console.log("Fetching quotes with pagination:", { page });
  try {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem("auth");
    const parsed = JSON.parse(accessToken);

    const response = await axiosInstance.get("quotes", {
      params: { page },
      headers: {
        Authorization: `Bearer ${parsed.user.accessToken}`, // Include the token in the Authorization header
      },
    });

    console.log("Quotes fetched successfully:", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching quotes:", error);
    throw error;
  }
};

export const apiAddQuotes = async (data) => {
  console.log("Adding a Quotes:", data);

  try {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem("auth");
    const parsed = JSON.parse(accessToken);

    // Make the API request to add a product
    const response = await axiosInstance.post(
      "quotes",
      data, // Pass the product data in the request body
      {
        headers: {
          Authorization: `Bearer ${parsed.user.accessToken}`, // Include the token in the Authorization header
        },
      }
    );

    console.log("quotes added successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error adding quotes:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const apiDeleteQuotes = async (id) => {
  try {
    const accessToken = localStorage.getItem("auth");
    const parsed = JSON.parse(accessToken);

    const response = await axiosInstance.delete(`quotes/${id}`, {
      headers: {
        Authorization: `Bearer ${parsed.user.accessToken}`,
      },
    });

    console.log("quotes deleted successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting quotes:",
      error.response?.data || error.message
    );
    throw error;
  }
};
