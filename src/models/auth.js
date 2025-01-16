import { apiLogin } from "../services/User.service";
export const auth = {
  state: {
    isAuthenticated: false,
    user: null,
    loading: true, // Add a loading state
  },
  reducers: {
    setAuth(state, payload) {
      return {
        ...state,
        isAuthenticated: payload.isAuthenticated,
        user: payload.user,
        loading: false, // Set loading to false after setting auth
      };
    },
    logout() {
      // Clear localStorage on logout
      localStorage.removeItem("auth");
      return {
        isAuthenticated: false,
        user: null,
        loading: false, // Set loading to false
      };
    },
    setLoading(state, loading) {
      return {
        ...state,
        loading,
      };
    },
  },
  effects: (dispatch) => ({
    async login(credentials) {
      // Simulate API call
      const response = await apiLogin({
        email: credentials.email,
        password: credentials.password,
      });
      if (response.accessToken) {
        // Update state
        dispatch.auth.setAuth({
          isAuthenticated: true,
          user: response,
        });

        // // Save to localStorage
        localStorage.setItem(
          "auth",
          JSON.stringify({ isAuthenticated: true, user: response })
        );

        return true;
      }
      return false;
    },
    loadAuthFromStorage() {
      // Check localStorage for saved credentials
      const savedAuth = localStorage.getItem("auth");
      if (savedAuth) {
        const authData = JSON.parse(savedAuth);
        dispatch.auth.setAuth(authData);
      } else {
        dispatch.auth.setLoading(false); // Set loading to false if no auth data
      }
    },
  }),
};
