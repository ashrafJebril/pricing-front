import axiosInstance from "./axios.Service";

export const apiLogin = async (payload) => {
  try {
    const response = await axiosInstance.post("users/login", payload);
    console.log("Login successful:", response);
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

<<<<<<< HEAD
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
=======
export const addNewUser = async (payload) => {
  try {
    const response = await axiosInstance.post("users/register", payload);
    return response.data;
  } catch (error) {
    console.log("🚀 ~ addNewUser ~ error:", error)
>>>>>>> df3a81fe79aa14fcbc33b62e186e8642e1af7262
    throw error;
  }
};
