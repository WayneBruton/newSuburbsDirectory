import Api from "@/services/Api";

export default {
  areas() {
    return Api().get(`/areas`);
  },
  categories(area) {
    return Api().get(`/categories/${area}`);
  },
  profiles(credentials) {
    return Api().put(`/profiles`, credentials);
  },
  getPackages(credentials) {
    return Api().put(`/getPackages`, credentials);
  },
  getExtraPackages() {
    return Api().get(`/getExtraPackages`);
  },
  checkEmail(credentials) {
    return Api().put(`/checkEmail`, credentials);
  },
  addProfile(credentials) {
    return Api().post(`/addProfile`, credentials);
  },
  getProfile(credentials) {
    return Api().get(`/getProfile/${credentials}`);
  },
  getRatings(credentials) {
    return Api().put(`/getRatings`, credentials);
  },
  updateRatings(credentials) {
    return Api().post(`/updateRatings`, credentials);
  },
  login(credentials) {
    return Api().put(`/login`, credentials);
  },
  resetPasswordLink(credentials) {
    return Api().put(`/resetPasswordLink`, credentials);
  },
  resetPasswordStart(uri) {
    return Api().get(`/resetPasswordStart/${uri}`);
  },
  resetPassword(credentials) {
    return Api().put(`/resetPassword`, credentials);
  },
  checkout(credentials) {
    console.log(credentials);
    return Api().post(`/v1/checkouts`, credentials);
  },
  editProfile(credentials) {
    console.log(credentials)
    return Api().post(`/editProfile`, credentials);
  }
};
