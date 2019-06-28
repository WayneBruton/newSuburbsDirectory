import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    areaChosen: null,
    areas: [],
    categories: [],
    profilesForCategoryAndAreaChosen: [],

    token: null,
    loggedIn: false,
    profile: null,
    email: null,
    userName: null,

    selectedProfile: null
  },
  mutations: {
    setAreaChosen(state, areaChosen) {
      state.areaChosen = areaChosen;
    },
    setAreas(state, areas) {
      state.areas = areas;
    },
    setCategories(state, categories) {
      state.categories = categories;
    },
    getProfiles(state, profilesByCategory) {
      state.profilesForCategoryAndAreaChosen = profilesByCategory;
    },
    setToken(state, token) {
      state.token = token;
    },
    setUser(state, user) {
      state.loggedIn = true;
      state.profile = user.id
      state.email = user.email
      state.userName = user.username
    },
    logout(state, user) {
      state.token = user;
      state.loggedIn = false;
      state.profile = user
      state.email = user
      state.userName = user

    },
    setSelectedProfile(state, targetId) {
      state.selectedProfile = targetId;
    }
  },
  actions: {
    setAreaChosen({ commit }, areaChosen) {
      commit("setAreaChosen", areaChosen);
    },
    setAreas({ commit }, areas) {
      commit("setAreas", areas);
    },
    setCategories({ commit }, categories) {
      commit("setCategories", categories);
    },
    getProfiles({ commit }, profilesByCategory) {
      commit("getProfiles", profilesByCategory);
    },
    setToken({ commit }, token) {
      commit("setToken", token);
    },
    setUser({ commit }, user) {
      commit("setUser", user);
    },
    logout({ commit }, user) {
      commit("logout", user);
    },
    setSelectedProfile({ commit }, targetId) {
      commit("setSelectedProfile", targetId);
    }
  }
});
