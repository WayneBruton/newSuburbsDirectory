<template>
  <v-container>
    <img src="../assets/newLogo.png" alt="LOGO" style="width: 7.5%; " />

    <v-layout class="panelWidth" xs3 column justify-space-around>
      <v-flex xs12 sm8 md8 offset-md0>
        <panel title="Contact Us">
          <form name="tab-tracker-form" autocomplete="off">
            <v-flex sm12 offset-xs0>
              <v-text-field
                label="First Name"
                placeholder="First Name"
                v-model="firstname"
                autocomplete="false"
                required
              ></v-text-field>
              <v-text-field
                label="Last Name"
                placeholder="Last name"
                v-model="lastname"
                autocomplete="false"
                required
              ></v-text-field>
              <v-text-field
                label="Email"
                hint="Enter your email"
                :rules="emailRules"
                placeholder="email"
                v-model="email"
                autocomplete="false"
                required
              ></v-text-field>
              <br />
              <v-textarea
                label="Message"
                required
                placeholder="Message"
                v-model="message"
              >
              </v-textarea>
            </v-flex>
          </form>
          <br />
          <v-alert class="danger-alert" v-if="error" :value="true" type="error">
            {{ error }}
          </v-alert>
          <v-alert
            class="danger-alert"
            v-if="success"
            :value="true"
            type="success"
          >
            {{ success }}
          </v-alert>
          <v-btn
            id="btn2"
            @click="sendMessage"
            light
            style="background-color:#F4EBDE;"
          >
            Send
          </v-btn>
        </panel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Panel from "@/components/Panel.vue";
import DirectoryService from "../services/DirectoryServices";
export default {
  components: {
    Panel
  },
  data: () => ({
    valid: false,
    firstname: "",
    lastname: "",
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    message: "",
    error: null,
    success: null,
    required: value => !!value || "Required."
  }),
  methods: {
    async sendMessage() {
      if (
        this.firstname === "" ||
        this.lastname === "" ||
        this.email === "" ||
        this.message === ""
      ) {
        this.error = "All fields need to be filled in.";
      } else {
        this.error = null;
        await DirectoryService.contact({
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          message: this.message
        })
          .then(response => {
            if (
              response.data === "There was a problem, please try again later"
            ) {
              this.error = `There was a problem ${
                this.firstname
              }, please try again later`;
              this.success = null;
            } else {
              this.error = null;
              this.success = `Thank you ${
                this.firstname
              }. Your email has been sent`;
              this.firstname = "";
              this.lastname = "";
              this.email = "";
              this.message = "";
            }
            setTimeout(() => {
              this.error = null;
              this.success = null;
              this.firstname = "";
              this.lastname = "";
              this.email = "";
              this.message = "";
            }, 2000);
          })
          .catch(() => {
            this.error = "Error sending message, please try again later";
            this.success = null;
          });
      }
    }
  }
};
</script>

<style scoped></style>
