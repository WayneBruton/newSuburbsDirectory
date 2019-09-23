<template>
  <v-container>
    <!-- <img src="../assets/heart_PNG51352.png" alt="LOGO" style="width: 10%;" /> -->
    <img src="../assets/newLogo.png" alt="LOGO" style="width: 7.5%;" />

    <v-flex xs12>
      <h1>Profile Listing</h1>
      <v-container>
        <br />
        <br />
        <v-layout row wrap>
          <v-flex xs12 sm10 md12 >
            <!-- <v-card> -->
            <v-tabs v-model="tab" background-color="red" centered icons-and-text>
              <v-tabs-slider></v-tabs-slider>

              <v-tab href="#tab-1">
                Paid & Approved ({{ profilesPaidAndApproved.length }})
                <v-icon style="color: red">favorite</v-icon>
              </v-tab>

              <v-tab href="#tab-2">
                Paid not Approved ({{ profilesPaidNotYetApproved.length }})
                <v-icon style="color: green">payment</v-icon>
              </v-tab>

              <v-tab href="#tab-3">
                Approved Not Paid ({{ profilesApprovedNotPaid.length }})
                <v-icon style="color: orange">visibility_off</v-icon>
              </v-tab>

              <v-tab href="#tab-4">
                Not Paid Nor Approved ({{ profilesNotYetPaidNorApproved.length }})
                <v-icon style="color: blue">thumbs_up_down</v-icon>
              </v-tab>
            </v-tabs> 

            <v-tabs-items v-model="tab">
              <v-tab-item v-for="i in 4" :key="i" :value="'tab-' + i">
                <v-card>
                  <div v-if="tab === 'tab-1'">
                    <v-list v-for="(item) in profilesPaidAndApproved" :key="item.id">
                      <v-list-tile @click="getProfile($event)" :id="item.id">
                        <v-list-tile-content>
                          <v-list-tile-title v-html="item.businessName"></v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                          <v-icon style="color: red" left>favorite</v-icon>
                        </v-list-tile-action>
                      </v-list-tile>
                    </v-list>
                  </div>
                  <div v-if="tab === 'tab-2'">
                    <v-list v-for="(item) in profilesPaidNotYetApproved" :key="item.id">
                      <v-list-tile @click="getProfile($event)" :id="item.id">
                        <v-list-tile-content>
                          <v-list-tile-title v-html="item.businessName"></v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                          <v-icon style="color: green">payment</v-icon>
                        </v-list-tile-action>
                      </v-list-tile>
                    </v-list>
                  </div>
                  <div v-if="tab === 'tab-3'">
                    <v-list v-for="(item) in profilesApprovedNotPaid" :key="item.id">
                      <v-list-tile @click="getProfile($event)" :id="item.id">
                        <v-list-tile-content>
                          <v-list-tile-title v-html="item.businessName"></v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                          <v-icon style="color: orange">visibility_off</v-icon>
                        </v-list-tile-action>
                      </v-list-tile>
                    </v-list>
                  </div>
                  <div v-if="tab === 'tab-4'">
                    <v-list v-for="(item) in profilesNotYetPaidNorApproved" :key="item.id">
                      <v-list-tile @click="getProfile($event)" :id="item.id">
                        <v-list-tile-content>
                          <v-list-tile-title v-html="item.businessName"></v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                          <v-icon style="color: blue">thumbs_up_down</v-icon>
                        </v-list-tile-action>
                      </v-list-tile>
                    </v-list>
                  </div>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </v-container>
</template>

<script>
import DirectoryService from "@/services/DirectoryServices";
export default {
  data() {
    return {
      profilesPaidAndApproved: [],
      profilesPaidNotYetApproved: [],
      profilesApprovedNotPaid: [],
      profilesNotYetPaidNorApproved: [],
      tab: null
    };
  },
  async created() {
    let response = await DirectoryService.getProfilesForDashboard();
    console.log(response.data)
    response.data.forEach(el => {
      if (el.paid_to_date === 1 && el.profile_approved === 1) {
        this.profilesPaidAndApproved.push(el);
      }
      if (el.paid_to_date === 1 && el.profile_approved !== 1) {
        this.profilesPaidNotYetApproved.push(el);
      }
      if (el.paid_to_date !== 1 && el.profile_approved === 1) {
        this.profilesApprovedNotPaid.push(el);
      }
      if (el.paid_to_date !== 1 && el.profile_approved !== 1) {
        this.profilesNotYetPaidNorApproved.push(el);
      }
    });
    console.log("Paid & Approved", this.profilesPaidAndApproved);
    console.log("Paid Not Approved", this.profilesPaidNotYetApproved);
    console.log("Not Paid But Approved", this.profilesApprovedNotPaid);
    console.log("Not Paid Nor Approved", this.profilesNotYetPaidNorApproved);
  },
  methods: {
    getProfile(event) {
      let targetID = event.currentTarget.id;
      console.log("clicked: id ", targetID);
      // DirectoryService.getProfileForAdmin(targetID)
      this.$store.dispatch("selectedProfileAdminUsage", targetID);
      console.log("Store Chosen:",this.$store.state.selectedProfileAdminUsage)
      this.$router.push({ name: 'profileAdmin'})
    }
    // async loadFAQ() {
    //   this.items = []
    //   let response = await DirectoryService.getFAQ();
    //   response.data.forEach((el) => {
    //     let faq = {
    //       title: el.title,
    //       description: el.faq_description
    //     }
    //     this.items.push(faq)
    //   })
    // }
  }
};
</script>

<style scoped></style>
