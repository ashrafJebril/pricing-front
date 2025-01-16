import { apigetProducts } from "../services/products.service";

export const productsStore = {
  state: {
    products: [],
    pagination: {
      currentPage: 1,
      totalPages: 0,
      totalItems: 0,
      pageSize: 10,
    },
    loading: true,
  },
  reducers: {
    setProducts(state, payload) {
      return {
        ...state,
        products: payload.data,
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
    async fetchProducts({ page = 1, rows = 10 }) {
      dispatch.productsStore.setLoading(true);
      try {
        const response = await apigetProducts({ page, rows });
        const { data, metadata } = response;

        dispatch.productsStore.setProducts({
          data,
          currentPage: metadata.currentPage,
          totalPages: metadata.totalPages,
          totalItems: metadata.totalItems,
          pageSize: rows,
        });
      } catch (error) {
        console.error("Error fetching products:", error);
        dispatch.productsStore.setLoading(false);
      }
    },
  }),
};
