import axiosInstance from "./axios.Service";

export const apigetCustomers = async ({ page = 1 }) => {
  console.log("Fetching customers with pagination:", { page });
  try {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem("auth");
    const parsed = JSON.parse(accessToken);

    const response = await axiosInstance.get("customers", {
      params: { page },
      headers: {
        Authorization: `Bearer ${parsed.user.accessToken}`, // Include the token in the Authorization header
      },
    });

    console.log("Customers fetched successfully:", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
};

export const apiAddCustomers = async (data) => {
  console.log("Adding a customer:", data);

  try {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem("auth");
    const parsed = JSON.parse(accessToken);

    // Make the API request to add a customer
    const response = await axiosInstance.post(
      "customers",
      data, // Pass the customer data in the request body
      {
        headers: {
          Authorization: `Bearer ${parsed.user.accessToken}`, // Include the token in the Authorization header
        },
      }
    );

    console.log("Customer added successfully:", response.data);
    return response; // Return the full response, not just response.data
  } catch (error) {
    console.error("Error adding customer:", error);
    throw error; // Rethrow the error for handling in the calling function
  }
};

export const apiDeleteCustomers = async (id) => {
  try {
    const accessToken = localStorage.getItem("auth");
    const parsed = JSON.parse(accessToken);

    const response = await axiosInstance.delete(`customers/${id}`, {
      headers: {
        Authorization: `Bearer ${parsed.user.accessToken}`,
      },
    });

    console.log("customers deleted successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting customers:",
      error.response?.data || error.message
    );
    throw error;
  }
};
