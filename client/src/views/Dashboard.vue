<template>
  <v-container>
      <img src="../assets/newLogo.png" alt="LOGO" style="width: 7.5%;" />
    <br><br>
    <panel title="Dashboard"> 
      <v-layout class="panelWidth" xs12 column>
        <br />
        <v-btn style="background-color: #F4EBDE;" :to="{ name: 'profilelist' }">Profiles</v-btn>
        <br />
        <hr />
        <br />
        <v-btn style="background-color: #F4EBDE;">Charities</v-btn>
        <br />
        <hr />
        <br />
        <v-btn style="background-color: #F4EBDE;" :to="{ name: 'noticesadd' }">Notices</v-btn>
        <br />
        <hr />
        <br />
        <v-btn style="background-color: #F4EBDE;" :to="{ name: 'faqadd' }">FAQ</v-btn>
        <br />
        <hr />
        <br />
        <v-btn style="background-color: #F4EBDE;">Stats</v-btn>
        <br />
        <hr />
        <br />
        <v-btn style="background-color: #F4EBDE;" @click="addAdminUser">Add Admin User</v-btn>
        <br />
        <v-alert class="danger-alert" v-if="error" :value="true" type="error"
          >{{ error }}
        </v-alert>
        <v-alert
          class="danger-alert"
          v-if="success"
          :value="true"
          type="success"
          >{{ success }}
        </v-alert>
      </v-layout>
    </panel>
  </v-container>
</template>

<script>
import Panel from "@/components/Panel.vue";
import Authenticate from "@/functions/authenticateAdmin";
export default {
  data() {
    return {
      error: null,
      success: null
    };
  },
  components: {
    Panel
  },
  async mounted() {
    this.Authenticate = Authenticate.authenticate;
    this.Authenticate();
    // console.log(this.$store.state.addAdminUser)
    if (!this.$store.state.isAdminUserLoggedIn) {
      this.error =
        "Your session has expired! You will be redirected to the login page.";
      setTimeout(() => {
        this.error = null;
        this.$router.push({
          name: "loginAdmin"
        });
      }, 800);
    }
  },
  methods: {
    addAdminUser() {
      // this.$store.state.admin_user = null;
      // this.$store.state.isAdminUserLoggedIn = null;
      // this.$store.state.adminToken = null;
      console.log("Admin Token",this.$store.state.adminToken)
            this.$store.dispatch("setAdminToken", null);

      //  this.$store.dispatch("setAdminToken", null);
            // this.$store.dispatch("setAdminUser", null);
            console.log("Done")
      console.log("Admin Token",this.$store.state.adminToken)


      // this.$router.push("addAdminUser");
    },
    addProduct() {
      // this.$router.push("addproduct");
    },
    editProduct() {
      // this.$router.push("editproduct");
    },
    addFAQ() {
      // this.$router.push("addFaq");
    },
    editFAQ() {
      // this.$router.push("editFaq");
    },
    stats() {
      // this.$router.push("stats");
    },
    customers() {
      // this.$router.push("customers");
    }
  }
};
</script>

<style scoped></style>
