import { createStore } from 'vuex';

const store = createStore({
  state: {
    notificationCount: 0,
  },
  mutations: {
    incrementNotificationCount(state) {
      state.notificationCount += 1;
    },
  },
});

export default store;