<template>
  <v-container column justify-content-space-evenly style=" width: 100%">
    <br />
    <br />
    <v-layout column>
      <v-flex xs12 sm8 md4>
        <img src="../assets/newLogo.png" alt="LOGO" style="width: 7.5%;" />
      </v-flex>
      <transition name="welcome">
        <v-flex>
          <h1>Search for profile</h1>
          <!-- <div v-for="category in categories" :key="category.id"> -->
          <v-select
            v-model="category_chosen"
            :items="categories"
            item-text="description"
            item-value="id"
            box
            @input="searchChosen"
            label="Choose Search Category"
          ></v-select>
        </v-flex>
      </transition>
    </v-layout>
    <v-layout v-if="profiles_selected.length">
      <v-flex xs12 sm6 md8 offset-sm3 offset-md2>
        <v-card>
          <v-container grid-list-sm fluid>
            <v-layout row wrap>
              <v-flex v-for="image in profiles_selected" :key="image.id" xs12 md4 sm6 d-flex>
                <v-card
                  flat
                  tile
                  class="d-flex imageLoaded"
                  :id="image.id"
                  @click="chooseProfile($event)"
                  v-tooltip="image.businessName"
                >
                  <v-img
                
                    :src="image.profile_image"
                    :id="image.id"
                    aspect-ratio="1"
                    pa-5
                    class="grey lighten-2"
                  >
                    <template v-slot:placeholder>
                      <v-layout fill-height align-center justify-center ma-5>
                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                      </v-layout>
                    </template>
                  </v-img>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
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
      category_chosen: "",
      profiles_selected: []
    };
  },
  async mounted() {
    let response = await DirectoryService.getCategories();
    this.categories = [];
    response.data.forEach(el => {
      let item = {
        id: el.id,
        description: el.category_description
      };
      this.categories.push(item);
    });
  },

  methods: {
    async searchChosen() {
      let response = await DirectoryService.getSearchedCategory(
        this.category_chosen
      );
      response.data.forEach(el => {
        el.profile_image = `${process.env.VUE_APP_IMAGEURL}${el.profile_image}`;
      });
      this.profiles_selected = response.data;
    },
    chooseProfile(event) {
      let targetId = event.currentTarget.id;
      this.$store.dispatch("setSelectedProfile", targetId);
      this.$router.push({ name: "profile", params: { profileId: targetId } });
    }
  }
};
</script>

<style scoped>
.imageLoaded {
  padding: 7px 7px ;
}
</style>
