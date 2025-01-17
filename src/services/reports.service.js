import axiosInstance from "./axios.Service";

export const apiGetDashboardReport = async () => {
  try {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem("auth");
    const parsed = JSON.parse(accessToken);

    const response = await axiosInstance.get("reports/dashboard", {
      params: {},
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
