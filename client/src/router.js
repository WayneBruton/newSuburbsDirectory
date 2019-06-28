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
import EditProfile from "./views/EditProfile.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  // base: process.env.BASE_URL,
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
    }
  ]
});
