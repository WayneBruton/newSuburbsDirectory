import Api from "@/services/Api";

export default {
  areas() {
    // console.log("Connection")
    return Api().get(`/areas`);
  },
  categories(area) {
    return Api().get(`/categories/${area}`);
  }
  ,
  profiles(credentials) {
    console.log(credentials)
    return Api().put(`/profiles`, credentials);
  }
  // ,
  // productViews(credentials) {
  //   return Api().post(`/productViews`, credentials);
  // }
  ,
  insertPofileDraftImage(credentials) {
      console.log(credentials)
      return Api().post(`/insertPofileDraftImage`, credentials);
  },
  cropProfileImage(credentials) {
      console.log(credentials)
      return Api().put(`/cropProfileImage`, credentials);
  }
};
