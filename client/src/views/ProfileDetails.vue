<template>
  <v-container>
    <img src="../assets/newLogo.png" alt="LOGO" style="width: 7.5%;" />
    <h1>Add profile</h1>
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
                  @change="checkEmail"
                  @blur="checkEmail"
                  v-model="email"
                ></v-text-field>
                <v-text-field
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
                  placeholder="www."
                  autocomplete="false"
                  v-model="website"
                ></v-text-field>
                <v-text-field
                  label="Facebook"
                  placeholder="Copy & paste your Facebook link"
                  autocomplete="false"
                  v-model="faceBook"
                ></v-text-field>
                <v-text-field
                  label="Instagram"
                  placeholder="Copy & paste your instagram link"
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
                      @change="areaClick"
                      v-model="area.areaChosen"
                      :id="area.id.toString()"
                      :label="area.area_description"
                      color="beige lighten-1"
                      v-tooltip.top-start="'Dont forget to choose your package option below'"
                    ></v-checkbox>
                  </li>
                  <v-icon @click="showDialog" style="color: red;">attach_money</v-icon>
                </ul>

                <br />
                <hr />
                <br />
                <div v-if="areasArray.length">
                  <v-flex>
                    <v-label>Options</v-label>
                  </v-flex>
                  <br />
                  <v-flex xs12 sm6 md12 d-flex>
                    <v-select
                      v-model="selectedOption"
                      @change="selectedOpt"
                      :items="items"
                      box
                      label="Choose your package option"
                      background-color="orange"
                    ></v-select>
                    <!-- <v-select :items="item.option_description" box label="Choose your package option"></v-select> -->
                  </v-flex>
                </div>
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
                        @change="categoryClick"
                      ></v-checkbox>
                    </li>
                  </ul>
                </v-flex>
                <br />
                <br />
                <div id="app">
                  <v-label>Business Description</v-label>
                  <vue-editor v-model="description" :editorToolbar="customToolbar"></vue-editor>
                  <br />
                  <div v-if="description" v-html="description" style="border: 1px solid lightgrey"></div>
                  <p v-html="description"></p>
                </div>
                <br />
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
                        @change="extraPackageClick"
                      ></v-checkbox>
                    </li>
                    <v-icon @click="showDialog" style="color: red;">attach_money</v-icon>
                  </ul>
                </v-flex>
                <br />
                <hr />
                <br />
                <panel title="upload main profile image">
                  <br />
                  <ImageUpload></ImageUpload>
                  <v-btn @click="uploadProfileImage">Choose</v-btn>
                </panel>
                <br />
                <panel title="upload business image 1">
                  <br />
                  <ImageUpload></ImageUpload>
                  <v-btn @click="uploadImage1">Choose</v-btn>
                </panel>
                <br />
                <panel title="upload business image 2">
                  <br />
                  <ImageUpload></ImageUpload>
                  <v-btn @click="uploadImage2">Choose</v-btn>
                </panel>
                <br />
                <panel title="upload business image 3">
                  <br />
                  <ImageUpload></ImageUpload>
                  <v-btn @click="uploadImage3">Choose</v-btn>
                </panel>
                <br />
                <v-layout row justify-center>
                  <v-dialog v-model="dialog" max-width="600px">
                    <template v-slot:activator="{ on }"></template>
                    <v-card>
                      <v-card-text>
                        <p>
                          <small>
                            <strong>These change as you add or remove choices.</strong>
                          </small>
                        </p>
                        <v-container grid-list-md>
                          <v-layout wrap>
                            <v-flex xs12 sm8 md8 offset-md2>
                              <v-layout row justify-center>
                                <v-text-field
                                  label="Areas"
                                  required
                                  :value="areasArray.length"
                                  readonly
                                ></v-text-field>
                                <v-text-field
                                  class="text-xs-right"
                                  label="Monthly"
                                  required
                                  :value="'R' + areaCost.toFixed(2)"
                                  readonly
                                  text-align-right
                                ></v-text-field>
                                <v-text-field
                                  class="text-xs-right"
                                  label="Annual"
                                  required
                                  :value="'R' + (areaCost * 12 * .9).toFixed(2)"
                                  readonly
                                ></v-text-field>
                              </v-layout>
                              <v-layout row justify-center>
                                <v-text-field label="Constantia" required value readonly></v-text-field>
                                <v-text-field
                                  class="text-xs-right"
                                  label="Monthly"
                                  required
                                  :value="'R' + extraPackage1Cost.toFixed(2)"
                                  readonly
                                  right
                                ></v-text-field>
                                <v-text-field
                                  class="text-xs-right"
                                  label="Annual"
                                  required
                                  :value="'R' + (extraPackage1Cost * 12 * .9).toFixed(2)"
                                  readonly
                                ></v-text-field>
                              </v-layout>
                              <v-layout row justify-center>
                                <v-text-field label="Admin Assist" required value readonly></v-text-field>
                                <v-text-field
                                  class="text-xs-right"
                                  label="Monthly"
                                  required
                                  :value="'R' + extraPackage2Cost.toFixed(2)"
                                  readonly
                                ></v-text-field>
                                <v-text-field
                                  class="text-xs-right"
                                  label="Annual"
                                  required
                                  :value="'R' + (extraPackage2Cost * 12).toFixed(2)"
                                  readonly
                                ></v-text-field>
                              </v-layout>
                              <v-layout row justify-center>
                                <v-text-field label="Cover Photo" required value readonly></v-text-field>
                                <v-text-field
                                  class="text-xs-right"
                                  label="Monthly"
                                  required
                                  :value="'R' + extraPackage3Cost.toFixed(2)"
                                  readonly
                                ></v-text-field>
                                <v-text-field
                                  class="text-xs-right"
                                  label="Annual"
                                  required
                                  :value="'R' + (extraPackage3Cost * 12 * .9).toFixed(2)"
                                  readonly
                                ></v-text-field>
                              </v-layout>
                              <v-layout row justify-center>
                                <v-text-field label="Bishops Court" required value readonly></v-text-field>
                                <v-text-field
                                  class="text-xs-right"
                                  label="Monthly"
                                  required
                                  :value="'R' + extraPackage4Cost.toFixed(2)"
                                  readonly
                                ></v-text-field>
                                <v-text-field
                                  class="text-xs-right"
                                  label="Annual"
                                  required
                                  :value="'R' + (extraPackage4Cost * 12 * 1).toFixed(2)"
                                  readonly
                                ></v-text-field>
                              </v-layout>
                              <v-layout row justify-center>
                                <v-text-field label="Claremont" required value readonly></v-text-field>
                                <v-text-field
                                  class="text-xs-right"
                                  label="Monthly"
                                  required
                                  :value="'R' + extraPackage5Cost.toFixed(2)"
                                  readonly
                                ></v-text-field>
                                <v-text-field
                                  class="text-xs-right"
                                  label="Annual"
                                  required
                                  :value="'R' + (extraPackage5Cost * 12 * 1).toFixed(2)"
                                  readonly
                                ></v-text-field>
                              </v-layout>
                              <v-layout row justify-center>
                                <v-text-field
                                  label="Total"
                                  required
                                  value
                                  style="font-style: bold; color: red;"
                                  readonly
                                ></v-text-field>
                                <v-text-field
                                  class="text-xs-right"
                                  label="Monthly"
                                  required
                                  :value="'R' + (areaCost + extraPackage1Cost + extraPackage2Cost + extraPackage3Cost + extraPackage4Cost + extraPackage5Cost).toFixed(2)"
                                  readonly
                                ></v-text-field>
                                <v-text-field
                                  class="text-xs-right"
                                  label="Annual"
                                  required
                                  :value="'R' + (((extraPackage1Cost + areaCost + extraPackage3Cost) * 12 * .9)+((extraPackage2Cost + extraPackage4Cost + extraPackage5Cost) * 12)).toFixed(2)"
                                  readonly
                                ></v-text-field>
                              </v-layout>
                              <v-container>
                                <!-- <v-flex> -->
                                <v-radio-group v-model="radios" row space-evenly>
                                  <v-radio value="radio-1" label="Monthly" @change="optionChange"></v-radio>
                                  <v-radio value="radio-2" label="Annual" @change="optionChange"></v-radio>
                                </v-radio-group>
                                <div v-if="radios == 'radio-1'">
                                  <v-text-field
                                    class="text-xs-right"
                                    required
                                    :value="'R' + (areaCost + extraPackage1Cost + extraPackage2Cost + extraPackage3Cost + extraPackage4Cost + extraPackage5Cost).toFixed(2)"
                                    readonly
                                  ></v-text-field>
                                </div>
                                <div v-if="radios == 'radio-2'">
                                  <v-text-field
                                    class="text-xs-right"
                                    required
                                    :value="'R' + (((extraPackage1Cost + areaCost + extraPackage3Cost) * 12 * .9)+((extraPackage2Cost + extraPackage4Cost + extraPackage5Cost) * 12)).toFixed(2)"
                                    readonly
                                  ></v-text-field>
                                </div>
                                <!-- </v-flex> -->
                              </v-container>
                            </v-flex>
                          </v-layout>
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="orange darken-1" flat @click="dialog = false">Close</v-btn>
                        <!-- <v-btn color="blue darken-1" flat @click="dialog = false">Save</v-btn> -->

                        <div
                          style="display: flex; justify-content: center;"
                          v-if="minimumRequirements"
                        >
                          <form
                            action="https://www.payfast.co.za/eng/process"
                            name="form_6bad5ca80c7f0692985e881b8dc9d22c"
                            onsubmit="return click_6bad5ca80c7f0692985e881b8dc9d22c( this );"
                            method="post"
                          >
                            <input type="hidden" name="cmd" value="_paynow" />
                            <input type="hidden" name="receiver" value="14103754" />
                            <input
                              type="hidden"
                              name="item_name"
                              value="Suburbs Directory Subscription"
                            />
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
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-layout>

                <!-- <v-btn light color="#F4EBDE">Save & return later</v-btn> -->
                <v-btn id="btn2" light color="#F4EBDE" @click="save" v-if="!saved">Join Us</v-btn>
                <v-icon @click="showDialog" style="color: red;">attach_money</v-icon>
                <!-- <div style="display: flex; justify-content: center;" v-if="minimumRequirements">
                  <form
                    action="https://www.payfast.co.za/eng/process"
                    name="form_ad990b487f6e182cd44e0c189204bb70"
                    onsubmit="return click_ad990b487f6e182cd44e0c189204bb70( this );"
                    method="post"
                  >
                    <input type="hidden" name="cmd" value="_paynow" />
                    <input type="hidden" name="receiver" value="10469596" />
                    <input type="hidden" name="item_name" value="Suburbs Directory Subscription" />
                    <input type="hidden" name="amount" value="95.99" />
                    <input type="hidden" name="item_description" value />
                    <input type="hidden" name="return_url" value="https://www.eccentrictoad.com" />
                    <input type="hidden" name="cancel_url" value="https://www.eccentrictoad.com" />

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
                </div>-->
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
      cropImg: "",
      cropImg1: "",
      cropImg2: "",
      cropImg3: "",

      areas: [],
      areasArray: [],
      packages: null,
      items: [],
      selectedOption: "",
      optionChosen: "",
      areaCost: 0,

      categories: [],
      categoriesArray: [],

      extraPackages: [],
      extraPackagesChosen: [],
      extraPackage1Cost: 0,
      extraPackage2Cost: 0,
      extraPackage3Cost: 0,
      extraPackage4Cost: 0,
      extraPackage5Cost: 0,

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
      success: null,

      minimumRequirements: false,
      saved: false,

      dialog: false,

      radios: "radio-1",
      amountToPay: 0,
      payMonthly: true,

      cancel_url: "",
      success_url: "",

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
    this.areas = this.$store.state.areas;

    this.areas.forEach(el => {
      el.areaChosen = false;
    });
    console.log(this.areas);
    this.categories = this.$store.state.categories;

    this.categories.forEach(el => {
      el.categoryChosen = false;
    });
    console.log(this.categories);

    let response = await DirectoryService.getExtraPackages();
    // console.log("Extra Packages:", response.data)
    this.extraPackages = response.data;
    this.extraPackages.forEach(el => {
      el.extraPackagesChosen = false;
    });
    console.log("THESE ARE THE EXTRA PACKAGES", this.extraPackages);
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
      console.log(this.description);
    }
  },
  methods: {
    //if this.saved === true
    async calculateURLS() {
      let profileID;
      if (!this.$store.state.profile) {
        profileID = 276;
      } else {
        profileID = this.$store.state.profile;
      }
      let dateNow = new Date()
      console.log("DateNow",dateNow)
      let credentials = {
        monthly: this.payMonthly,
        amount: this.amountToPay,
        profileID: profileID,
        dateNow: dateNow
      };
      let response = await DirectoryService.payURL(credentials);
      console.log(response.data);

      let success = process.env.VUE_APP_SUCCESSURL;
      let cancel = process.env.VUE_APP_CANCELURL;
      this.success_url = `${success}${response.data}`;
      this.cancel_url = `${cancel}${response.data}`;
      console.log(this.success_url);
      console.log(this.cancel_url);
    },
    showDialog() {
      this.dialog = true;
      this.amountToPay = (
        this.areaCost +
        this.extraPackage1Cost +
        this.extraPackage2Cost +
        this.extraPackage3Cost
      ).toFixed(2);
      this.calculateURLS();
      console.log("This is the amount to pay", this.amountToPay);
    },
    uploadProfileImage() {
      this.cropImg = this.$store.state.uploadedImage;
    },
    uploadImage1() {
      this.cropImg1 = this.$store.state.uploadedImage;
    },
    uploadImage2() {
      this.cropImg2 = this.$store.state.uploadedImage;
    },
    uploadImage3() {
      this.cropImg3 = this.$store.state.uploadedImage;
    },
    optionChange() {
      if (this.radios == "radio-1") {
        this.payMonthly = !this.payMonthly;
      } else if (this.radios == "radio-2") {
        this.payMonthly = !this.payMonthly;
      }
      if (this.payMonthly === true) {
        this.amountToPay = (
          this.areaCost +
          this.extraPackage1Cost +
          this.extraPackage2Cost +
          this.extraPackage3Cost
        ).toFixed(2);
        this.calculateURLS();
        console.log(this.payMonthly);
        console.log("This is the amount to Pay", this.amountToPay);
      } else {
        this.amountToPay = (
          (this.extraPackage1Cost + this.areaCost + this.extraPackage3Cost) *
            12 *
            0.8 +
          this.extraPackage2Cost * 12
        ).toFixed(2);
        this.calculateURLS();
        console.log(this.payMonthly);
        console.log("This is the amount to Pay", this.amountToPay);
        // console.log(this.amountToPay);
      }
    },

    async areaClick() {
      this.areasArray = [];
      this.areaCost = 0;
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
      this.selectedOption = "";
      this.optionChosen = "";
      let response = await DirectoryService.getPackages(numberOfSuburbs);
      console.log("PACKAGES ARE HERE", response.data);
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
      this.extraPackage1Cost = 0;
      this.extraPackage2Cost = 0;
      this.extraPackage3Cost = 0;
      this.extraPackage4Cost = 0;
      this.extraPackage5Cost = 0;
      let extraPackagesCount = this.extraPackages.filter(el => {
        if (el.extraPackagesChosen === true) {
          this.extraPackagesChosen.push(el.id);
        }
        return el.extraPackagesChosen === true;
      });

      console.log(extraPackagesCount);
      // categoryCount = []
      console.log("This.extraPackagesChosen", this.extraPackagesChosen);
      if (this.extraPackagesChosen.includes(1)) {
        this.extraPackage1Cost = 25;
      }
      if (this.extraPackagesChosen.includes(2)) {
        this.extraPackage2Cost = 80;
      }
      if (this.extraPackagesChosen.includes(3)) {
        this.extraPackage3Cost = 1200;
      }
      if (this.extraPackagesChosen.includes(4)) {
        this.extraPackage4Cost = 25;
      }
      if (this.extraPackagesChosen.includes(5)) {
        this.extraPackage5Cost = 25;
      }
    },
    selectedOpt() {
      console.log("TESTING", this.selectedOption);
      let packageChosen = this.packages.filter(el => {
        if (el.option_description === this.selectedOption) {
          return el.id;
        }
      });

      console.log("Package Chosen", packageChosen);
      this.optionChosen = packageChosen[0].id;
      this.areaCost = packageChosen[0].per_month;
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
        this.minimumRequirements = true;
        let response = await DirectoryService.addProfile(formData);
        // console.log(response.data);
        let token = response.data.token;
        let user = response.data.user;
        // console.log(token);
        // console.log(user);
        this.$store.dispatch("setToken", token);
        this.$store.dispatch("setUser", user);
        // console.log(this.$store.state.userName);
        // console.log(this.$store.state.email);
        this.saved = true;
        this.dialog = true;
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
</style>
