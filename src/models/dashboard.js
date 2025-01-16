export const dashboard = {
  state: {
    stats: {
      users: 0,
      products: 0,
      customers: 0,
    },
  },
  reducers: {
    setStats(state, payload) {
      return {
        ...state,
        stats: payload,
      };
    },
  },
  effects: (dispatch) => ({
    async fetchStats() {
      // Simulate API call
      const stats = {
        users: 150,
        products: 324,
        customers: 1250,
      };
      dispatch.dashboard.setStats(stats);
    },
  }),
}