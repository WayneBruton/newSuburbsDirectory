<template>
  <v-container column justify-content-space-evenly style=" width: 100%">
    <br><br>
    <v-layout column>
      <v-flex xs12 sm8 md4>
        <img src="../assets/newLogo.png" alt="LOGO" style="width: 7.5%;" />
      </v-flex>
      <transition name="welcome">
        <v-flex>
          <h1>Meet our Team</h1>
        </v-flex>
      </transition>
    </v-layout>
    <br />
    <div style="display: flex; flex-wrap: wrap; justify-content: space-evenly;">
      <!-- <v-layout row wrap justify-space-between> -->
      <v-flex ml-1 mt-4 mr-2 xs12 sm8 md4 offset-sm0 offset-xs0 offset-md0>
        <img class="imgCat" src="../assets/Lisa.jpeg" alt />
        <br />
        <br />
        <h3>Lisa Berg: Owner</h3>
        <p>
          The blonde haired, blue eyed business women who’s made all this happen! She’s given blood, sweat and tears to
          make The Suburbs Directory into what it is today. Lisa has had first-hand experience working within the NPO sector,
          mainly with abused women and children. It was her longing to see the charities who support those most vulnerable
          in our communities receive regular financial support. It was that desire that lead us to start The Suburbs Directory.
        </p>
      </v-flex>
      <v-flex ml-1 mt-4 mr-2 xs12 sm8 md4 offset-sm0 offset-xs0 offset-md0>
        <img class="imgCat" src="../assets/Nicole.jpeg" alt />
        <br />
        <br />
        <h3>Nicole Berg: Owner / Creative Director</h3>
        <p>
          The pepper to the Salt & Pepper sister duo, Nicole is our go-to
          for all things creative! When she's not behind her computer
          working on The Suburbs Directory or shooting product photography
          you're likely to spot her in the outdoors with her trusty sidekick,
          Marley. She is meticulous and a complete nitpicker, which is why your
          businesses adverts are always a cut above the rest. Without Nicole The Suburbs
          Directory would look and feel like a dry dessert. Weakness: being
          unable to walk past a dog with out stopping to pet it.
        </p>
      </v-flex>
      <v-flex ml-1 mt-4 mr-2 xs12 sm8 md4 offset-sm0 offset-xs0 offset-md0>
        <img class="imgCat" src="../assets/Leeane.jpeg" alt />
        <br />
        <br />
        <h3>Lee-Ann Laufs: Admin & All Round Badass</h3>
        <p>
          There is just not enough room to do a write up about this phenomenal
          woman! Known on Facebook for her sassy nature, blog, and dare we say
          her potty mouth. She is one amazing social media guru you don’t want
          to mess with. All jokes aside this Mom of two regularly leaves us in
          awe with her ability to run both her businesses, Like and Share
          Marketing and Jumping Connor Hire all while managing the Constantia
          and Surrounds Facebook Group as well as being the assistant admin on
          our Southern Suburbs Community Group! There is no room to doubt this
          women's abilities! Lee-Ann jumped on board for the sole reason of
          supporting our charities. She may have a big mouth but she 100% has an
          even bigger heart!
        </p>
      </v-flex>
      <v-flex ml-1 mt-4 mr-2 xs12 sm8 md4 offset-sm0 offset-xs0 offset-md0>
        <img class="imgCat" src="../assets/Gav.jpeg" alt />
        <br />
        <br />
        <h3>Gavin Finlayson: Admin & Life Saver</h3>
        <p>
          Picture this, you’re driving down the M3, the wind blowing in your
          hair.... you’re doing 120kph, and that’s when you spot him. You hit
          the brakes, drop your phone, turn the music down and allow some choice
          words to escape your mouth. It’s just too late, you weren’t quick
          enough and then you see it, the dreadful flash of the speeding camera.
          Congratulations! You may have just met Gavin. That’s right, besides
          running our South Peninsula group and being the hardest working, most
          humble man we know he’s also the Santa Claus of the South (He knows
          when you’ve been bad or good). If you would like to meet him in a less
          unpleasant way, you can always catch him down at Fish Hoek beach or
          running along the road.
        </p>
      </v-flex>
      <v-flex ml-1 mt-4 mr-2 xs12 sm8 md4 offset-sm0 offset-xs0 offset-md0>
        <img class="imgCat" src="../assets/Me.jpeg" alt />
        <br />
        <br />
        <h3>Wayne Bruton: Website Developer & Tech Genius</h3>
        <p>
          The tech genius who has so diligently put up with all of our
          indecisiveness! We could not imagine having had anyone else design our
          website for us other than Wayne. If you are needing a site of your
          own, you need to get in touch with this guy. The fact that he hasn’t
          lobbed a MacBook at our heads during this process is a testament to
          his calm nature and willingness to take on any challenge!
        </p>
      </v-flex>

      <!-- </v-layout> -->
    </div>
    <!-- </v-card> -->
  </v-container>
</template>

<script>
// import DirectoryService from "@/services/DirectoryServices.js";
export default {
  data() {
    return {};
  },
  mounted() {},

  methods: {}
};
</script>

<style scoped>
.imgCat {
  width: 100%;
  border: 1px solid black;
  border-radius: 50%;
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
