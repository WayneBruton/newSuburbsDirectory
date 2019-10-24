<template>
  <v-container>
    <br />
    <br />
    <img src="../assets/newLogo.png" alt="LOGO" style="width: 7.5%;" />

    <v-flex xs12>
      <h1>Charities</h1>
      <v-container>
        <br />
        <br />
        <div v-if="!charityChosen">
          <v-layout row wrap>
            <h1>Vote for your charity</h1>
          </v-layout>
          <br />
          <br />
          <div v-if="datacollection">
            <reactive :chart-data="datacollection"></reactive>
          </div>
          <br />
          <br />
          <div
            style="display: flex; flex-wrap: wrap; justify-content: space-evenly;"
            v-if="this.$store.state.loggedIn"
          >
            <div class="text-xs-center">
              <v-chip @click="childrensHospitalVote" color="rgb(255, 99, 132)">
                <v-avatar>
                  <img src="../assets/charityImgs/Childrens-hospital-trust-logo.jpg" alt="trevor" />
                </v-avatar>Childrens Hospital
              </v-chip>
            </div>
            <div class="text-xs-center">
              <v-chip @click="SPCAVote" color="rgb(0, 255, 0)">
                <v-avatar>
                  <img src="../assets/charityImgs/SPCA.png" alt="trevor" />
                </v-avatar>SPCA
              </v-chip>
            </div>
            <div class="text-xs-center">
              <v-chip @click="HTRCVote" color="rgb(255, 99, 132)">
                <v-avatar>
                  <img src="../assets/charityImgs/htrc-logo.png" alt="trevor" />
                </v-avatar>Help the rural child
              </v-chip>
            </div>
          </div>
          <br />
          <br />
          <div
            style="display: flex; flex-wrap: wrap; justify-content: space-evenly;"
            v-if="this.$store.state.loggedIn"
          >
            <div class="text-xs-center">
              <v-chip @click="TearsVote" color="rgb(128, 255, 0)">
                <v-avatar>
                  <img src="../assets/charityImgs/tears.png" alt="trevor" />
                </v-avatar>Tears
              </v-chip>
            </div>
            <div class="text-xs-center">
              <v-chip @click="OasisVote" color="rgb(0, 255, 255)">
                <v-avatar>
                  <img src="../assets/charityImgs/OasisLogo2.png" alt="trevor" />
                </v-avatar>Oasis
              </v-chip>
            </div>
            <div class="text-xs-center">
              <v-chip @click="stLukesVote" color="rgb(255, 255, 0)">
                <v-avatar>
                  <img src="../assets/charityImgs/stlukes.png" alt="trevor" />
                </v-avatar>St Lukes
              </v-chip>
            </div>
            <div class="text-xs-center">
              <v-chip @click="TVWCVote" color="rgb(255, 255, 128)">
                <v-avatar>
                  <img src="../assets/charityImgs/logo-redcross.png" alt="trevor" />
                </v-avatar>The Red Cross
              </v-chip>
            </div>
          </div>
          <div v-else >
            <div @click="login">
            <h3 >Log in to Vote</h3>
            </div>
          </div>
        </div>
      </v-container>
    </v-flex>
  </v-container>
</template>

<script>
// import BarChart from "@/components/BarChart";
import Reactive from "@/components/Reactive";
export default {
  components: {
    // BarChart,
    Reactive
  },
  data() {
    return {
      charityChosen: null,
      charityVotes: {
        "Childrens Hospital": 2,
        SPCA: 5,
        "Help the Rural Child": 7,
        Tears: 6,
        Oasis: 1,
        "St Lukes": 0,
        "The Red Cross": 2
      },
      datacollection: null,
      labels: [
        "Childrens Hospital",
        "SPCA",
        "Help the Rural Child",
        "Tears",
        "Oasis",
        "St Lukes",
        "The Red Cross"
      ]
    };
  },
  mounted() {
    this.updateDataCollection();
  },
  methods: {
    updateDataCollection() {
      this.datacollection = null;
      this.datacollection = {
        labels: this.labels,
        datasets: [
          {
            label: "Votes",
            // backgroundColor: "#f87979",
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(0, 255, 0)",
              "rgb(255, 99, 132)",
              "rgb(128, 255, 0)",
              "rgb(0, 255, 255)",
              "rgb(255, 255, 0)",
              "rgb(255, 255, 128)"
            ],
            // backgroundColor: "red",
            data: [
              this.charityVotes["Childrens Hospital"],
              this.charityVotes["SPCA"],
              this.charityVotes["Help the Rural Child"],
              this.charityVotes["Tears"],
              this.charityVotes["Oasis"],
              this.charityVotes["St Lukes"],
              this.charityVotes["The Red Cross"]
            ]
          }
        ]
      };
    },
    childrensHospitalVote() {
      this.charityVotes["Childrens Hospital"] =
        this.charityVotes["Childrens Hospital"] + 1;
      this.updateDataCollection();
    },
    SPCAVote() {
      this.charityVotes["SPCA"] = this.charityVotes["SPCA"] + 1;
      this.updateDataCollection();
    },
    HTRCVote() {
      this.charityVotes["Help the Rural Child"] =
        this.charityVotes["Help the Rural Child"] + 1;
      this.updateDataCollection();
    },
    TearsVote() {
      this.charityVotes["Tears"] = this.charityVotes["Tears"] + 1;
      this.updateDataCollection();
    },
    OasisVote() {
      this.charityVotes["Oasis"] = this.charityVotes["Oasis"] + 1;
      this.updateDataCollection();
    },
    stLukesVote() {
      this.charityVotes["St Lukes"] = this.charityVotes["St Lukes"] + 1;
      this.updateDataCollection();
    },
    TVWCVote() {
      this.charityVotes["The Red Cross"] =
        this.charityVotes["The Red Cross"] + 1;
      this.updateDataCollection();
    },
    login() {
      console.log("Testing!!!!")
      this.$router.push({name: 'login'})
    }
  }
};
</script>

<style scoped></style>
