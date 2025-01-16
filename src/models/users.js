import { addNewUser } from "../services/User.service";
export default {
  state: {
    loading: false,
  },
  reducers: {
    setLoading(state, payload) {
      return {
        ...state,
        loading: payload,
      };
    },
  },
  effects: (dispatch) => ({
    async createNewUser(payload) {
      dispatch.users.setLoading(true);
      const response = await addNewUser(payload);
      if (response?.status == 201) {
        dispatch.users.setLoading(false);
      }
    },
  }),
};
