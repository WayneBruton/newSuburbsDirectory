<template>
  <v-container>
    <br />
    <br />
    <!-- <img src="../assets/heart_PNG51352.png" alt="LOGO" style="width: 10%;" /> -->
    <img src="../assets/newLogo.png" alt="LOGO" style="width: 7.5%;" />

    <v-flex xs12>
      <h1>Community Notices</h1>
      <v-container xs12 sm12 md12 offset-xs0 offset-md0 offset-sm0>
        <br />
        <v-flex xs12 sm12 md12 offset-xs0 offset-md0 offset-sm0>
          <br />
          <div v-if="notices">
            <br />
            <v-flex xs12 sm12 md12 offset-xs0 offset-md0 offset-sm2>
              <div
                v-for="notice in notices"
                :key="notice.id"
                style="border: 1px solid black; padding: 1rem; margin: 1px 2px; border-radius: 7px;"
              >
                <!-- <div style="border: 1px solid black; padding: 1rem; margin: 5px 0; border-radius: 7px;  display:flex;"> -->
                <div style="width: 100%; text-align: center; font-size: 35px;">{{notice.heading}}</div>
                <br />
                <br />
                <!-- <v-flex xs12 sm6 md4 offset-xs0 offset-md0 offset-sm0> -->
                <div class="a" v-html="notice.notice_text"></div>
                <!-- </v-flex> -->
                <!-- <br> -->
                <!-- <vue-disqus shortname="waynesite" :identifier="notice.id"></vue-disqus> -->
                <!-- <br> -->
                <!-- </div> -->
                <!-- <vue-disqus shortname="waynesite" :identifier="notice.id"></vue-disqus> -->
              </div>
            </v-flex>
          </div>
        </v-flex>
      </v-container>
    </v-flex>
  </v-container>
</template>

<script>
import DirectoryService from "@/services/DirectoryServices";
export default {
  data() {
    return {
      notices: []
    };
  },
  created() {
    this.loadNotices(); 
  },
  methods: {
    async loadNotices() {
      let response = await DirectoryService.getNotices();
      this.notices = response.data;
      console.log(this.notices);
      // this.notices.forEach(el => {
      //   // el.notice_text = el.notice_text.replace(
      //   //   /<img/g,
      //   //   '<img style="border: 2px solid grey; width: 200%; border-radius: 7px; " '
      //   // );
      //   // el.notice_text = el.notice_text.replace(
      //   //   /<li/g,
      //   //   '<li style="border: 1px solid grey; margin: 4px 0; background-color: lightgrey;" '
      //   // );
      // });
    }
  }
};
</script>

<style scoped>
div >>> p {
  font-size: 12px;
  font-weight: 300;
  color: #000;
}
div >>> li {
  text-align: left;
  text-decoration: none;
  /* font-weight: bold; */
}
div >>> li:nth-child(odd) {
  background-color: lightgrey;
}
div >>> li:nth-child(even) {
  background-color: beige;
}
div >>> p {
  /* font-weight: bold; */
  font-size: 20px;
}
div >>> img {
  width: 70%;
}
@media screen and (max-width: 768px) {
  div >>> img {
    width: 100%;
  }
  div {
    width: 102%;
  }
}
</style>