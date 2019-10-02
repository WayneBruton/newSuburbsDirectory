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
                ></v-text-field>
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
                        :id="category.id.toString()"
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
                <v-btn id="btn2" light color="#F4EBDE" @click="save">Save</v-btn>
                <br />
                <br />
                <div v-if="paymentDue">
                  <span>{{ paymentDueMessage }}</span>
                  <v-flex center>
                    <v-switch
                      v-model="switch1"
                      :label="`${switchLabel}: R${amountToPay}`"
                      @change="changeTerms"
                    ></v-switch>
                  </v-flex>
                  <br />
                  <br />
                  <div style="display: flex; justify-content: center;">
                    <form
                      action="https://www.payfast.co.za/eng/process"
                      name="form_ad990b487f6e182cd44e0c189204bb70"
                      onsubmit="return click_ad990b487f6e182cd44e0c189204bb70( this );"
                      method="post"
                    >
                      <input type="hidden" name="cmd" value="_paynow" />
                      <input type="hidden" name="receiver" value="10469596" />
                      <input type="hidden" name="item_name" value="Suburbs Directory Subscription" />
                      <input type="hidden" name="amount" :value="amountToPay" />
                      <input
                        type="hidden"
                        name="item_description"
                        value="Subscription Suburbs Directory"
                      />
                      <input type="hidden" name="return_url" :value="success_url" />
                      <input type="hidden" name="cancel_url" :value="cancel_url" />

                      <table>
                        <tr>
                          <td colspan="2" align="center">
                            <input
                              type="image"
                              src="https://www.payfast.co.za/images/buttons/light-small-paynow.png"
                              width="165"
                              height="36"
                              alt="Pay Now"
                              title="Pay Now with PayFast"
                            />
                          </td>
                        </tr>
                      </table>
                    </form>
                  </div>
                </div>
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
import DirectoryService from "@/services/DirectoryServices";
import Panel from "@/components/Panel";
import ImageUpload from "@/components/ImageUpload";
import moment from "moment";

import { VueEditor } from "vue2-editor";

// import Authenticate from "@/functions/authenticateAdmin";
export default {
  data() {
    return {
      originalImage: "",
      originalImage1: "",
      originalImage2: "",
      originalImage3: "",
      cropImg: "",
      cropImg1: "",
      cropImg2: "",
      cropImg3: "",

      areasArray: [],
      packages: null,
      optionChosen: "",

      categories: [],
      categoriesArray: [],

      extraPackages: [],
      extraPackagesChosen: [],

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

      error: null,
      success: null,

      cancel_url: "",
      success_url: "",
      amountToPay: 0,
      dateNow: null,
      expiryDate: null,
      paymentDue: false,
      paymentDueMessage: "",
      payMonthly: true,
      suburbsPayMonthly: 0,
      suburbsPayAnnually: 0,
      extraPackageMonthly: 0,
      extraPackageAnnually: 0,

      switch1: true,
      switchLabel: "Monthly",

       profile_approved: false,
      paid_to_date: false,
      payment_expires: null,

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
    let profile = await DirectoryService.getProfile(this.$store.state.profile);
    this.expiryDate = moment(profile.data[0].payment_expires)._d;
    let dateNow = moment()._d;
    this.dateNow = dateNow;
    let now = moment(this.dateNow); //todays date
    let end = moment(this.expiryDate); // another date
    let duration = moment.duration(end.diff(now));
    let days = duration.asDays();

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
    this.optionChosen = profile.data[0].selectedOption;
    this.extraPackagesChosen = JSON.parse(profile.data[0].extra_packages);
    this.areasArray = JSON.parse(profile.data[0].areas);
    this.categoriesArray = JSON.parse(profile.data[0].catarea);
    this.profile_approved = profile.data[0].profile_approved;
    this.paid_to_date = profile.data[0].paid_to_date;
    this.payment_expires = profile.data[0].payment_expires;
    console.log("Expiry at",this.payment_expires)
    let img = process.env.VUE_APP_IMAGEURL;
    this.originalImage = `${img}${profile.data[0].profile_image}`;
    this.originalImage1 = `${img}${profile.data[0].business_image1}`;
    this.originalImage2 = `${img}${profile.data[0].business_image2}`;
    this.originalImage3 = `${img}${profile.data[0].business_image3}`;

    let categoriesResponse = await DirectoryService.getCategories();
    this.categories = categoriesResponse.data;
    this.categories.forEach(el => {
      if (this.categoriesArray.includes(el.id)) {
        el.categoryChosen = true;
      } else {
        el.categoryChosen = false;
      }
    });

    let numberOfAreas = {
      number: this.areasArray.length
    };
    let packagesResponse = await DirectoryService.getPackages(numberOfAreas);
    this.packages = packagesResponse.data;
    let extraPackagesResponse = await DirectoryService.getExtraPackages();
    this.extraPackages = extraPackagesResponse.data;
    if (this.optionChosen === 1) {
      this.suburbsPayMonthly = this.packages[0].per_month.toFixed(2);
      this.suburbsPayAnnually = (this.suburbsPayMonthly * 12 * 0.8).toFixed(2);
    } else if (this.optionChosen === 2) {
      this.suburbsPayMonthly = this.packages[1].per_month.toFixed(2);
      this.suburbsPayAnnually = (this.suburbsPayMonthly * 12 * 0.8).toFixed(2);
    }

    this.extraPackages.forEach(el => {
      if (el.option_name.includes("Assist")) {
        el.annualDiscount = false;
      } else {
        el.annualDiscount = true;
      }
    });
    this.extraPackagesChosen.push(1);
    this.extraPackagesChosen.push(2);
    this.extraPackagesChosen.push(4);
    if (this.extraPackagesChosen.length > 0) {
      let totalExtras = [];
      this.extraPackagesChosen.forEach(el => {
        this.extraPackages.forEach(element => {
          if (el == element.id) {
            let details = {
              id: element.id,
              option: element.option_name,
              annualDiscount: element.annualDiscount,
              per_month: element.per_month
            };
            totalExtras.push(details);
          }
        });
      });
      this.extraPackageMonthly = totalExtras
        .reduce((total, current) => {
          return total + current.per_month;
        }, 0)
        .toFixed(2);

      this.extraPackageAnnually = totalExtras
        .reduce((total, current) => {
          if (current.annualDiscount === true) {
            total = total + current.per_month * 12 * 0.8;
          } else {
            total = total + current.per_month * 12;
          }
          return total;
        }, 0)
        .toFixed(2);
    }
    this.amountToPay =
      parseFloat(this.suburbsPayMonthly) + parseFloat(this.extraPackageMonthly);
    let profileID = this.id;
    let credentials = {
      monthly: this.payMonthly,
      amount: this.amountToPay,
      profileID: profileID
    };
    let response = await DirectoryService.payURL(credentials);
    let success = process.env.VUE_APP_SUCCESSURL;
    let cancel = process.env.VUE_APP_CANCELURL;
    this.success_url = `${success}${response.data}`;
    this.cancel_url = `${cancel}${response.data}`;
    if (profile.data[0].paid_to_date === 1 && days < 7) {
      this.paymentDueMessage = "Your Payment is due to expire soon.";
      this.paymentDue = true;
    } else if (profile.data[0].paid_to_date === 0) {
      this.paymentDueMessage = "subscribe to make your profile visible.";
      this.paymentDue = true;
    }

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
    async changeTerms() {
      if (this.payMonthly !== "true") {
        this.amountToPay =
          parseFloat(this.suburbsPayMonthly) +
          parseFloat(this.extraPackageMonthly);
        this.switchLabel = "Monthly";
        this.payMonthly = "true";
      } else {
        this.amountToPay =
          parseFloat(this.suburbsPayAnnually) +
          parseFloat(this.extraPackageAnnually);
        this.switchLabel = "Annual";
        this.payMonthly = "false";
      }
      let dateNow = new Date()
      let profileID = this.id;
      let credentials = {
        monthly: this.payMonthly,
        amount: this.amountToPay,
        profileID: profileID,
        dateNow: dateNow
      };
      let response = await DirectoryService.payURL(credentials);
      let success = process.env.VUE_APP_SUCCESSURL;
      let cancel = process.env.VUE_APP_CANCELURL;
      this.success_url = `${success}${response.data}`;
      this.cancel_url = `${cancel}${response.data}`;
    },
    uploadProfileImage() {
      this.cropImg = this.$store.state.uploadedImage;
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
      this.cropImg1 = "";
    },
    uploadImage2() {
      this.cropImg2 = this.$store.state.uploadedImage;
      this.originalImage2 = "";
    },
    canceluploadImage2Upload() {
      this.cropImg2 = "";
    },
    uploadImage3() {
      this.cropImg3 = this.$store.state.uploadedImage;
      this.originalImage3 = "";
    },
    canceluploadImage3Upload() {
      this.cropImg3 = "";
    },
    categoryClick() {
      this.categoriesArray = [];
      let categoryCount = this.categories.filter(el => {
        if (el.categoryChosen === true) {
          this.categoriesArray.push(el.id);
        }
        return el.categoryChosen === true;
      });
      console.log(categoryCount)
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
      } catch (e) {
        console.log(e);
      }
    },
    async save() {
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
      formData.append("areas", this.areasArray);
      // formData.append("areas", this.areaChosen);
      formData.append("selectedOption", this.optionChosen);
      formData.append("catarea", this.categoriesArray);
      formData.append("profile_description", this.description);
      formData.append("extra_packages", this.extraPackagesChosen);
      formData.append("profile_approved", this.profile_approved);
      formData.append("paid_to_date", this.paid_to_date);
      formData.append("payment_expires", this.payment_expires);

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
        console.log(response)
        this.success = "You have successfully updated your profile";
        setTimeout(() => {
          this.$router.push({ name: "home" });
        }, 2000);
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
