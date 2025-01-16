import axiosInstance from "./axios.Service";

export const apigetProducts = async ({ page = 1 }) => {
  console.log("Fetching products with pagination:", { page });
  try {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem("auth");
    const parsed = JSON.parse(accessToken);

    const response = await axiosInstance.get("products", {
      params: { page },
      headers: {
        Authorization: `Bearer ${parsed.user.accessToken}`, // Include the token in the Authorization header
      },
    });

    console.log("Products fetched successfully:", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const apiAddProduct = async (data) => {
  console.log("Adding a product:", data);

  try {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem("auth");
    const parsed = JSON.parse(accessToken);

    // Make the API request to add a product
    const response = await axiosInstance.post(
      "products",
      data, // Pass the product data in the request body
      {
        headers: {
          Authorization: `Bearer ${parsed.user.accessToken}`, // Include the token in the Authorization header
        },
      }
    );

    console.log("Product added successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error adding product:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const apiDeleteProduct = async (id) => {
  try {
    const accessToken = localStorage.getItem("auth");
    const parsed = JSON.parse(accessToken);

    const response = await axiosInstance.delete(`products/${id}`, {
      headers: {
        Authorization: `Bearer ${parsed.user.accessToken}`,
      },
    });

    console.log("Product deleted successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting product:",
      error.response?.data || error.message
    );
    throw error;
  }
};
