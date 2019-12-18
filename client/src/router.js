import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Faq from "./views/Faq.vue";
import Contact from "./views/Contact.vue";
import Directory from "./views/Directory.vue";
import About from "./views/About.vue";
import Profiles from "./views/Profiles.vue";
import ProfileDetails from "./views/ProfileDetails.vue";
import Profile from "./views/Profile.vue";
import Launchpad from "./views/Launchpad.vue";
import Login from "./views/Login.vue";
import ResetPassword from "./views/ResetPassword.vue";
import ResetAdminPassword from "./views/ResetAdminPassword.vue";
import EditProfile from "./views/EditProfile.vue";
import Pricing from "./views/Pricing.vue";
import Dashboard from "./views/Dashboard.vue";
import Charities from "./views/Charities.vue";
import Notices from "./views/Notices.vue";
import NoticesAdd from "./views/NoticesAdd.vue";
import FAQAdd from "./views/FAQAdd.vue";
import ProfileList from "./views/ProfileList.vue";
import ApproveProfile from "./views/ApproveProfile.vue";
import Todo from "./views/Todo.vue";
import PaymentSuccessfull from "./views/PaymentSuccessfull.vue";
import PaymentNotSuccessfull from "./views/PaymentNotSuccessfull.vue";
import LoginAdmin from "./views/LoginAdmin.vue";
import Search from "./views/Search.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  // base: process.env.BASEURL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/faq",
      name: "faq",
      component: Faq
    },
    {
      path: "/contact",
      name: "contact",
      component: Contact
    },
    {
      path: "/directory",
      name: "directory",
      component: Directory
    },
    {
      path: "/about",
      name: "about",
      component: About
    },
    {
      path: "/profiles",
      name: "profiles",
      component: Profiles
    },
    {
      path: "/register",
      name: "register",
      component: ProfileDetails
    },
    {
      path: "/profile/:profileId",
      name: "profile",
      component: Profile
    },
    {
      path: "/launchpad",
      name: "launchpad",
      component: Launchpad
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/resetPassword/:reset",
      name: "resetPassword",
      component: ResetPassword
    },
    {
      path: "/editProfile",
      name: "editProfile",
      component: EditProfile
    },
    {
      path: "/pricing",
      name: "pricing",
      component: Pricing
    },
    {
      path: "/admin/dashboard",
      name: "dashboard",
      component: Dashboard
    },
    {
      path: "/charities",
      name: "charities",
      component: Charities
    },
    {
      path: "/notices",
      name: "notices",
      component: Notices
    },
    {
      path: "/noticesadd",
      name: "noticesadd",
      component: NoticesAdd
    },
    {
      path: "/faqadd",
      name: "faqadd",
      component: FAQAdd
    },
    {
      path: "/profilelist",
      name: "profilelist",
      component: ProfileList
    },
    {
      path: "/profileAdmin",
      name: "profileAdmin",
      component: ApproveProfile
    },
    {
      path: "/todo",
      name: "todo",
      component: Todo
    },
    {
      path: "/paymentsuccess/:details",
      name: "paymentsuccess",
      component: PaymentSuccessfull
    },
    {
      path: "/paymentunsuccess/:details",
      name: "paymentunsuccess",
      component: PaymentNotSuccessfull
    },
    {
      path: "/loginAdmin",
      name: "loginAdmin",
      component: LoginAdmin
    },
    {
      path: "/resetAdminPassword/:reset",
      name: "resetAdminPassword",
      component: ResetAdminPassword
    },
    {
      path: "/search",
      name: "search",
      component: Search
    }
  ]
});
