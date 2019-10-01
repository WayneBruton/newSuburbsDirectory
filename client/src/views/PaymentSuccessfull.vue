<template>
  <v-container>
    <!-- <img src="../assets/heart_PNG51352.png" alt="LOGO" style="width: 10%;" /> -->
    <img src="../assets/newLogo.png" alt="LOGO" style="width: 7.5%;" />

    <v-flex xs12>
      <h1>Thank You</h1>
      <v-container>
        <br />
        <br />
        <v-layout column wrap>
          <div v-if="!pageExpired">
            <h1>Payment Successful</h1>
            <br />
            <span style="font-weight: bold">Welcome {{ firstName }}</span>
            <br />
            <span
              v-if="businessName"
            >Your business "{{ businessName.toUpperCase() }}" has been successfully subscribed to Suburbs Directory</span>
            <br />
            <span
              v-if="amountPaid"
            >You subscription expires: {{ newDate }}. Your payment was R{{ amountPaid.toFixed(2) }}</span>
            <br />
            <span>An email will be sent to {{ email }} for your records.</span>
          </div>
          <div v-else>
            <h1>This page has expired</h1>
          </div>
        </v-layout>
      </v-container>
    </v-flex>
  </v-container>
</template>

<script>
// import { VueMoment } from "vue-moment"
import DirectoryService from "@/services/DirectoryServices";
import moment from "moment";
export default {
  data() {
    return {
      currentdate: null,
      newDate: null,
      monthly: null,
      amountPaid: null,
      profileID: null,
      firstName: null,
      email: null,
      businessName: null,
      pageExpired: false,
      dateNow: null
    };
  },
  async created() {
    let url = window.location.href.split("/");
    let credentials = url[url.length - 1];
    console.log(url[url.length - 1]);
    let response = await DirectoryService.paymentsuccess(credentials);
    console.log("Response is:", response.data.decryptedString);
    let data = response.data.decryptedString.split("|");
    console.log(
      "current payment_expires",
      response.data.result[0].payment_expires
    ); 
    this.monthly = data[0];
    this.amountPaid = parseInt(data[1]);
    this.profileID = parseInt(data[2]);
    this.dateNow = (data[3]);
    console.log("monthly", this.monthly);
    console.log("Amount Paid:", this.amountPaid);
    console.log("profile:", this.profileID);
    console.log("Date Now::", this.dateNow);
    let dateNow = moment().format("DD-MM-YYYY")
    let newDateNow = moment(this.dateNow).format("DD-MM-YYYY")
    if (dateNow === newDateNow) {
      console.log("THE DATES MATCH")
    } else {
      console.log("THE DATES DO NOT MATCH!!!")
    }
    console.log("***Now Payment Processed***", dateNow)
    let currentExpiry = moment(response.data.result[0].payment_expires);
    let now = moment();
    console.log("Current Expiry", currentExpiry._d);
    console.log("Now", now._d);

    let diff = currentExpiry.diff(now, "days");
    console.log("DIFF", diff);
    if (dateNow !== newDateNow) {
      this.pageExpired = true;
      setTimeout(() => {
        this.$router.push({ name: "home" });
      }, 2500);
    } else if (diff > 0 && diff <= 7) {
      this.currentDate = currentExpiry;
      now = currentExpiry;
      console.log("Now", now);
      console.log("Monthly::", this.monthly);
      if (this.monthly == "true") {
        this.newDate = moment(now)
          .add(1, "month")
          .format("YYYY-MM-DD hh:mm");
      } else if (this.monthly == "false") {
        this.newDate = moment(now)
          .add(1, "year")
          .format("YYYY-MM-DD hh:mm");
      }
      credentials = {
        expiryDate: this.newDate,
        profileID: this.profileID,
        amountPaid: this.amountPaid
      };
      response = await DirectoryService.processPayment(credentials);
      console.log("this is the second response", response.data[0]);
      this.firstName = response.data[0].first_name;
      this.email = response.data[0].email;
      this.businessName = response.data[0].businessName;

      console.log("The new date", this.newDate);
    } else if (diff <= 0) {
      this.currentDate = now;
      console.log("Now", now);
      console.log("Monthly::", this.monthly);
      if (this.monthly == "true") {
        this.newDate = moment(now)
          .add(1, "month")
          .format("YYYY-MM-DD hh:mm");
      } else if (this.monthly == "false") {
        this.newDate = moment(now)
          .add(1, "year")
          .format("YYYY-MM-DD hh:mm");
      }
      credentials = {
        expiryDate: this.newDate,
        profileID: this.profileID,
        amountPaid: this.amountPaid
      };
      response = await DirectoryService.processPayment(credentials);
      console.log("this is the second response", response.data[0]);
      this.firstName = response.data[0].first_name;
      this.email = response.data[0].email;
      this.businessName = response.data[0].businessName;

      console.log("The new date", this.newDate);
    }
  },
  methods: {}
};
</script>

<style scoped></style>
