<template>
  <v-container fluid>
    <v-layout class="panelWidth" xs12 sm8 md4 column justify-space-around>
      <br><br>
      <v-flex xs12 sm8 md4 offset-xs0>
        <img src="../assets/newLogo.png" alt="LOGO" style="width: 10%;">
        <br>
        <panel title="Login">
          <form name="tab-tracker-form" autocomplete="off">
            <v-flex xs12 sm8 md4>
              <v-text-field label="Email" placeholder="email" v-model="email"></v-text-field>
              <br>
              <v-text-field
                label="Password"
                type="password"
                placeholder="password"
                v-model="password"
              ></v-text-field>
            </v-flex>
          </form>
          <br>
          <v-alert class="danger-alert" v-if="error" :value="true" type="error">{{ error }}</v-alert>
          <v-alert class="danger-alert" v-if="success" :value="true" type="success">{{ success }}</v-alert>
          <v-btn @click="login" light color="#F4EBDE">Login</v-btn>
          <v-btn
            v-if="this.error === 'Password is incorrect. Please try again'"
            light
            color="#F4EBDE"
            @click="resetPasswordLink"
          >Reset Password</v-btn>
        </panel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Panel from "@/components/Panel.vue";
import DirectoryService from "@/services/DirectoryServices";
export default {
  data() {
    return {
      email: "",
      password: "",
      error: null,
      success: null,
      required: value => !!value || "Required."
    };
  },
  components: {
    Panel
  },
  methods: {
    async login() {
      try {
        const response = await DirectoryService.login({
          email: this.email,
          user_password: this.password
        });
        console.log(response);
        if (response.data.error) {
          this.error = response.data.error;
        } else {
          this.$store.dispatch("setToken", response.data.token);
          this.$store.dispatch("setUser", response.data.user);
          this.success = `Welcome ${response.data.username}`
          this.error = null; 
          setTimeout(() => {
            this.success = null;
          this.$router.push({ name: "home" });

          }, 2000)
        }
      } catch (error) {
        this.error = error.response.data.error;
      }
    },
    async resetPasswordLink() {
      await DirectoryService.resetPasswordLink({ email: this.email })
        .then(response => {
          this.success = response.data;
          this.error = null;
          setTimeout(() => {
            this.error = null;
            this.success = null;
            this.$router.push({ name: "home" });
          }, 3000);
        })
        .catch(() => {
          this.error = "There was a connection error, please try again later.";
          setTimeout(() => {
            this.error = null;
          }, 3000);
        });
    }
  }
};
</script>

<style scoped></style>
