<template>
  <div id="app">
    <v-app>
      <PageHeader/>
      <v-container>
        <div id="nav">
          <router-view/>
        </div>
      </v-container>
      <Footer/>
    </v-app>
  </div>
</template>

<script>
import PageHeader from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "app",
  components: {
    PageHeader,
    Footer
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // min-height: 100vh;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

// body {
//   background-color: wheat;
// }
</style>
