<template>
  <v-container column justify-content-space-evenly style=" width: 100%">
    <v-layout column>
      <v-flex xs12 sm8 md4>
        <img src="../assets/newLogo.png" alt="LOGO" style="width: 10%;">
      </v-flex>
      <transition name="welcome">
        <v-flex>
          <h1>{{ this.$store.state.profilesForCategoryAndAreaChosen.areaDescription }}</h1>
          <h2>{{ this.$store.state.profilesForCategoryAndAreaChosen.category_description }}</h2>
        </v-flex>
      </transition>
    </v-layout>
    <!-- <v-layout row justify-space-between>
      <v-flex elevation-3 xs12 sm8 md12>
        <panel title="Search" v-if="totalItems.length > 10">
          <div style="display: flex; justify-content: space-between; width:100%;">
            <v-text-field placeholder="Search" v-model="search" style="width:90%;"></v-text-field>
            <v-btn v-if="search" flat color="black" dark @click="clearSearch" style="width:10%;">
              <v-icon>clear</v-icon>
            </v-btn>
          </div>
        </panel>
      </v-flex>
    </v-layout> -->
    <v-layout row wrap justify-space-around>
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
        elevation-3
        v-for="(item, i) in items"
        :key="i"
      >
        <!-- <div style="width: 100%;"> -->

        <v-hover>
          <v-card
            slot-scope="{ hover }"
            :class="`elevation-${hover ? 12 : 2}`"
            class="mx-auto showroom"
            width="300"
            height="550"
            offset-xs0
            offset-sm0
            offset-md0
            ml-1
            mr-2
            xs12
            sm8
            md3
          >
            <!-- <vue-load-image> -->
            <!-- <img v-lazy="item.product_image" style="width: 100%; " :aspect-ratio="2.75"> -->
            <img :src="item.profile_image" style="width: 100%; "  alt="Profile Image">
            <!-- <img
                slot="image"
                :src="item.product_image"
                style="width: 100%; "
                :aspect-ratio="2.75"
            >-->
            <!-- <img slot="preloader" src="../assets/30.gif" style="width: 100%;"> -->
            <!-- <div slot="error">error message</div> -->
            <!-- </vue-load-image> -->
            <hr>
            <v-card-title primary-title>
              <div>
                  <div  style=" height: 80px;">
                <h3 class="headline mb-0">{{ item.businessName }}</h3>
                </div>
                <br>
                <div>
                <div style="height:80px;" v-html="item.profile_description"></div>
                </div>
                <br>
                <!-- <div style="font-size: 15px;">R{{ item.price }}</div> -->
              </div>
            </v-card-title>
            <!-- <v-rating
              half-increments
              light
              v-model="rating"
        
            >
            </v-rating> -->
            <v-card-actions>
              <v-btn
                :id="item.id"
                :value="item.id"
                flat
                color="#305f72"
                @click="viewItem($event)"
              >See More</v-btn>
            </v-card-actions>
          </v-card>
        </v-hover>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import DirectoryService from "@/services/DirectoryServices.js";
import Panel from "@/components/Panel.vue";
export default {
  data() {
    return {
      items: [],
      totalItems: [],
      selectedId: null,
      rating: 3.5
    };
  },
  components: {
    Panel
  },
  async mounted() {
      let area = this.$store.state.profilesForCategoryAndAreaChosen.area
      let category = this.$store.state.profilesForCategoryAndAreaChosen.category
      // console.log(area)
      // console.log(category)
    this.items = [];
    let credentials = {
      area: area,
      category: category
    };
    try {
      let response = (await DirectoryService.profiles(credentials));
      console.log(response.data)
      this.items = response.data
      console.log(this.items)
      //   this.isUserLoggedIn = this.$store.state.isUserLoggedIn;
        this.totalItems = this.items;
      // console.log(this.items)
    } catch (err) {
      console.log(err);
    }
  },
    methods: {
      viewItem: function(event) {
        let targetId = event.currentTarget.value;
    console.log("The target id is", targetId)
        this.$store.dispatch("setSelectedProfile", targetId);
        this.$router.push({ name: "profile", params: { profileId: targetId } });
      }
    }
};
</script>

<style lang="scss" scoped>
/* Welcome Styles */
.welcome-enter {
  transform: translateX(10px);
  opacity: 0;
}
.welcome-enter-active {
  transition: all 5.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.welcome-leave-active,
.welcome-leave-to {
  opacity: 0;
}

img {
    min-height: 40%;
    max-height: 175px;
    // height: 40%;
}
.profileInfo {
    // min-height: 50%;
    // max-height: 50%;
    // height: 50%;
}


@media screen and (max-width: 820px) {
  v-card {
    width: 250px;
    margin-left: 0%;
    // padding: 0%;
  }
  .showroom {
    width: 100;
  }
}
</style>
