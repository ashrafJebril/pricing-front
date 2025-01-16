import { apigetCustomers } from "../services/customers.service";

export const customersStore = {
  state: {
    customers: [],
    pagination: {
      currentPage: 1,
      totalPages: 0,
      totalItems: 0,
      pageSize: 10,
    },
    loading: true,
  },
  reducers: {
    setCustomers(state, payload) {
      console.log("paa", payload);
      return {
        ...state,
        customers: payload.data,
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
    async fetchCustomers({ page = 1, rows = 10 }) {
      dispatch.customersStore.setLoading(true);
      try {
        const response = await apigetCustomers({ page, rows });
        const { data, metadata } = response;

        dispatch.customersStore.setCustomers({
          data,
          currentPage: metadata.currentPage,
          totalPages: metadata.totalPages,
          totalItems: metadata.totalItems,
          pageSize: rows,
        });
      } catch (error) {
        console.error("Error fetching customers:", error);
        dispatch.customersStore.setLoading(false);
      }
    },
  }),
};
