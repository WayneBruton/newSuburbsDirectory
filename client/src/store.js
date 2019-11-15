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

    selectedProfile: null,
    selectedProfileAdminUsage: null,
    uploadedImage: "",
    selectedSearchCategory: null,

    adminToken: null,
    isAdminUserLoggedIn: null,
    adminEmail: null,
    adminId: null,
    admin_user: null,
    admin_username: null
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
      state.profile = user.id;
      state.email = user.email;
      state.userName = user.username;
    },
    logout(state, user) {
      state.token = user;
      state.loggedIn = false;
      state.profile = user;
      state.email = user;
      state.userName = user;
    },
    setSelectedProfile(state, targetId) {
      state.selectedProfile = targetId;
    },
    selectedProfileAdminUsage(state, targetId) {
      state.selectedProfileAdminUsage = targetId;
    },
    setUploadedImage(state, loadedImage) {
      state.uploadedImage = loadedImage;
    },
    setAdminToken(state, token) {
      state.adminToken = token;
    },
    setAdminUser(state, user) {
      state.isAdminUserLoggedIn = true;
      state.adminEmail = user.email;
      state.adminId = user.id;
    },
    setSelectedSearchCategory(state, categoryID) {
      state.selectedSearchCategory = categoryID;
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
    },
    selectedProfileAdminUsage({ commit }, targetId) {
      commit("selectedProfileAdminUsage", targetId);
    },
    setUploadedImage({ commit }, loadedImage) {
      commit("setUploadedImage", loadedImage);
    },
    setAdminToken({ commit }, token) {
      commit("setAdminToken", token);
    },
    setAdminUser({ commit }, user) {
      commit("setAdminUser", user);
    },
    setSelectedSearchCategory({ commit }, categoryID) {
      commit("setSelectedSearchCategory", categoryID);
    }
  }
});
