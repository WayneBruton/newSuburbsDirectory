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
    profilesForCategoryAndAreaChosen: []
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
    }
  }
});
