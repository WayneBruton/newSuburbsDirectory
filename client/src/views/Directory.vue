<template>
  <v-container column justify-content-space-evenly style=" width: 100%">
    <v-layout column>
      <v-flex xs12 sm8 md4>
        <img src="../assets/suburbs2.png" alt="LOGO" style="width: 10%;">
      </v-flex>
      <transition name="welcome">
        <v-flex>
          <h1>View our Categories</h1>
        </v-flex>
      </transition>
    </v-layout>
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
          v-for="(item, id) in items"
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
            > -->
          <img :src="item.category_image" alt >
          <h3>{{ item.category_name }}</h3>
        <!-- </v-card>
        </v-hover> -->
        </v-flex>
    </v-layout>
      <!-- </v-card> -->

  </v-container>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          category_image: require("../assets/testImgs/accomodation.png"),
          category_name: "Accomodation"
        },
        {
          category_image: require("../assets/testImgs/artscrafts.png"),
          category_name: "Arts & Crafts"
        },
        {
          category_image: require("../assets/testImgs/automotive.png"),
          category_name: "Automotive"
        },
        {
          category_image: require("../assets/testImgs/businessservices.png"),
          category_name: "Business Services"
        },
        {
          category_image: require("../assets/testImgs/decor.png"),
          category_name: "Decor"
        },
        {
          category_image: require("../assets/testImgs/events.png"),
          category_name: "Events"
        },
        {
          category_image: require("../assets/testImgs/financial.png"),
          category_name: "Financial"
        },
        {
          category_image: require("../assets/testImgs/fooddrink.png"),
          category_name: "Food & Drink"
        },
        {
          category_image: require("../assets/testImgs/garden.png"),
          category_name: "Garden Services"
        },
        {
          category_image: require("../assets/testImgs/househome.png"),
          category_name: "House & Home"
        },
        {
          category_image: require("../assets/testImgs/ittechnology.png"),
          category_name: "IT & Technology"
        },
        {
          category_image: require("../assets/testImgs/jewelryaccessories.png"),
          category_name: "Jewelry & Accessories"
        },
        {
          category_image: require("../assets/testImgs/kids.png"),
          category_name: "Kids"
        },
        {
          category_image: require("../assets/testImgs/medical.png"),
          category_name: "Medical"
        },
        {
          category_image: require("../assets/testImgs/pets.png"),
          category_name: "Pets"
        },
        {
          category_image: require("../assets/testImgs/photography.png"),
          category_name: "Photography"
        },
        {
          category_image: require("../assets/testImgs/pregnancybabies.png"),
          category_name: "Pregnancy & Babies"
        },
        {
          category_image: require("../assets/testImgs/property.png"),
          category_name: "Property"
        },
        {
          category_image: require("../assets/testImgs/transport.png"),
          category_name: "Transport"
        },
        {
          category_image: require("../assets/testImgs/traveltourism.png"),
          category_name: "Travel & Tourism"
        },
        {
          category_image: require("../assets/testImgs/wellnessbeauty.png"),
          category_name: "Wellness & Beauty"
        }
      ]
    };
  },
  mounted() {
    console.log(this.items[0].category_name);
  }
};
</script>

<style scoped>
img {
    width: 100%;
}
img:hover {
    width: 99%;  
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
