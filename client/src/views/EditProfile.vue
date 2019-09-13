<template>
  <v-container>
    <div style="display: flex; justify-content: center;">
      <img src="../assets/newLogo.png" alt="LOGO" style="width: 7.5%;" />
    </div>
    <h1>Edit profile</h1>
    <v-alert
      class="danger-alert"
      :value="openMessage"
      type="info"
    >If you already have a profile, please login</v-alert>
    <v-layout xs9 column offset-xs2>
      <v-layout class="panelWidth" xs3 column justify-space-around>
        <v-flex xs3 offset-xs0>
          <v-flex>
            <br />
            <v-flex sm12 offset-xs0>
              <form enctype="multipart/form-data">
                <br />
                <br />
                <v-text-field
                  label="Email Address"
                  placeholder="email address"
                  autocomplete="false"
                  type="email"
                  v-model="email"
                  readonly
                  @click="snackbar = true"
                ></v-text-field>
                <v-snackbar style="margin: 150px;" v-model="snackbar">
                  {{ actualMessage }}
                  <v-btn color="pink" text @click="snackbar = false">close</v-btn>
                </v-snackbar>
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
                <br />
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
                <vue-editor v-model="description" :editorToolbar="customToolbar"></vue-editor>
                <br />
                <br />
                <hr />
                <br />
                <panel title="upload main profile image">
                  <ImageUpload></ImageUpload>
                  <label
                    for
                    v-if="!this.$store.state.uploadedImage && !cropImg  || originalImage"
                  >Original image</label>
                  <br />
                  <div
                    style="display: flex; justify-content: center;"
                    v-if="!this.$store.state.uploadedImage && !cropImg  || originalImage"
                  >
                    <img :src="originalImage" alt="Original Profile Image" style="width: 40%;" />
                  </div>
                  <v-btn @click="uploadProfileImage" v-if="this.$store.state.uploadedImage">Use</v-btn>
                  <v-btn
                    v-if="this.$store.state.uploadedImage && !cropImg"
                    @click="cancelProfileUpload"
                  >Cancel</v-btn>
                </panel>
                <br />
                <panel title="upload business image 1">
                  <ImageUpload></ImageUpload>
                  <label
                    for
                    v-if="!this.$store.state.uploadedImage && !cropImg1 || originalImage1"
                  >Original image</label>
                  <br />
                  <div
                    style="display: flex; justify-content: center;"
                    v-if="!this.$store.state.uploadedImage && !cropImg1 || originalImage1"
                  >
                    <!-- <label for="">Original image</label><br> -->
                    <img :src="originalImage1" alt="Original Profile Image" style="width: 40%;" />
                  </div>
                  <v-btn @click="uploadImage1" v-if="this.$store.state.uploadedImage">Use</v-btn>
                  <v-btn
                    v-if="this.$store.state.uploadedImage && !cropImg1"
                    @click="canceluploadImage1Upload"
                  >Cancel</v-btn>
                </panel>
                <br />
                <panel title="upload business image 2">
                  <ImageUpload></ImageUpload>
                  <label
                    for
                    v-if="!this.$store.state.uploadedImage && !cropImg2  || originalImage2"
                  >Original image</label>
                  <br />
                  <div
                    style="display: flex; justify-content: center;"
                    v-if="!this.$store.state.uploadedImage && !cropImg2  || originalImage2"
                  >
                    <img :src="originalImage2" alt="Original Profile Image" style="width: 40%;" />
                  </div>
                  <v-btn @click="uploadImage2" v-if="this.$store.state.uploadedImage">Use</v-btn>
                  <v-btn
                    v-if="this.$store.state.uploadedImage && !cropImg2"
                    @click="canceluploadImage2Upload"
                  >Cancel</v-btn>
                </panel>
                <br />
                <panel title="upload business image 3">
                  <ImageUpload></ImageUpload>
                  <label
                    for
                    v-if="!this.$store.state.uploadedImage && !cropImg3  || originalImage3"
                  >Original image</label>
                  <br />
                  <div
                    style="display: flex; justify-content: center;"
                    v-if="!this.$store.state.uploadedImage && !cropImg3  || originalImage3"
                  >
                    <img :src="originalImage3" alt="Original Profile Image" style="width: 40%;" />
                  </div>
                  <v-btn @click="uploadImage3" v-if="this.$store.state.uploadedImage">Use</v-btn>
                  <v-btn
                    v-if="this.$store.state.uploadedImage && !cropImg3"
                    @click="canceluploadImage3Upload"
                  >Cancel</v-btn>
                </panel>
                <br />
                <!-- <v-btn light color="#F4EBDE">Save & return later</v-btn> -->
                <v-btn id="btn2" light color="#F4EBDE" @click="save">Save</v-btn>
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
// import VueCropper from "vue-cropperjs";
// import "cropperjs/dist/cropper.css";
import DirectoryService from "@/services/DirectoryServices";
import Panel from "@/components/Panel";
import ImageUpload from "@/components/ImageUpload";

import { VueEditor } from "vue2-editor";

// import Authenticate from "@/functions/authenticateAdmin";
export default {
  data() {
    return {
      originalImage: "",
      originalImage1: "",
      originalImage2: "",
      originalImage3: "",
      // imgSrc: "",
      cropImg: "",
      // imgSrc1: "",
      cropImg1: "",
      // imgSrc2: "",
      cropImg2: "",
      // imgSrc3: "",
      cropImg3: "",

      // areas: [],
      // areasArray: [],
      // packages: null,
      // items: [],
      // selectedOption: "",
      // optionChosen: "",

      categories: [],
      categoriesArray: [],

      // extraPackages: [],
      // extraPackagesChosen: [],

      id: "",
      email: "",
      businessName: "",
      firstName: "",
      lastName: "",
      contactNumber: "",
      website: "",
      faceBook: "",
      instagram: "",
      description: "",

      openMessage: false,

      // snackbar: false,
      // actualMessage: "To Change this please contact admin at Suburbs Directory",

      error: null,
      success: null,

      customToolbar: [
        [{ font: [] }],
        [{ header: [false, 1, 2, 3, 4, 5, 6] }],
        ["bold", "italic", "underline", "strike"],
        [
          { align: "" },
          { align: "center" },
          { align: "right" },
          { align: "justify" }
        ],
        [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ color: [] }, { background: [] }]
      ]
    };
  },
  async mounted() {
    this.$store.dispatch("setUploadedImage", "");
    // this.areas = this.$store.state.areas;
    // this.areas.forEach(el => {
    //   el.areaChosen = false;
    // });
    this.categories = this.$store.state.categories;

    this.categories.forEach(el => {
      el.categoryChosen = false;
    });
    // let response = await DirectoryService.getExtraPackages();
    // this.extraPackages = response.data;
    // this.extraPackages.forEach(el => {
    //   el.extraPackagesChosen = false;
    // });
    let profile = await DirectoryService.getProfile(this.$store.state.profile);
    console.log(profile.data);
    this.id = profile.data[0].id;
    this.businessName = profile.data[0].businessName;
    this.email = profile.data[0].email;
    this.firstName = profile.data[0].first_name;
    this.lastName = profile.data[0].last_name;
    this.contactNumber = profile.data[0].mob_no;
    this.website = profile.data[0].website;
    this.faceBook = profile.data[0].facebook;
    this.instagram = profile.data[0].instagram;
    this.description = profile.data[0].profile_description;
    // this.optionChosen = profile.data[0].selectedOption;
    // this.extraPackagesChosen = JSON.parse(profile.data[0].extra_packages);
    // this.areasArray = JSON.parse(profile.data[0].areas);
    this.categoriesArray = JSON.parse(profile.data[0].catarea);
    let img = process.env.VUE_APP_IMAGEURL;
    // console.log(img)
    this.originalImage = `${img}${profile.data[0].profile_image}`;
    // this.cropImg = `${img}${profile.data[0].profile_image}`;
    this.originalImage1 = `${img}${profile.data[0].business_image1}`;
    // this.cropImg1 = `${img}${profile.data[0].business_image1}`;
    this.originalImage2 = `${img}${profile.data[0].business_image2}`;
    // this.cropImg2 = `${img}${profile.data[0].business_image2}`;
    this.originalImage3 = `${img}${profile.data[0].business_image3}`;
    // this.cropImg3 = `${img}${profile.data[0].business_image3}`;
    // this.setImage()
    console.log(this.imgSrc);
    // this.areasArray.forEach(el => {
    //   let area = el;
    //   this.areas.forEach(element => {
    //     if (element.id == area) {
    //       element.areaChosen = true;
    //     }
    //   });
    // });
    this.categoriesArray.forEach(el => {
      let category = el;
      this.categories.forEach(element => {
        if (element.id == category) {
          element.categoryChosen = true;
        }
      });
    });
    // let numberOfSuburbs = {
    //   number: this.areasArray.length
    // };
    // let suburbs = await DirectoryService.getPackages(numberOfSuburbs);
    // this.packages = suburbs.data;
    // let items = [];
    // this.packages.forEach(el => {
    //   items.push(el.option_description);
    // });
    // this.items = items;
    // let packageChosen = this.packages.filter(el => {
    //   if (el.id === this.optionChosen) {
    //     return el.option_description;
    //   }
    // });
    // this.selectedOption = packageChosen[0].option_description;
    // this.extraPackagesChosen.forEach(el => {
    //   let extraPackage = el;
    //   this.extraPackages.forEach(element => {
    //     if (element.id == extraPackage) {
    //       element.extraPackagesChosen = true;
    //     }
    //   });
    // });
    setTimeout(() => {
      this.openMessage = false;
    }, 2000);

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
    VueEditor,
    ImageUpload
  },
  watch: {
    description(newVal, oldVal) {
      oldVal = this.description;
      newVal = oldVal;
      let newContent = newVal;
      newContent = newContent.replace(/"/g, "'");
      this.description = newContent;
      // console.log(this.description);
    }
  },
  methods: {
    uploadProfileImage() {
      this.cropImg = this.$store.state.uploadedImage;
      // console.log( "Uploaded Image",this.cropImg)
      this.originalImage = "";
    },
    cancelProfileUpload() {
      this.$store.dispatch("setUploadedImage", "");
      this.cropImg = "";
    },
    uploadImage1() {
      this.cropImg1 = this.$store.state.uploadedImage;
      this.originalImage1 = "";
    },
    canceluploadImage1Upload() {
      // this.$store.dispatch("setUploadedImage", "");
      this.cropImg1 = "";
    },
    uploadImage2() {
      this.cropImg2 = this.$store.state.uploadedImage;
      this.originalImage2 = "";
    },
    canceluploadImage2Upload() {
      // this.$store.dispatch("setUploadedImage", "");
      this.cropImg2 = "";
    },
    uploadImage3() {
      this.cropImg3 = this.$store.state.uploadedImage;
      this.originalImage3 = "";
    },
    canceluploadImage3Upload() {
      // this.$store.dispatch("setUploadedImage", "");
      this.cropImg3 = "";
    },
    // async areaClick() {
    //   this.areasArray = [];
    //   let areaCount = this.areas.filter(el => {
    //     if (el.areaChosen === true) {
    //       this.areasArray.push(el.id);
    //     }
    //     return el.areaChosen === true;
    //   });
    //   console.log(areaCount);
    //   let numberOfSuburbs = {
    //     number: this.areasArray.length
    //   };
    //   let response = await DirectoryService.getPackages(numberOfSuburbs);
    //   console.log(response.data);
    //   this.packages = response.data;
    //   let items = [];
    //   this.packages.forEach(el => {
    //     items.push(el.option_description);
    //   });
    //   console.log("ITEMS:", items);
    //   this.items = items;
    //   console.log(this.items);

    //   areaCount = [];
    //   console.log(this.areasArray);
    // },
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
    // extraPackageClick() {
    //   this.extraPackagesChosen = [];
    //   let extraPackagesCount = this.extraPackages.filter(el => {
    //     if (el.extraPackagesChosen === true) {
    //       this.extraPackagesChosen.push(el.id);
    //     }
    //     return el.extraPackagesChosen === true;
    //   });
    //   console.log(extraPackagesCount);
    //   // categoryCount = []
    //   console.log("This.extraPackagesChosen", this.extraPackagesChosen);
    // },
    // selectedOpt() {
    //   console.log("TESTING", this.selectedOption);
    //   let packageChosen = this.packages.filter(el => {
    //     if (el.option_description === this.selectedOption) {
    //       return el.id;
    //     }
    //   });
    //   console.log(packageChosen);
    //   this.optionChosen = packageChosen[0].id;
    //   console.log("Option Chosen", this.optionChosen);
    // },
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
    },
    async save() {
      console.log("Clicked");

      let formData = new FormData();
      formData.append("id", this.id);
      formData.append("file", this.cropImg);
      formData.append("file1", this.cropImg1);
      formData.append("file2", this.cropImg2);
      formData.append("file3", this.cropImg3);
      formData.append("email", this.email);
      formData.append("businessName", this.businessName);
      formData.append("firstName", this.firstName);
      formData.append("lastName", this.lastName);
      formData.append("contactNumber", this.contactNumber);
      formData.append("website", this.website);
      formData.append("facebook", this.faceBook);
      formData.append("instagram", this.instagram);
      // formData.append("areas", this.areasArray);
      // formData.append("selectedOption", this.optionChosen);
      formData.append("catarea", this.categoriesArray);
      formData.append("profile_description", this.description);
      // formData.append("extra_packages", this.extraPackagesChosen);

      if (
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
      } else {
        let response = await DirectoryService.editProfile(formData);
        console.log("THIS IS THE RESPONSE", response.data);
        this.success = "You have successfully updated your profile";
        setTimeout(() => {
          this.$router.push({ name: "home" });
        }, 2000);
        // let token = response.data.token;
        // let user = response.data.user;
        // console.log(token);
        // console.log(user);
        // this.$store.dispatch("setToken", token);
        // this.$store.dispatch("setUser", user);
        // console.log(this.$store.state.userName);
        // console.log(this.$store.state.email);
      }
    }
  }
};
</script>

<style scoped>
.invalidEmail {
  z-index: 1;
  position: fixed;
  top: 50%;
  margin: 0 auto;
  width: 75%;
}
img {
  display: flex;
  justify-content: center;
}
</style>
