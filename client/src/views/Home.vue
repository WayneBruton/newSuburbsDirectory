<template>
  <div class="home">
   <v-container>
    <v-layout column justify-space-around>
      <br>
    <v-flex xs12 sm6 md6 offset-xs0 offset-md0 offset-sm0>
       <h1>Welcome</h1>
      </v-flex>
      <br />
      <v-flex xs12 sm12 md12 offset-xs0 offset-md0 offset-sm0>
        <img
          src="../assets/20190519_194800_0000.png"
          alt="LOGO"
        />
      </v-flex>
    </v-layout>
   </v-container>

    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->

  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {

    }
  },
  components: {
   
  }
};
</script>

<style scoped>
h1 {
  font-size: 350%;
}
img {
  border: 10px solid #F4EBDE;
  width: 100%;
  /* background-color: #F4EBDE; */
}
@media screen and (max-width: 768px) {
  img {
    /* width: 100%; */
    margin: 0%;
    height: 100%;
    /* width: 100%; */
    /* height: 100%; */
  }
}
</style>

