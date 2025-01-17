import { apiGetDashboardReport } from "../services/reports.service";
export const dashboard = {
  state: {
    stats: {
      total_draft_quotes: "0",
      total_quotes: "0",
      total_quotes_today: "0",
      total_ready_quotes: "0",
      total_sent_quotes: "0",
      total_user: "10",
      total_users_admin_role: "2",
      total_users_moderator_role: "2",
      total_users_user_role: 0,
      total_products: "",
      total_customers:""
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
      const res = await apiGetDashboardReport();
      console.log("🚀 ~ fetchStats ~ res:", res);
      const stats = {
        users: 150,
        products: 324,
        customers: 1250,
      };
      dispatch.dashboard.setStats(res[0]);
    },
  }),
};
