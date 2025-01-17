import { apigetUsers } from "../services/User.service";

export const usersStore = {
  state: {
    users: [],
    pagination: {
      currentPage: 1,
      totalPages: 0,
      totalItems: 0,
      pageSize: 10,
    },
    loading: true,
  },
  reducers: {
    setusers(state, payload) {
      console.log("asfas", payload);
      return {
        ...state,
        users: payload.response,
        pagination: {
          currentPage: payload.currentPage,
          totalPages: payload.totalPages,
          totalItems: payload.totalItems,
          pageSize: payload.pageSize || state.pagination.pageSize,
        },
        loading: false,
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
    async fetchUsers({ page = 1, rows = 10 }) {
      dispatch.usersStore.setLoading(true);
      try {
        const response = await apigetUsers({ page, rows });

        console.log("datasfasga", response);
        dispatch.usersStore.setusers({
          response,
          //   currentPage: metadata.currentPage,
          //   totalPages: metadata.totalPages,
          //   totalItems: metadata.totalItems,
          //   pageSize: rows,
        });
      } catch (error) {
        console.error("Error fetching users:", error);
        dispatch.usersStore.setLoading(false);
      }
    },
  }),
};
