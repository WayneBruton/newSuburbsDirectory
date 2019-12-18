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
      <div v-if="item.count > 0" @click="chooseCategory($event)">
        <v-img
          class="imgCat"
          
          :id="item.id"
          :src="item.image_url"
          alt
          
        ></v-img>
        <h3>{{ item.category_description }}({{ item.count }})</h3>

        </div>
        <div v-else>
        <v-img
          class="imgCat emptyOfProfiles"
          
          :id="item.id"
          :src="item.image_url"
          alt
          @click="chooseCategory($event)"
        ></v-img>
        <h3>{{ item.category_description }}({{ item.count }})</h3>

        </div>
        <!-- <h3>{{ item.category_description }}({{ item.count }})</!-->
      </v-flex>
    </v-layout>
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
    console.log(this.categories)
  },

  methods: {
    chooseCategory: function(event) {
      let targetId = parseInt(event.currentTarget.id);
      let chosen = this.$store.state.categories.find(el => {
        return el.id === targetId;
      });
      this.alertPostion = window.innerHeight * 5
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
        this.$store.dispatch("getProfiles", profilesChosen);
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
}

.noProfiles {
  z-index: 1;
  position: fixed;
  top: 50%;
  margin: 0 auto;
  width: 75%;


}
@media screen and (max-width: 768px) {
  .showroom {
    width: 100;
  }
}
</style>
