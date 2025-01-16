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
