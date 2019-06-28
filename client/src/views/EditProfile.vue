<template>
  <v-container>
    <img src="../assets/newLogo.png" alt="LOGO" style="width: 7.5%;">
    <h1>Edit profile</h1>
    <!-- <v-alert class="danger-alert"  :value="true" type="info">If you already have a profile, please login</v-alert> -->
    <v-layout xs9 column offset-xs2>
      <v-layout class="panelWidth" xs3 column justify-space-around>
        <v-flex xs3 offset-xs0>
          <v-flex>
            <br>
            <v-flex sm12 offset-xs0>
              <form enctype="multipart/form-data">
                <br>
                <br>
                <v-text-field
                  label="Email Address"
                  placeholder="email address"
                  autocomplete="false"
                  type="email"
                  @change="checkEmail"
                  @blur="checkEmail"
                  v-model="email"
                ></v-text-field>
                <!-- <v-text-field
                  label="Password"
                  placeholder="Password"
                  autocomplete="false"
                  type="password"
                  v-model="password"
                ></v-text-field>
                <v-text-field
                  label="Repeat Password"
                  placeholder="Repeat Password"
                  autocomplete="false"
                  type="password"
                  v-model="repeatPassword"
                  @blur="passwordTest"
                ></v-text-field>-->
                <v-text-field
                  label="Business Name"
                  placeholder="Business Name"
                  autocomplete="false"
                  v-model="businessName"
                ></v-text-field>
                <v-text-field
                  v-model="firstName"
                  label="First Name"
                  placeholder="First Name"
                  autocomplete="false"
                ></v-text-field>
                <v-text-field
                  v-model="lastName"
                  label="Last Name"
                  placeholder="Last Name"
                  autocomplete="false"
                ></v-text-field>
                <v-text-field
                  label="Contact Number"
                  placeholder="Contact Number"
                  type="number"
                  autocomplete="false"
                  v-model="contactNumber"
                ></v-text-field>
                <v-text-field
                  label="Website"
                  placeholder="Enter your Website URL"
                  autocomplete="false"
                  v-model="website"
                ></v-text-field>
                <v-text-field
                  label="Facebook"
                  placeholder="Enter your Facebook link"
                  autocomplete="false"
                  v-model="faceBook"
                ></v-text-field>
                <v-text-field
                  label="Instagram"
                  placeholder="Enter your instagram link"
                  autocomplete="false"
                  v-model="instagram"
                ></v-text-field>
                <v-flex>
                  <v-label>Area</v-label>
                </v-flex>
                <ul
                  style="display: flex; justify-content: space-between; flex-wrap: wrap; margin: 15px 35px; width: 100%; flex-direction: column;"
                >
                  <li
                    v-for="(area, i) in areas"
                    :key="i"
                    style="display: flex; justify-content: space-evenly; flex-wrap: wrap;"
                  >
                    <v-checkbox
                      @click="areaClick"
                      v-model="area.areaChosen"
                      :id="area.id.toString()"
                      :label="area.area_description"
                      color="beige lighten-1"
                    ></v-checkbox>
                  </li>
                </ul>
                <br>
                <hr>
                <br>
                <div v-if="areasArray.length">
                  <v-flex>
                    <v-label>Options</v-label>
                  </v-flex>
                  <br>
                  <v-flex xs12 sm6 md12 d-flex>
                    <v-select
                      v-model="selectedOption"
                      @change="selectedOpt"
                      :items="items"
                      box
                      :label="optionChosen ? selectedOption : 'Choose your package option'"
                    ></v-select>
                    <!-- <v-select :items="item.option_description" box label="Choose your package option"></v-select> -->
                  </v-flex>
                </div>
                <br>
                <v-flex>
                  <v-label>Category</v-label>
                </v-flex>
                <v-flex>
                  <ul
                    style="display: flex; justify-content: space-between; flex-wrap: wrap; margin: 15px 35px; width: 100%; flex-direction: column;"
                  >
                    <li
                      v-for="(category, i) in categories"
                      :key="i"
                      style="display: flex; justify-content: space-evenly; flex-wrap: wrap;"
                    >
                      <v-checkbox
                        :id="category.id.toString() + 'C'"
                        v-model="category.categoryChosen"
                        :label="category.category_description"
                        color="beige lighten-1"
                        @click="categoryClick"
                      ></v-checkbox>
                    </li>
                  </ul>
                </v-flex>
                <v-textarea
                  label="Business Description"
                  required
                  placeholder="Description about 250 words"
                  v-model="description"
                ></v-textarea>
                <br>
                <v-flex>
                  <v-label>Other Options</v-label>
                </v-flex>
                <v-flex>
                  <ul
                    style="display: flex; justify-content: space-between; flex-wrap: wrap; margin: 15px 35px; width: 100%; flex-direction: column;"
                  >
                    <li
                      v-for="(extraPackage, i) in extraPackages"
                      :key="i"
                      style="display: flex; justify-content: space-evenly; flex-wrap: wrap;"
                    >
                      <v-checkbox
                        :id="extraPackage.id.toString() + 'E'"
                        v-model="extraPackage.extraPackagesChosen"
                        :label="extraPackage.option_name"
                        color="beige lighten-1"
                        @click="extraPackageClick"
                      ></v-checkbox>
                    </li>
                  </ul>
                </v-flex>
                <br>
                <hr>
                <br>
                <panel title="upload main profile image">
                  <input
                    type="file"
                    ref="file"
                    name="image"
                    accept="image/*"
                    style="font-size: 1.2em; padding: 10px 0;"
                    @change="setImage"
                  >
                  <br>
                  <div class="imageDiv" style>
                    <vue-cropper
                      ref="cropper"
                      :guides="true"
                      :view-mode="2"
                      drag-mode="crop"
                      :auto-crop-area="1"
                      :min-container-width="250"
                      :min-container-height="180"
                      :background="true"
                      :rotatable="true"
                      :src="imgSrc"
                      alt="Source Image"
                      :img-style="{ width: '400px', height: '300px' }"
                    ></vue-cropper>
                  </div>
                  <br>
                  <br>
                  <img
                    v-if="cropImg"
                    :src="cropImg"
                    style="width: 200px; height: 150px; border: 1px solid gray"
                    alt="Cropped Image"
                  >
                  <br>
                  <br>
                  <button
                    @click.prevent="cropImage"
                    v-if="imgSrc != ''"
                    style="margin-right: 40px;"
                  >Crop</button>
                  <button @click.prevent="rotate" v-if="imgSrc != ''">Rotate</button>
                  <br>
                </panel>
                <br>
                <panel title="upload business image 1">
                  <br>
                  <input
                    type="file"
                    ref="file1"
                    name="image"
                    accept="image/*"
                    style="font-size: 1.2em; padding: 10px 0;"
                    @change="setImage1"
                  >
                  <br>
                  <div class="imageDiv">
                    <vue-cropper
                      ref="cropper1"
                      :guides="true"
                      :view-mode="2"
                      drag-mode="crop"
                      :auto-crop-area="1"
                      :min-container-width="250"
                      :min-container-height="180"
                      :background="true"
                      :rotatable="true"
                      :src="imgSrc1"
                      alt="Source Image"
                      :img-style="{ width: '400px', height: '300px' }"
                    ></vue-cropper>
                  </div>
                  <br>
                  <br>
                  <img
                    v-if="cropImg1"
                    :src="cropImg1"
                    style="width: 200px; height: 150px; border: 1px solid gray"
                    alt="Cropped Image"
                  >
                  <br>
                  <br>
                  <button
                    @click.prevent="cropImage1"
                    v-if="imgSrc != ''"
                    style="margin-right: 40px;"
                  >Crop</button>
                  <button @click.prevent="rotate1" v-if="imgSrc1 != ''">Rotate</button>
                  <br>
                  <br>
                </panel>
                <br>
                <panel title="upload business image 2">
                  <br>
                  <input
                    type="file"
                    ref="file2"
                    name="image"
                    accept="image/*"
                    style="font-size: 1.2em; padding: 10px 0;"
                    @change="setImage2"
                  >
                  <br>
                  <div class="imageDiv">
                    <vue-cropper
                      ref="cropper2"
                      :guides="true"
                      :view-mode="2"
                      drag-mode="crop"
                      :auto-crop-area="1"
                      :min-container-width="250"
                      :min-container-height="180"
                      :background="true"
                      :rotatable="true"
                      :src="imgSrc2"
                      alt="Source Image"
                      :img-style="{ width: '400px', height: '300px' }"
                    ></vue-cropper>
                  </div>
                  <br>
                  <br>
                  <img
                    v-if="cropImg2"
                    :src="cropImg2"
                    style="width: 200px; height: 150px; border: 1px solid gray"
                    alt="Cropped Image"
                  >
                  <br>
                  <br>
                  <button
                    @click.prevent="cropImage2"
                    v-if="imgSrc != ''"
                    style="margin-right: 40px;"
                  >Crop</button>
                  <button @click.prevent="rotate2" v-if="imgSrc2 != ''">Rotate</button>
                  <br>
                </panel>
                <br>
                <panel title="upload business image 3">
                  <br>
                  <input
                    type="file"
                    ref="file3"
                    name="image"
                    accept="image/*"
                    style="font-size: 1.2em; padding: 10px 0;"
                    @change="setImage3"
                  >
                  <br>
                  <div class="imageDiv">
                    <vue-cropper
                      ref="cropper3"
                      :guides="true"
                      :view-mode="2"
                      drag-mode="crop"
                      :auto-crop-area="1"
                      :min-container-width="250"
                      :min-container-height="180"
                      :background="true"
                      :rotatable="true"
                      :src="imgSrc3"
                      alt="Source Image"
                      :img-style="{ width: '400px', height: '300px' }"
                    ></vue-cropper>
                  </div>
                  <br>
                  <br>
                  <img
                    v-if="cropImg3"
                    :src="cropImg3"
                    style="width: 200px; height: 150px; border: 1px solid gray"
                    alt="Cropped Image"
                  >
                  <br>
                  <br>
                  <button
                    @click.prevent="cropImage3"
                    v-if="imgSrc3 != ''"
                    style="margin-right: 40px;"
                  >Crop</button>
                  <button @click.prevent="rotate" v-if="imgSrc3 != ''">Rotate</button>
                  <br>
                  <br>
                </panel>
                <br>
                <!-- <v-btn light color="#F4EBDE">Save & return later</v-btn> -->
                <v-btn id="btn2" light color="#F4EBDE" @click="save">Continue >></v-btn>
              </form>
            </v-flex>
            <v-alert
              class="danger-alert invalidEmail"
              v-if="error"
              :value="true"
              type="error"
            >{{ error }}</v-alert>
            <v-alert class="danger-alert" v-if="success" :value="true" type="success">{{ success }}</v-alert>
          </v-flex>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
import DirectoryService from "@/services/DirectoryServices";
import Panel from "@/components/Panel";
// import Authenticate from "@/functions/authenticateAdmin";
export default {
  data() {
    return {
      imgSrc: "",
      cropImg: "",
      imgSrc1: "",
      cropImg1: "",
      imgSrc2: "",
      cropImg2: "",
      imgSrc3: "",
      cropImg3: "",

      areas: [],
      areasArray: [],
      packages: null,
      items: [],
      selectedOption: "",
      optionChosen: "",

      categories: [],
      categoriesArray: [],

      extraPackages: [],
      extraPackagesChosen: [],

      email: "",
      password: "",
      repeatPassword: "",
      businessName: "",
      firstName: "",
      lastName: "",
      contactNumber: "",
      website: "",
      faceBook: "",
      instagram: "",
      description: "",

      error: null,
      success: null
    };
  },
  async mounted() {
    this.areas = this.$store.state.areas;
    this.areas.forEach(el => {
      el.areaChosen = false;
    });
    this.categories = this.$store.state.categories;

    this.categories.forEach(el => {
      el.categoryChosen = false;
    });
    let response = await DirectoryService.getExtraPackages();
    this.extraPackages = response.data;
    this.extraPackages.forEach(el => {
      el.extraPackagesChosen = false;
    });
    let profile = await DirectoryService.getProfile(this.$store.state.profile);
    console.log(profile.data)
    this.businessName = profile.data[0].businessName;
    this.email = profile.data[0].email;
    this.firstName = profile.data[0].first_name;
    this.lastName = profile.data[0].last_name;
    this.contactNumber = profile.data[0].mob_no;
    this.website = profile.data[0].website;
    this.faceBook = profile.data[0].facebook;
    this.instagram = profile.data[0].instagram;
    this.description = profile.data[0].profile_description;
    this.optionChosen = profile.data[0].selectedOption;
    this.extraPackagesChosen = JSON.parse(profile.data[0].extra_packages);
    this.areasArray = JSON.parse(profile.data[0].areas);
    this.categoriesArray = JSON.parse(profile.data[0].catarea);
    let img = process.env.VUE_APP_IMAGEURL;
    // console.log(img)
    this.imgSrc = `${img}${profile.data[0].profile_image}`;
    // this.cropImg = `${img}${profile.data[0].profile_image}`;
    this.imgSrc1 = `${img}${profile.data[0].business_image1}`;
    // this.cropImg1 = `${img}${profile.data[0].business_image1}`;
    this.imgSrc2 = `${img}${profile.data[0].business_image2}`;
    // this.cropImg2 = `${img}${profile.data[0].business_image2}`;
    this.imgSrc3 = `${img}${profile.data[0].business_image3}`;
    // this.cropImg3 = `${img}${profile.data[0].business_image3}`;
    // this.setImage()
    console.log(this.imgSrc)
    this.areasArray.forEach(el => {
      let area = el;
      this.areas.forEach(element => {
        if (element.id == area) {
          element.areaChosen = true;
        }
      });
    });
    this.categoriesArray.forEach(el => {
      let category = el;
      this.categories.forEach(element => {
        if (element.id == category) {
          element.categoryChosen = true;
        }
      });
    });
    let numberOfSuburbs = {
      number: this.areasArray.length
    };
    let suburbs = await DirectoryService.getPackages(numberOfSuburbs);
    this.packages = suburbs.data;
    let items = [];
    this.packages.forEach(el => {
      items.push(el.option_description);
    });
    this.items = items;
    let packageChosen = this.packages.filter(el => {
      if (el.id === this.optionChosen) {
        return el.option_description;
      }
    });
    this.selectedOption = packageChosen[0].option_description;
    this.extraPackagesChosen.forEach(el => {
      let extraPackage = el;
      this.extraPackages.forEach(element => {
        if (element.id == extraPackage) {
          element.extraPackagesChosen = true;
        }
      });
    });

    // this.Authenticate = Authenticate.authenticate;
    // this.Authenticate();
    // if (!this.$store.state.administration.isAdminUserLoggedIn) {
    //   this.error =
    //     "Your session has expired! You will be redirected to the login page.";
    //   setTimeout(() => {
    //     this.error = null;
    //     this.$router.push({
    //       name: "adminLogin"
    //     });
    //   }, 800);
    // }
  },
  components: {
    Panel,
    VueCropper
  },
  methods: {
    async areaClick() {
      this.areasArray = [];
      let areaCount = this.areas.filter(el => {
        if (el.areaChosen === true) {
          this.areasArray.push(el.id);
        }
        return el.areaChosen === true;
      });
      console.log(areaCount);
      let numberOfSuburbs = {
        number: this.areasArray.length
      };
      let response = await DirectoryService.getPackages(numberOfSuburbs);
      console.log(response.data);
      this.packages = response.data;
      let items = [];
      this.packages.forEach(el => {
        items.push(el.option_description);
      });
      console.log("ITEMS:", items);
      this.items = items;
      console.log(this.items);

      areaCount = [];
      console.log(this.areasArray);
    },
    categoryClick() {
      this.categoriesArray = [];
      let categoryCount = this.categories.filter(el => {
        if (el.categoryChosen === true) {
          this.categoriesArray.push(el.id);
        }
        return el.categoryChosen === true;
      });
      console.log(categoryCount);
      console.log(this.categoriesArray);
    },
    extraPackageClick() {
      this.extraPackagesChosen = [];
      let extraPackagesCount = this.extraPackages.filter(el => {
        if (el.extraPackagesChosen === true) {
          this.extraPackagesChosen.push(el.id);
        }
        return el.extraPackagesChosen === true;
      });
      console.log(extraPackagesCount);
      // categoryCount = []
      console.log("This.extraPackagesChosen", this.extraPackagesChosen);
    },
    selectedOpt() {
      console.log("TESTING", this.selectedOption);
      let packageChosen = this.packages.filter(el => {
        if (el.option_description === this.selectedOption) {
          return el.id;
        }
      });
      console.log(packageChosen);
      this.optionChosen = packageChosen[0].id;
      console.log("Option Chosen", this.optionChosen);
    },
    async checkEmail() {
      let email = {
        email: this.email
      };
      try {
        let response = await DirectoryService.checkEmail(email);
        if (response.data.error) {
          this.error = response.data.error;
          setTimeout(() => {
            this.email = "";
            this.error = null;
          }, 2500);
        }
        console.log(response.data);
      } catch (e) {
        console.log(e);
      }
      // console.log(response);
    },
    passwordTest() {
      if (this.password !== this.repeatPassword) {
        this.error = "passwords do not match";
        this.password = "";
        this.repeatPassword = "";
        setTimeout(() => {
          this.error = null;
        }, 1500);
      }
    },
    async save() {
      console.log("Clicked");

      let formData = new FormData();
      formData.append("file", this.cropImg);
      formData.append("file1", this.cropImg1);
      formData.append("file2", this.cropImg2);
      formData.append("file3", this.cropImg3);
      formData.append("email", this.email);
      formData.append("password", this.password);
      formData.append("businessName", this.businessName);
      formData.append("firstName", this.firstName);
      formData.append("lastName", this.lastName);
      formData.append("contactNumber", this.contactNumber);
      formData.append("website", this.website);
      formData.append("facebook", this.faceBook);
      formData.append("instagram", this.instagram);
      formData.append("areas", this.areasArray);
      formData.append("selectedOption", this.optionChosen);
      formData.append("catarea", this.categoriesArray);
      formData.append("profile_description", this.description);
      formData.append("extra_packages", this.extraPackagesChosen);

      if (this.email === "") {
        this.error = "Please fill in an email address";
        setTimeout(() => {
          this.error = null;
        }, 1500);
      } else if (this.password === "") {
        this.error = "Please fill in a password";
        setTimeout(() => {
          this.error = null;
        }, 1500);
      } else if (this.password !== this.repeatPassword) {
        this.error = "passwords do not match";
        this.password = "";
        this.repeatPassword = "";
        setTimeout(() => {
          this.error = null;
        }, 1500);
      } else if (
        this.businessName === "" ||
        this.firstName === "" ||
        this.lastName === "" ||
        this.contactNumber === ""
      ) {
        this.error =
          "Business Name, First Name, Last Name and Contact Number must be filled in";
        setTimeout(() => {
          this.error = null;
        }, 1500);
      } else if (!this.areasArray.length) {
        this.error = "Choose at least 1 area";
        setTimeout(() => {
          this.error = null;
        }, 1500);
      } else if (this.optionChosen === "") {
        this.error = "At least one option needs to be chosen";
        setTimeout(() => {
          this.error = null;
        }, 1500);
      } else if (!this.categoriesArray.length) {
        this.error = "Choose at least 1 category";
        setTimeout(() => {
          this.error = null;
        }, 1500);
      } else if (this.description === "") {
        this.error = "A description is required";
        setTimeout(() => {
          this.error = null;
        }, 1500);
      } else if (
        this.cropImg === "" ||
        this.cropImg1 === "" ||
        this.cropImg2 === "" ||
        this.cropImg3 === ""
      ) {
        this.error = "All Images must be selected";
        setTimeout(() => {
          this.error = null;
        }, 1500);
      } else {
        let response = await DirectoryService.addProfile(formData);
        console.log(response.data);
        let token = response.data.token;
        let user = response.data.user;
        console.log(token);
        console.log(user);
        this.$store.dispatch("setToken", token);
        this.$store.dispatch("setUser", user);
        console.log(this.$store.state.userName);
        console.log(this.$store.state.email);
      }
    },
    setImage(e) {
      const file = e.target.files[0];
      if (!file.type.includes("image/")) {
        alert("Please select an image file");
        return;
      }
      if (typeof FileReader === "function") {
        const reader = new FileReader();
        reader.onload = event => {
          this.imgSrc = event.target.result;
          this.cropImg = event.target.result;
          // rebuild cropperjs with the updated source
          this.$refs.cropper.replace(event.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert("Sorry, FileReader API not supported");
      }
    },
    cropImage() {
      // console.log("JUST CHECKING", this.$refs.cropper)
      // get image data for post processing, e.g. upload or setting image src
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
    },
    rotate() {
      // guess what this does :)
      this.$refs.cropper.rotate(90);
    },
    // BI1

    setImage1(e) {
      const file = e.target.files[0];
      if (!file.type.includes("image/")) {
        alert("Please select an image file");
        return;
      }
      if (typeof FileReader === "function") {
        const reader = new FileReader();
        reader.onload = event => {
          this.imgSrc1 = event.target.result;
          this.cropImg1 = event.target.result;
          // rebuild cropperjs with the updated source
          this.$refs.cropper1.replace(event.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert("Sorry, FileReader API not supported");
      }
    },
    cropImage1() {
      // get image data for post processing, e.g. upload or setting image src
      this.cropImg1 = this.$refs.cropper1.getCroppedCanvas().toDataURL();
    },
    rotate1() {
      // guess what this does :)
      this.$refs.cropper1.rotate(90);
    },

    // BI2
    setImage2(e) {
      const file = e.target.files[0];
      if (!file.type.includes("image/")) {
        alert("Please select an image file");
        return;
      }
      if (typeof FileReader === "function") {
        const reader = new FileReader();
        reader.onload = event => {
          this.imgSrc2 = event.target.result;
          this.cropImg2 = event.target.result;
          // rebuild cropperjs with the updated source
          this.$refs.cropper2.replace(event.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert("Sorry, FileReader API not supported");
      }
    },
    cropImage2() {
      // get image data for post processing, e.g. upload or setting image src
      this.cropImg2 = this.$refs.cropper2.getCroppedCanvas().toDataURL();
    },
    rotate2() {
      // guess what this does :)
      this.$refs.cropper2.rotate(90);
    },
    // BI3
    setImage3(e) {
      const file = e.target.files[0];
      if (!file.type.includes("image/")) {
        alert("Please select an image file");
        return;
      }
      if (typeof FileReader === "function") {
        const reader = new FileReader();
        reader.onload = event => {
          this.imgSrc3 = event.target.result;
          this.cropImg3 = event.target.result;
          // rebuild cropperjs with the updated source
          this.$refs.cropper3.replace(event.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert("Sorry, FileReader API not supported");
      }
    },
    cropImage3() {
      // get image data for post processing, e.g. upload or setting image src
      this.cropImg3 = this.$refs.cropper3.getCroppedCanvas().toDataURL();
    },
    rotate3() {
      // guess what this does :)
      this.$refs.cropper3.rotate(90);
    }
  }
};
</script>

<style scoped>
.imageDiv {
  width: 400px;
  height: 300px;
  border: 1px solid gray;
  display: inline-block;
}

.invalidEmail {
  z-index: 1;
  position: fixed;
  top: 50%;
  margin: 0 auto;
  width: 75%;
}

@media screen and (max-width: 768px) {
  .imageDiv {
    width: 100%;
  }
}
</style>
