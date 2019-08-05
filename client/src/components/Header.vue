<template>
  <v-toolbar
    id="toolbarHeader"
    fixed
    light
    style="background-color: #F4EBDE; width: 100%;"
  >
    <img
      id="corporateLogo"
      src="../assets/newLogo.png"
      alt="LOGO"
      @click="navigateTo({ name: 'home' })"
    />
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn class="notHamburger" flat @click="navigateTo({ name: 'home' })">
        Home
      </v-btn>
    </v-toolbar-items>
    <v-toolbar-items>
      <v-btn class="#305f72 notHamburger" flat :to="{ name: 'launchpad' }">
        Business
      </v-btn>
    </v-toolbar-items>
    <!-- <v-toolbar-items class="dropDown">
      <v-menu offset-y class="dropDown">
        <template v-slot:activator="{ on }" class="dropDown">
          <v-btn class="#305f72 notHamburger" flat v-on="on">
            Business
            <v-icon right class="ml-2">arrow_drop_down</v-icon>
          </v-btn>
        </template>
        <v-list class="dropDown">
          <v-list-tile
            v-for="(item, index) in areas"
            :key="index"
            class="dropDown"
            :id="item.id"
            @click="chooseArea($event)"
          >
            <v-list-tile-title>{{ item.area_description }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar-items>-->
    <v-toolbar-items>
      <v-btn class="#305f72 notHamburger" flat :to="{ name: 'notices' }">Community</v-btn>
    </v-toolbar-items>
    <v-toolbar-items>
      <v-btn class="#305f72 notHamburger" flat :to="{ name: 'charities' }">Charity</v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn class="#305f72 notHamburger" flat :to="{ name: 'pricing' }">
        Pricing
      </v-btn>
    </v-toolbar-items>
    <!-- /////////////////// -->

    <v-toolbar-items class="dropDown">
      <v-menu offset-y class="dropDown">
        <template v-slot:activator="{ on }" class="dropDown">
          <!-- <v-btn class="#305f72 notHamburger" flat :to="{name: 'directory'}">  -->
          <v-btn class="#305f72 notHamburger" flat v-on="on">
            See More
            <v-icon right class="ml-2">arrow_drop_down</v-icon>
          </v-btn>
        </template>
        <v-list class="dropDown" v-if="!this.$store.state.loggedIn">
          <v-list-tile :to="{ name: 'login' }">
            <v-list-tile-title>Login</v-list-tile-title>
          </v-list-tile>
          <v-divider></v-divider>
        </v-list>
        <v-list class="dropDown" v-if="!this.$store.state.loggedIn">
          <v-list-tile :to="{ name: 'register' }">
            <v-list-tile-title>Signup</v-list-tile-title>
            <v-divider></v-divider>
          </v-list-tile>
          <v-divider></v-divider>
        </v-list>
        <v-list class="dropDown" v-if="this.$store.state.loggedIn">
          <v-list-tile @click="logout">
            <v-list-tile-title>Logout</v-list-tile-title>
            <v-divider></v-divider>
          </v-list-tile>
          <v-divider></v-divider>
        </v-list>
        <v-list class="dropDown" v-if="this.$store.state.loggedIn">
          <v-list-tile :to="{ name: 'editProfile' }">
            <v-list-tile-title>Edit Profile</v-list-tile-title>
            <v-divider></v-divider>
          </v-list-tile>
          <v-divider></v-divider>
        </v-list>
        <v-list class="dropDown">
          <v-list-tile :to="{ name: 'contact' }">
            <v-list-tile-title>Contact</v-list-tile-title>
            <v-divider></v-divider>
          </v-list-tile>
          <v-divider></v-divider>
        </v-list>
        <v-list class="dropDown">
          <v-list-tile :to="{ name: 'about' }">
            <v-list-tile-title>Meet the Team</v-list-tile-title>
            <v-divider></v-divider>
          </v-list-tile>
          <v-divider></v-divider>
        </v-list>
        <v-list class="dropDown">
          <v-list-tile :to="{ name: 'faq' }">
            <v-list-tile-title>
              FAQ
              <v-icon left color="red " class="ml-2">help</v-icon>
              <!-- darken-2 -->
            </v-list-tile-title>
          </v-list-tile>
          <v-divider></v-divider>
        </v-list>
      </v-menu>
    </v-toolbar-items>
    <!-- /////////////// -->
    <!-- <v-toolbar-items v-if="!this.$store.state.loggedIn">
      <v-btn class="#305f72 notHamburger" flat>Login</v-btn>
    </v-toolbar-items>-->
    <!-- <v-toolbar-items v-if="!this.$store.state.loggedIn">
      <v-btn class="#305f72 notHamburger" flat :to="{ name: 'register'}">Signup</v-btn>
    </v-toolbar-items>-->
    <!-- <v-toolbar-items v-if="this.$store.state.loggedIn" @click="logout">
      <v-btn class="#305f72 notHamburger" flat>Logout</v-btn>
    </v-toolbar-items>-->
    <!-- <v-toolbar-items>
      <v-btn class="#305f72 notHamburger" flat :to="{ name: 'contact'}">Contact</v-btn>
    </v-toolbar-items>-->
    <!-- <v-toolbar-items>
      <v-btn class="#305f72 notHamburger" flat :to="{ name: 'about'}">Meet Us</v-btn>
    </v-toolbar-items>-->
    <!-- <v-toolbar-items>
      <v-btn class="#305f72 notHamburger" flat :to="{ name: 'faq'}">
        FAQ
        <v-icon left color="red darken-2" class="ml-2">help</v-icon>
      </v-btn>
    </v-toolbar-items>-->
    <v-spacer></v-spacer>

    <v-menu
      class="hamburgerMenu"
      full-width
      right
      light
      offsetY
      min-width="100%"
    >
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-toolbar-side-icon class="hamburger" light></v-toolbar-side-icon>
        </v-btn>
      </template>
      <!-- CONTROLS FOR LOGIN & SIGNUP ON MOBILE MENU -->
      <v-list class="hamburger hamburgerMenu">
        <v-list-tile
          class="hamburgerMenu"
          @click="navigateTo({ name: 'home' })"
        >
          <v-list-tile-title>Home</v-list-tile-title>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile class="hamburgerMenu" :to="{ name: 'directory' }">
          <v-list-tile-title>Business</v-list-tile-title>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile class="hamburgerMenu">
          <v-list-tile-title>Pricing</v-list-tile-title>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile class="hamburgerMenu">
          <v-list-tile-title>Charity</v-list-tile-title>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile class="hamburgerMenu" v-if="!this.$store.state.loggedIn">
          <v-list-tile-title>Login</v-list-tile-title>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile class="hamburgerMenu" v-if="!this.$store.state.loggedIn">
          <v-list-tile-title>Signup</v-list-tile-title>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile
          class="hamburgerMenu"
          v-if="this.$store.state.loggedIn"
          @click="logout"
        >
          <v-list-tile-title>Logout</v-list-tile-title>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile
          class="hamburgerMenu"
          v-if="this.$store.state.loggedIn"
          :to="{ name: 'editProfile' }"
        >
          <v-list-tile-title>Edit Profile</v-list-tile-title>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile class="hamburgerMenu" :to="{ name: 'contact' }">
          <v-list-tile-title>Contact</v-list-tile-title>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile class="hamburgerMenu" :to="{ name: 'about' }">
          <v-list-tile-title>Meet the Team</v-list-tile-title>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile class="hamburgerMenu" :to="{ name: 'faq' }">
          <v-list-tile-title>
            faq
            <v-icon left color="red ">help</v-icon>
            <!-- darken-2 -->
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>

<script>
import DirectoryService from "@/services/DirectoryServices.js";
export default {
  data() {
    return {
      areas: [],
      categories: []
    };
  },
  async mounted() {
    await DirectoryService.areas()
      .then(response => {
        let area = response.data[0];
        this.$store.dispatch("setAreas", area);
        this.areas = this.$store.state.areas;
      })
      .catch(error => {
        // res.json(error)
        console.log("Error", error);
      });
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
    chooseArea: function(event) {
      let targetId = parseInt(event.currentTarget.id);
      let area = this.areas.filter(el => {
        return el.id === targetId;
      });
      this.$store.dispatch("setAreaChosen", area);
      this.$router.push({ name: "directory" });
      this.areaChange(targetId);
    },
    async areaChange(area) {
      await DirectoryService.categories(area)
        .then(response => {
          // console.log(response)
          this.categories = response.data;
        })
        .catch(err => {
          console.log(err);
        });
      this.$store.dispatch("setCategories", this.categories);
    },
    logout() {
      let user = null;
      this.$store.dispatch("logout", user);

      console.log("CLICKED");
    }
  }
};
</script>

<style scoped>
.home {
  cursor: pointer;
}
/* .dropDown {
  background-color: #f4ebde;
} */
#toolbarImg {
  width: 5%;
  height: 5%;
}
.cart:hover {
  cursor: pointer;
}

.logo:hover {
  cursor: auto;
}
.hamburger {
  display: none;
}
.v-list-tile-title:hover {
  cursor: pointer;
}
#corporateLogo {
  width: 2%;
}
#corporateLogo:hover {
  cursor: pointer;
}
.hamburgerMenu {
  background-color: #f4ebde;
}
.v-list-tile {
  background-color: #f4ebde;
}

@media screen and (max-width: 820px) {
  #toolbarHeader {
    width: 100%;
    /* height: 195px; */
  }
  .hamburger {
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: #f4ebde;
  }
  .v-toolbar-items {
    display: none;
  }
  .notHamburger {
    display: none;
  }
  .home {
    font-size: 70%;
  }
  #corporateLogo {
    width: 10%;
  }
}
</style>
