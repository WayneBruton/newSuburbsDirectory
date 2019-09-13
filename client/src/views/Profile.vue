<template>
  <div class="about">
    <v-container>
      <v-layout column justify-space-around>
        <v-flex xs12 sm8 md4>
          <img src="../assets/newLogo.png" alt="LOGO" style="width: 7.5%;" />
        </v-flex>
        <br />
        <v-flex xs12 sm6 md6 offset-xs0 offset-md0 offset-sm0>
          <h1>{{ businessName }}</h1>
        </v-flex>
        <br />
        <br />
        <carousel-3d
          :controls-visible="true"
          :clickable="true"
          :autoplay="true"
          :autoplay-timeout="2000"
          :display="3"
        >
          <slide class="img" :index="0">
            <img class="about1" :src="profile_image" alt="LOGO" />
          </slide>
          <slide class="img" :index="1">
            <img class="about1" :src="business_image1" alt="LOGO" />
          </slide>
          <slide class="img" :index="2">
            <img class="about1" :src="business_image2" alt="LOGO" />
          </slide>
          <slide class="img" :index="3">
            <img class="about1" :src="business_image3" alt="LOGO" />
          </slide>
        </carousel-3d>
        <br />
        <br />
        <hr />
        <br />
        <!-- <v-rating readonly half-increments light v-model="ratingsToDate">
        </v-rating> -->
        <div style="display: flex; justify-content: space-around">
          <div style="display: flex; flex-direction: column;">
            <div>
              <label for style="font-weight: bold;">Proprietor:</label>
              <label for>{{ first_name }}</label>
              <label for>{{ last_name }}</label>
            </div>
            <div>
              <label for style="font-weight: bold;">Contact Number:</label>
              <label for>{{ mob_no }}</label>
            </div>
            <div>
              <a :href="website" target="_blank">Website</a>
              <br />
              <a :href="email">email</a>
            </div>
          </div>
        </div>
        <br />
        <br />
        <div style="display: flex; justify-content: center;">
          <a :href="facebook" target="_blank" style="margin-right: 30px;">
            <i class="fab fa-facebook-square fa-2x" style="color: #366ed8"></i>
          </a>
          <a :href="instagram" target="_blank" style="margin-left: 30px;">
            <i class="fab fa-instagram fa-2x" style="color: #e4508f"></i>
          </a>
        </div>
        <br />
        <br />
        <hr />
        <v-flex
          xs12
          sm12
          md12
          offset-xs0
          offset-md0
          offset-sm0
          justify-space-evenly
        >
          <!-- <v-textarea v-model="profile_description" readonly rows="20"> -->
         
          <!-- </v-textarea> -->

           <div v-html="profile_description" readonly rows="20"></div>
        </v-flex>
        <br />
        <h3>Share</h3>
        <br />
        <br />
        <social-sharing
          url="https://www.suburbsdirectory.co.za"
          inline-template
        >
          <div id="network" style="display: flex; justify-content: space-evenly; flex-wrap: wrap;">
            <network network="facebook" style="margin: 10px;">
              <i class="fab fa-facebook-square fa-2x" style="color: #366ed8;"></i>
            </network>
            <!-- <network network="googleplus" style="margin: 10px;">
              <i class="fab fa-google-plus-g fa-2x" style="color: red;"></i>
            </network> -->
            <network network="linkedin" style="margin: 10px;">
              <i class="fab fa-linkedin fa-2x" style="color: #556fb5;"></i>
            </network>
            <network network="pinterest" style="margin: 10px;">
              <i class="fab fa-pinterest-square fa-2x" style="color: red;"></i>
            </network>
            <network network="reddit" style="margin: 10px;">
              <i class="fab fa-reddit-square fa-2x" style="color: red;"></i>
            </network>
            <network network="twitter" style="margin: 10px;">
              <i class="fab fa-twitter-square fa-2x" style="color: #207dff;"></i>
            </network>
            <network network="whatsapp" style="margin: 10px;">
              <i class="fab fa-whatsapp-square fa-2x" style="color: #a1c45a;"></i>
            </network>
          </div>
        </social-sharing>
        <br />
        <br />
        <br />
        <br />
        <hr />
        <br />
        <v-alert
          class="danger-alert"
          :value="true"
          type="error"
          v-if="error"
          style="width: 100%;"
        >
          {{ error }}
        </v-alert>
        <v-layout column justify-space-around>
          <v-flex>
            <h4>Rate "{{ businessName }}"</h4>
            <h5>
              Admin reserves the right to delete comments that have profanities
              or are malicious.
            </h5>
            <br />
            <br />
            <vue-disqus shortname="waynesite" :identifier="profileId"></vue-disqus> 
            <!-- <h6>
              If an email address does not exist, the comment will be deleted.
            </h6>
            <h6>
              If comments appear unreasonable, admin reserves the right to
              contact the poster, should no response be received, Admin can and
              will delete the comment..
            </h6> -->
            <br />
          </v-flex>
          <br />
          <!-- <div style="display: flex;">
            <v-textarea
              label="Comments"
              v-model="comments"
              style="width: 30%"
              maxlength="250"
              placeholder="Max Length 250 characters"
            >
              {{ comments }}
            </v-textarea>
            <v-rating
              half-increments
              light
              v-model="ratingNew"
              style="width: 40%"
            >
            </v-rating>
            <v-btn light color="#F4EBDE" @click="updateRatings">Rate</v-btn>
          </div> -->
        </v-layout>
        <br />
        <br />
        <!-- <div v-if="ratings.length">
          <h4>Ratings</h4>
          <br />
          <hr />
          <br />
          <br />
        </div>
        <div>
          <ul>
            <li v-for="(rating, i) in ratings" :key="i">
              <p class="ratingsNarrative">{{ rating.narrative }}</p>
              <v-rating
                class="ratings"
                readonly
                half-increments
                light
                v-model="rating.rating"
              >
              </v-rating>
              <label class="ratings" for>
                {{ rating.created_at.substring(0, 10) }}
              </label>
            </li>
          </ul>
        </div> -->
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import SocialSharing from "vue-social-sharing";
import DirectoryService from "@/services/DirectoryServices";
import { Carousel3d, Slide } from "vue-carousel-3d";
export default {
  data() {
    return {
      profileId: null,
      items: null,
      businessName: "",
      business_image1: "",
      business_image2: "",
      business_image3: "",
      email: "",
      facebook: "",
      first_name: "",
      instagram: "",
      last_name: "",
      mob_no: "",
      profile_description: "",
      profile_image: "",
      website: "",

      ratingNew: null,
      ratingsToDate: null,
      comments: "",

      ratings: [],

      error: ""
    };
  },
  components: {
    Carousel3d,
    Slide,
    SocialSharing
  },
  // async beforemount() {
  async beforeMount() {
    this.profileId = this.$store.state.selectedProfile;
    let response = await DirectoryService.getProfile(this.profileId);
    this.items = response.data;
    this.items.forEach(el => {
      this.profile_image = `${process.env.VUE_APP_IMAGEURL}${el.profile_image}`;
      this.business_image1 = `${process.env.VUE_APP_IMAGEURL}${
        el.business_image1
      }`;
      this.business_image2 = `${process.env.VUE_APP_IMAGEURL}${
        el.business_image2
      }`;
      this.business_image3 = `${process.env.VUE_APP_IMAGEURL}${
        el.business_image3
      }`;
      this.businessName = el.businessName;
      this.email = "mailTo:" + el.email;
      this.facebook = 'http://' + el.facebook;
      this.first_name = el.first_name;
      this.instagram = 'http://' + el.instagram;
      this.last_name = el.last_name;
      this.mob_no = el.mob_no;
      this.profile_description = el.profile_description;
      this.website = 'http://' + el.website;
    });
    console.log("This is the website",this.website)
    console.log("This is the Facebook",this.facebook)
    this.getRatings();
  },
  methods: {
    checkRating() {
      console.log(this.ratingNew);
    },
    async updateRatings() {
      if (this.comments === "" || this.ratingNew === null) {
        this.error = "You must Comment and Rate. Both are required";
        setTimeout(() => {
          this.error = "";
        }, 1500);
      } else {
        // console.log("Clicked");
        let rating = {
          id: parseInt(this.profileId),
          rating: this.ratingNew,
          comments: this.comments
        };
        let response = await DirectoryService.updateRatings(rating);
        console.log(response);
        this.getRatings();
        this.comments = "";
        this.ratingNew = null;
      }
    },
    async getRatings() {
      let rating = {
        id: parseInt(this.profileId)
      };
      let response = await DirectoryService.getRatings(rating);
      // console.log("Ratings to date", response.data)
      this.ratings = response.data;
      console.log(this.ratings);
      let len = this.ratings.length;
      let latestRating = this.ratings.reduce((prev, current) => {
        return (prev = prev + current.rating);
      }, 0);
      latestRating = latestRating / len;
      console.log("Latest Rating", latestRating);
      this.ratingsToDate = latestRating;
    }
  }
};
</script>

<style scoped>

.img {
  background-color: white;
  /* border: transparent; */
}
.about1 {
  width: 100%;
}
.aboutBottom {
  width: 110%;
}
p {
  font-size: 120%;
}
li:nth-of-type(even) {
  /* li:nth-child(1) { */
  background-color: #f4ebde;
}

li {
  list-style: none;
  display: flex;
}
.ratingsNarrative {
  width: 40%;
}
.ratings {
  width: 30%;
}

@media screen and (max-width: 768px) {
  li {
    flex-direction: column;
  }
  .ratingsNarrative,
  .ratings {
    width: 100%;
  }
  .ratingsNarrative,
  .ratings {
    width: 100%;
  }
}
</style>
