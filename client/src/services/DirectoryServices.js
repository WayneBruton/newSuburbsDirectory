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
    // console.log(credentials)
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
    console.log(credentials);
    return Api().post(`/editProfile`, credentials);  
  },
  addNoticeImage(credentials) {
    console.log(credentials);
    return Api().post(`/addNoticeImage`, credentials);
  },
  postNotice(credentials) {
    console.log(credentials);
    return Api().post(`/postNotice`, credentials);
  },
  getNotices() {
    return Api().get(`/getNotices`);
  },
  deleteNotices(credentials) {
    console.log(credentials);
    return Api().post(`/deleteNotices`, credentials);
  },
  addFAQ(credentials) {
    console.log(credentials);
    return Api().post(`/addFAQ`, credentials);
  },
  getFAQ() {
    return Api().get(`/getFAQ`);
  },
  deleteFAQ(credentials) {
    console.log(credentials);
    return Api().post(`/deleteFAQ`, credentials);
  },
  getProfilesForDashboard() {
    return Api().get(`/getProfilesForDashboard`);
  },
  getProfileForAdmin(profileID) {
    console.log("Profile to get::", profileID);
    return Api().get(`/getProfileForAdmin/${profileID}`);
  },
  addTask(credentials) {
    console.log(credentials);
    return Api().post(`/addTask`, credentials);
  },
  getTasks() {
    console.log("Getting Tasks!!");
    return Api().get(`/getTasks`);
  },
  deleteTask(taskID) {
    console.log("Profile to Delete::", taskID);
    return Api().delete(`/deleteTask/${taskID}`);
  },
  editTask(credentials) {
    console.log("Profile to Edit::", credentials);
    return Api().put(`/editTask`, credentials);
  },
  contact(credentials) {
    // console.log("Contact Form::", credentials);
    return Api().put(`/contactform`, credentials);
  },
  payURL(credentials) {
    console.log("Payment Details:", credentials);
    return Api().put(`/payurl`, credentials);
  },
  paymentsuccess(credentials) { 
    console.log(credentials);
    return Api().put(`/paymentsuccess/${credentials}`);
  },
  processPayment(credentials) {
    console.log(credentials);
    return Api().put(`/processPayment`, credentials);
  },
  getCategories() {
    return Api().get(`/getCategories`);
  },
}; 
