<template>
  <!-- <v-footer class="pa-3" dark> -->
  <v-footer fixed style="background-color:#F4EBDE;">
    <v-spacer></v-spacer>
    <v-flex bottom md3 xs12>
      <div>
        Created and maintained by:
        <strong>
          <a href="https://www.eccentrictoad.com" target="_blank"
            >Eccentric Toad
          </a>
        </strong>
      </div>
    </v-flex>
    <v-spacer></v-spacer>
    <div>&copy; {{ new Date().getFullYear() }}</div>
    <v-spacer></v-spacer>

  </v-footer>
</template>
<script>
export default {
  data() {
    return {
      header: "BOREDOM BUSTERS",
      username: null
    };
  }
};
</script>
<style scoped>

a {
  text-decoration: none;
  color: black;
}
a:hover {
  color: black;
  font-size: 15px;
}
</style>
