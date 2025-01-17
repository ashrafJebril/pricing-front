import { apiAddQuotes, apigetQuotes } from "../services/quotes.service";
export const quotesStore = {
  state: {
    quotesList: [],
    quotes: {
      products: [], // Store selected products
      customer: {},
      discount: 0,
    },
  },
  reducers: {
    setQuotes(state, payload) {
      console.log("ya", payload);
      return {
        ...state,
        quotesList: payload.data,
      };
    },
    updateSelectedProducts(state, payload) {
      return {
        ...state,
        quotes: {
          ...state.quotes,
          products: payload, // Update with the latest selection
        },
      };
    },
    saveQuotes(state, payload) {
      return {
        ...state,
        quotes: {
          ...state.quotes,
          products: payload.products, // Update products in the store
        },
      };
    },
    saveDiscountAndCustomer(state, payload) {
      return {
        ...state,
        quotes: {
          ...state.quotes,
          customer: payload.customer, // Update customer
          discount: payload.discount, // Update discount
        },
      };
    },
  },
  effects: (dispatch) => ({
    async saveQuote(payload) {
      try {
        let local = JSON.parse(localStorage.getItem("auth"));

        let data = {
          creatorId: local.user.user.id,
          customerId: payload.customerId,
          quote: JSON.stringify(payload.quote),
          status: payload.status,
        };
        console.log("Quote saved successfully:", data);
        console.log("Quote saved successfully:", payload);
        const response = await apiAddQuotes(data);

        // dispatch.quotesStore.setQuotesList({
        //   ...rootState.quotesStore.quotes,
        //   status,
        // });
        // alert(`Quote successfully saved with status: ${status}`);
      } catch (error) {
        console.error("Error saving quote:", error);
        alert("Failed to save quote. Please try again.");
      }
    },
    async fetchQuotes({ page = 1, rows = 10 }) {
      // dispatch.quotesStore.setLoading(true);
      try {
        const response = await apigetQuotes({ page, rows });
        const { data, metadata } = response;
        console.log("dataaaa", data);
        dispatch.quotesStore.setQuotes({
          data,
          currentPage: metadata.currentPage,
          totalPages: metadata.totalPages,
          totalItems: metadata.totalItems,
          pageSize: rows,
        });
      } catch (error) {
        console.error("Error fetching products:", error);
        // dispatch.quotesStore.setLoading(false);
      }
    },
  }),
};
