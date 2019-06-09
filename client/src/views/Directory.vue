<template>
  <v-container column justify-content-space-evenly style=" width: 100%">
    <v-layout column>
      <v-flex xs12 sm8 md4>
        <img src="../assets/newLogo.png" alt="LOGO" style="width: 7.5%;">
      </v-flex>
      <transition name="welcome">
        <v-flex>
          <h1>{{ this.$store.state.areaChosen[0].area_description }}</h1>
        </v-flex>
      </transition>
    </v-layout>
    <v-alert :top="alertPostion" class="noProfiles" v-if="message" :value="true" type="info">{{ message }}</v-alert>
    <v-layout row wrap justify-space-between>
      <v-flex
        ml-1
        mt-4
        mr-2
        xs12
        sm8
        md3
        offset-sm0
        offset-xs0
        offset-md0
        v-for="(item, id) in this.$store.state.categories"
        :key="id"
      >
        <!-- <v-hover>
        <v-card
        slot-scope="{ hover }"
            :class="`elevation-${hover ? 12 : 2}`"
            class="mx-auto showroom"
            width="300"
            height="330"
            offset-xs0
            offset-sm0
            offset-md0
            ml-1
            mr-2
            xs12
            sm8
            md3
        >-->

        <v-img
          class="imgCat"
          v-if="item.count > 0"
          :id="item.id"
          :src="item.image_url"
          alt
          @click="chooseCategory($event)"
        ></v-img>
        <v-img
          class="imgCat emptyOfProfiles"
          v-else
          :id="item.id"
          :src="item.image_url"
          alt
          @click="chooseCategory($event)"
        ></v-img>
        <h3>{{ item.category_description }}({{ item.count }})</h3>

        <!-- </v-card>
        </v-hover>-->
      </v-flex>
    </v-layout>
    <!-- </v-card> -->
  </v-container>
</template>

<script>
import DirectoryService from "@/services/DirectoryServices.js";
export default {
  data() {
    return {
      categories: [],
      area: [],
      message: "",
      alertPostion: 0
    };
  },
  mounted() {
    this.categories = this.$store.state.categories;
  },

  methods: {
    chooseCategory: function(event) {
      let targetId = parseInt(event.currentTarget.id);
      let chosen = this.$store.state.categories.find(el => {
        return el.id === targetId;
      });
      // console.log(window.innerHeight)
      this.alertPostion = window.innerHeight * 5
      console.log("Category Chosen:", targetId)
      if (chosen.count === 0) {
        this.message = "No profiles yet. Be the first!";
        setTimeout(() => {
          this.message = "";
        }, 1500);
      } else {
        this.message = "";
        let area = this.$store.state.areaChosen[0].id
        let category = targetId
        let chosenCategory = this.categories.find((el) => {
          return el.id === targetId
        })
        let profilesChosen = {
          area: area,
          areaDescription: this.$store.state.areaChosen[0].area_description,
          category: category,
          category_description: chosenCategory.category_description
        }
        console.log("profilesChosen",profilesChosen)
        this.$store.dispatch("getProfiles", profilesChosen);
        // console.log(this.$store.state.profilesForCategoryAndAreaChosen)
        this.$router.push('profiles')

      }
    }
  }
};
</script>

<style scoped>
.imgCat {
  width: 100%;
}
.imgCat:hover {
  width: 99%;
  cursor: pointer;
}
.emptyOfProfiles:hover {
  opacity: 0.3;
  /* width: 30%; */
  /* height: 30%; */
}

.noProfiles {
  z-index: 1;
  position: fixed;
  top: 50%;
  margin: 0 auto;
  width: 75%;


}
@media screen and (max-width: 768px) {
  /* v-card {
    width: 250px;
    margin-left: 0%;
    margin-right: 10%;
     padding: 0%;
  } */
  .showroom {
    width: 100;
  }
}
</style>
