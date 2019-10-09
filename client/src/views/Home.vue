<template>
  <!-- <v-app style="background-color: red;" fluid ma-0 pa-0 fill-height> -->

  <v-container>
    <v-layout xs12 column justify-space-around>
      <br />
      <v-flex offset-xs0 offset-md0 offset-sm0>
        <h1>Welcome</h1>
      </v-flex>
      <br />
      <v-container fluid row wrap justify-center pa-0 xs12>
        <v-layout row wrap justify-space-around>
          <v-flex xs12 sm12 md12 offset-xs0 offset-md0 offset-sm0>
            <!-- <v-img class="coverImg" :src="myImage" alt="LOGO"></v-img> -->
            <img class="coverImg" src="../assets/20190519_194800_0000.png" alt="LOGO" />
          </v-flex>
        </v-layout>
      </v-container>
      <br />
      <br />
      <hr />
      <br />
      <br />
      <!-- <v-flex xs12 sm6 md6 offset-xs0 offset-md0 offset-sm0>
          <h1>About Us</h1>
      </v-flex>-->
      <v-flex xs12 sm6 md6 offset-xs0 offset-md0 offset-sm0>
        <div class="about-content">
          <p>The Suburbs Directory was born in early 2019 with the idea being conceived in early 2018.</p>
          <p>
            The Suburbs Directory was formed to be the business platform for 7 successful community Facebook Groups.
            <br />
            <br />

            <strong>The seven groups are:</strong>
            <br />
            <br />South Peninsula Sell & Swop
            <br />Southern Suburbs Sell & Swop
            <br />City Bowl Sell & Swop
            <br />Northern Suburbs Sell & Swop
            <br />Atlantic Seaboard Sell & Swop
            <br />West Coast Sell & Swop
            <br />Helderberg Sell & Swop.
            <br />
          </p>
          <p>It all started with South Peninsula Sell & Swop in 2015, a community based Facebook group, where its members were able to buy, sell & swop second hand goods, share information and connect with the greater community. Over the last three years the group has grown from strength to strength and currently hosts more than 14 000 members.</p>
          <p>In early 2019 we decided to allow businesses access to the groups by offering them an advertising opportunity via our online directory. This allows businesses to access the enormous amount of foot traffic on each of the Facebook groups.</p>
          <p>The decision to run The Business Directory alongside our Facebook groups was not based on the idea of building a business empire, but rather on the idea of how we can impact on job creation and the communities around us.</p>
          <p>We have put a few structures in place to make sure we stick to our promise of job creation, impacting positively and effectively on each of our seven communities and giving back to the businesses that list with us and help us to achieve our first two promises.</p>
          <p>Each of the seven suburbs will have one NPO / NGO assigned to it per year. This NPO / NGO would form part of the specific community that it has been assigned to. That NPO / NGO will then receive a monthly donation from us for the next 12 months, all based on how many businesses are registered with that specific suburb, so the more business listings that Suburb has, the more money that community project will receive from The Suburbs Directory.</p>
          <p>
            We firmly believe that supporting each other in business is an essential part of growing a healthy, supportive and fundamentally sound business community.
            We are excited to see a strong reputable business community form within each of the seven areas of the Western Cape, whilst contributing effectively to job creation, the communities around us and to each of the businesses who support us.
          </p>
          <p>
            <strong>THE SUBURBS DIRECTORY TEAM</strong>
          </p>
        </div>
      </v-flex>
      <br />
      <br />
      <v-layout row wrap justify-space-around>
        <v-flex xs12 sm6 md4 offset-xs0 offset-md0 offset-sm0>
          <!-- <div style="display: flex; justify-content: space-between;"> -->
          <!-- <img
            class="aboutBottom"
            src="../assets/20190519_194800_0000.png"
            alt="LOGO"
          />-->
          <img
            class="aboutBottom"
            src="../assets/Screen Shot 2019-05-27 at 3.30.49 PM.png"
            alt="LOGO"
          />
          <!-- <img class="aboutBottom" src="../assets/Screen Shot 2019-05-27 at 3.31.32 PM.png" alt="LOGO"> -->
          <!-- </div> -->
        </v-flex>
        <v-flex xs12 sm6 md4 offset-xs0 offset-md0 offset-sm0>
          <!-- <div style="display: flex; justify-content: space-between;"> -->
          <!-- <img class="aboutBottom" src="../assets/Screen Shot 2019-05-27 at 3.30.49 PM.png" alt="LOGO"> -->
          <img
            class="aboutBottom"
            src="../assets/Screen Shot 2019-05-27 at 3.31.32 PM.png"
            alt="LOGO"
          />
          <!-- </div> -->
        </v-flex>
      </v-layout>
    </v-layout>
    <!-- </v-layout> -->
  </v-container>

  <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
  <!-- </v-app> -->
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      myImage: require("../assets/20190519_194800_0000.png")
    };
  },
  components: {}
};
</script>

<style scoped>
h1 {
  font-size: 350%;
}
img {
  border: 10px solid #f4ebde;
  width: 100%;
  /* background-color: #F4EBDE; */
}
.coverImg {
  border: 5px solid #f4ebde;
  width: 100%;
  /* height: 500%; */
}
.about1 {
  width: 100%;
}
.aboutBottom {
  width: 110%;
}
p {
  font-size: 120%;
}
@media screen and (max-width: 768px) {
  img {
    /* width: 100%; */
    margin: 0%;
    height: 80%;
    /* width: 120%; */

    /* height: 100%; */
  }
  .coverImg {
    border: 1px solid #f4ebde;
    margin-left: 0px;
    padding-left: 0px;
  }
}
</style>

