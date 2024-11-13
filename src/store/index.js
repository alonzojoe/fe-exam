import { createStore } from "vuex";

const store = createStore({
  state: {
    data: {
      authUser: {},
    },
  },
  mutations: {
    setAuthUser: (state, payload) => {
      state.data.authUser = payload;
    },
  },
  actions: {},
  getters: {
    getAuthUser: (state) => state.data.authUser,
  },
});

export default store;
