<template>
  <v-toolbar id="toolbarHeader"  fixed  light style="background-color: #F4EBDE;">
    <img id="corporateLogo" src="../assets/suburbs2.png" alt="LOGO">
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn class=" notHamburger"  flat @click="navigateTo({ name: 'home' })">Home</v-btn>
    </v-toolbar-items>
    <v-toolbar-items>
      <v-btn class="#305f72 notHamburger" flat :to="{name: 'directory'}">Business</v-btn>
    </v-toolbar-items>
    <v-toolbar-items>
      <v-btn class="#305f72 notHamburger" flat>Community</v-btn>
    </v-toolbar-items>
    <v-toolbar-items>
      <v-btn class="#305f72 notHamburger" flat>Charity</v-btn>
    </v-toolbar-items>
    <v-toolbar-items>
      <v-btn class="#305f72 notHamburger"  flat>Login</v-btn>
    </v-toolbar-items>
    <v-toolbar-items>
      <v-btn  class="#305f72 notHamburger"  flat >Signup</v-btn>
    </v-toolbar-items>
    <v-toolbar-items>
      <v-btn  class="#305f72 notHamburger"  flat >Logout</v-btn>
    </v-toolbar-items>
    <v-toolbar-items>
      <v-btn  class="#305f72 notHamburger"  flat :to="{ name: 'contact'}">Contact</v-btn>
    </v-toolbar-items>
     <v-toolbar-items>
      <v-btn  class="#305f72 notHamburger"  flat  :to="{ name: 'about'}">About</v-btn>
    </v-toolbar-items>
    <v-toolbar-items>
      <v-btn class="#305f72 notHamburger"  flat :to="{ name: 'faq'}">
        FAQ
        <v-icon  left color="red darken-2" class="ml-2">help</v-icon>
      </v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>

    <v-menu class="hamburgerMenu" full-width right light offsetY min-width="100%">
      <template v-slot:activator="{ on }">
        <v-btn dark icon v-on="on">
          <v-toolbar-side-icon class="hamburger" light></v-toolbar-side-icon>
        </v-btn>
      </template>
      <!-- CONTROLS FOR LOGIN & SIGNUP ON MOBILE MENU -->
      <v-list class="hamburger hamburgerMenu">
        <v-list-tile class="hamburgerMenu" @click="navigateTo({ name: 'home' })">
          <v-list-tile-title >Home</v-list-tile-title>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile class="hamburgerMenu" :to="{name: 'directory'}">
          <v-list-tile-title >Business</v-list-tile-title>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile class="hamburgerMenu">
          <v-list-tile-title>Community</v-list-tile-title>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile class="hamburgerMenu">
          <v-list-tile-title>Charity</v-list-tile-title>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile class="hamburgerMenu">
          <v-list-tile-title>Login</v-list-tile-title>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile class="hamburgerMenu">
          <v-list-tile-title>Signup</v-list-tile-title>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile class="hamburgerMenu">
          <v-list-tile-title>Logout</v-list-tile-title>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile class="hamburgerMenu" :to="{ name: 'contact'}">
          <v-list-tile-title >Contact</v-list-tile-title>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile class="hamburgerMenu" :to="{ name: 'about'}">
          <v-list-tile-title >About</v-list-tile-title>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile class="hamburgerMenu" :to="{ name: 'faq'}">
          <v-list-tile-title>
            faq
            <v-icon left color="red darken-2">help</v-icon>
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>
<script>
export default {
  data() {
    return {
      
    };
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    }
  }
};
</script>
<style scoped>
.home {
  cursor: pointer;
}
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
  .hamburgerMenu {
    background-color: #F4EBDE;
  }
  .v-list-tile {
    background-color: #F4EBDE;

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
    background-color: #F4EBDE;
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
