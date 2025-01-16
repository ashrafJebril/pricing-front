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

export const addNewUser = async (payload) => {
  try {
    const response = await axiosInstance.post("users/register", payload);
    return response.data;
  } catch (error) {
    console.log("🚀 ~ addNewUser ~ error:", error)
    throw error;
  }
};
