export const quotesStore = {
  state: {
    quotes: {
      products: [], // Store the products as an array
      customer: {},
    },
  },
  reducers: {
    saveQuotes(state, payload) {
      // Remove duplicates by checking if the product's id already exists
      const newProducts = payload.products.filter(
        (product) =>
          !state.quotes.products.some(
            (existingProduct) => existingProduct.id === product.id
          )
      );

      return {
        ...state,
        quotes: {
          ...state.quotes,
          products: [...state.quotes.products, ...newProducts], // Append only non-duplicate products
        },
      };
    },
  },
  effects: (dispatch) => ({}),
};
