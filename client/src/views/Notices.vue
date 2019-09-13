<template>
  <v-container>
    <!-- <img src="../assets/heart_PNG51352.png" alt="LOGO" style="width: 10%;" /> -->
    <img src="../assets/newLogo.png" alt="LOGO" style="width: 7.5%;" />

    <v-flex xs12>
      <h1>Community Notices</h1>
      <v-container xs12>
        <br />
        <v-flex xs12 md12>
          <br />
          <div v-if="notices">
            <br />
            <div v-for="notice in notices" :key="notice.id">
              <div style="border: 1px solid black; padding: 5rem; margin: 5px 0; border-radius: 7px;">
                <div style="width: 100%; text-align: center; font-size: 35px;">{{notice.heading}}</div>
                <br />
                <br />
                <div class=""
                  style="width: 100%; text-align: center;font-size: 20px;"
                  v-html="notice.notice_text"
                ></div> 
                <!-- <br> -->
                <!-- <vue-disqus shortname="waynesite" :identifier="notice.id"></vue-disqus> -->
                <!-- <br> -->
              </div>
                <!-- <vue-disqus shortname="waynesite" :identifier="notice.id"></vue-disqus> -->
            
            </div>
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
      this.notices.forEach(el => {
        el.notice_text = el.notice_text.replace(
          /<img/g,
          '<img style="border: 2px solid grey; width: 100%; border-radius: 7px; " '
        );
        el.notice_text = el.notice_text.replace(
          /<li/g,
          '<li style="border: 1px solid grey; margin: 4px 0; background-color: lightgrey;" '
        );
      });
    }
  }
};
</script>

<style scoped>
li:nth-child(even) {
  background-color: grey;
}
</style>