import axiosInstance from "./axios.Service";

export const apiLogin = async (payload) => {
  console.log(payload);
  try {
    const response = await axiosInstance.post("users/login", payload);
    console.log("Login successful:", response);
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const apiDeleteUser = async (id) => {
  try {
    const accessToken = localStorage.getItem("auth");
    const parsed = JSON.parse(accessToken);

    const response = await axiosInstance.delete(`users/${id}`, {
      headers: {
        Authorization: `Bearer ${parsed.user.accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error deleting product:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const apigetUsers = async ({ page = 1 }) => {
  try {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem("auth");
    const parsed = JSON.parse(accessToken);

    const response = await axiosInstance.get("users", {
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
