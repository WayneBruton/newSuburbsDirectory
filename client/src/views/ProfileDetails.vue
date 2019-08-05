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
                        @click="categoryClick"
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
                <!-- <v-textarea
                  label="Business Description"
                  required
                  placeholder="Description about 250 words"
                  v-html="description"
                ></v-textarea> -->
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
                        @click="extraPackageClick"
                      ></v-checkbox>
                    </li>
                    <v-icon @click="showDialog" style="color: red;">attach_money</v-icon>
                  </ul>
                </v-flex>
                <br />
                <hr />
                <br />
                <panel title="upload main profile image">
                  <input
                    type="file"
                    ref="file"
                    name="image"
                    accept="image/*"
                    style="font-size: 1.2em; padding: 10px 0;"
                    @change="setImage"
                  />
                  <br />
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
                  <br />
                  <br />
                  <img
                    v-if="cropImg"
                    :src="cropImg"
                    style="width: 200px; height: 150px; border: 1px solid gray"
                    alt="Cropped Image"
                  />
                  <br />
                  <br />
                  <button
                    @click.prevent="cropImage"
                    v-if="imgSrc != ''"
                    style="margin-right: 40px;"
                  >Crop</button>
                  <button @click.prevent="rotate" v-if="imgSrc != ''">Rotate</button>
                  <br />
                </panel>
                <br />
                <panel title="upload business image 1">
                  <br />
                  <input
                    type="file"
                    ref="file1"
                    name="image"
                    accept="image/*"
                    style="font-size: 1.2em; padding: 10px 0;"
                    @change="setImage1"
                  />
                  <br />
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
                  <br />
                  <br />
                  <img
                    v-if="cropImg1"
                    :src="cropImg1"
                    style="width: 200px; height: 150px; border: 1px solid gray"
                    alt="Cropped Image"
                  />
                  <br />
                  <br />
                  <button
                    @click.prevent="cropImage1"
                    v-if="imgSrc != ''"
                    style="margin-right: 40px;"
                  >Crop</button>
                  <button @click.prevent="rotate1" v-if="imgSrc1 != ''">Rotate</button>
                  <br />
                  <br />
                </panel>
                <br />
                <panel title="upload business image 2">
                  <br />
                  <input
                    type="file"
                    ref="file2"
                    name="image"
                    accept="image/*"
                    style="font-size: 1.2em; padding: 10px 0;"
                    @change="setImage2"
                  />
                  <br />
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
                  <br />
                  <br />
                  <img
                    v-if="cropImg2"
                    :src="cropImg2"
                    style="width: 200px; height: 150px; border: 1px solid gray"
                    alt="Cropped Image"
                  />
                  <br />
                  <br />
                  <button
                    @click.prevent="cropImage2"
                    v-if="imgSrc != ''"
                    style="margin-right: 40px;"
                  >Crop</button>
                  <button @click.prevent="rotate2" v-if="imgSrc2 != ''">Rotate</button>
                  <br />
                </panel>
                <br />
                <panel title="upload business image 3">
                  <br />
                  <input
                    type="file"
                    ref="file3"
                    name="image"
                    accept="image/*"
                    style="font-size: 1.2em; padding: 10px 0;"
                    @change="setImage3"
                  />
                  <br />
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
                  <br />
                  <br />
                  <img
                    v-if="cropImg3"
                    :src="cropImg3"
                    style="width: 200px; height: 150px; border: 1px solid gray"
                    alt="Cropped Image"
                  />
                  <br />
                  <br />
                  <button
                    @click.prevent="cropImage3"
                    v-if="imgSrc3 != ''"
                    style="margin-right: 40px;"
                  >Crop</button>
                  <button @click.prevent="rotate" v-if="imgSrc3 != ''">Rotate</button>
                  <br />
                  <br />
                </panel>
                <br />
                <!-- <v-icon @click="dialog = true">home</v-icon> -->
                <v-layout row justify-center>
                  <v-dialog v-model="dialog" max-width="600px">
                    <template v-slot:activator="{ on }"></template>
                    <v-card>
                      <!-- <v-card-title>
                        <span class="headline">Your Costs</span>
                      </v-card-title> -->
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
                                  :value="'R' + (areaCost * 12 * .8).toFixed(2)"
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
                                  :value="'R' + (extraPackage1Cost * 12 * .8).toFixed(2)"
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
                                  :value="'R' + (extraPackage3Cost * 12 * .8).toFixed(2)"
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
                                  :value="'R' + (areaCost + extraPackage1Cost + extraPackage2Cost + extraPackage3Cost).toFixed(2)"
                                  readonly
                                ></v-text-field>
                                <v-text-field
                                  class="text-xs-right"
                                  label="Annual"
                                  required
                                  :value="'R' + (((extraPackage1Cost + areaCost + extraPackage3Cost) * 12 * .8)+(extraPackage2Cost * 12)).toFixed(2)"
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
                                   :value="'R' + (areaCost + extraPackage1Cost + extraPackage2Cost + extraPackage3Cost).toFixed(2)"
                                  readonly
                                ></v-text-field>
                                </div>
                                <div v-if="radios == 'radio-2'">
                                <v-text-field
                                  class="text-xs-right"
                                  required
                                  :value="'R' + (((extraPackage1Cost + areaCost + extraPackage3Cost) * 12 * .8)+(extraPackage2Cost * 12)).toFixed(2)"
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
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-layout>

                <!-- <v-btn light color="#F4EBDE">Save & return later</v-btn> -->
                <v-btn id="btn2" light color="#F4EBDE" @click="save" v-if="!saved">Join Us</v-btn>
                <v-icon @click="showDialog" style="color: red;">attach_money</v-icon>
                <div style="display: flex; justify-content: center;" v-if="minimumRequirements">
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
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
import DirectoryService from "@/services/DirectoryServices";
import Panel from "@/components/Panel";
import { VueEditor } from "vue2-editor";

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
      areaCost: 0,

      categories: [],
      categoriesArray: [],

      extraPackages: [],
      extraPackagesChosen: [],
      extraPackage1Cost: 0,
      extraPackage2Cost: 0,
      extraPackage3Cost: 0,

      email: "1@2",
      password: "12345",
      repeatPassword: "12345",
      businessName: "Bobs little Business",
      firstName: "Wayne",
      lastName: "Bruton",
      contactNumber: "123456",
      website: "myWebsite",
      faceBook: "myFaceBook",
      instagram: "myInstagram",
      description: "My Test Description's Hello",

      error: null,
      success: null,

      minimumRequirements: false,
      saved: false,

      dialog: false,

      radios: 'radio-1',
      amountToPay: 0,
      payMonthly: true,

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
    console.log(this.extraPackages);
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
    VueCropper,
    VueEditor
  },
  watch: {
    description(newVal, oldVal) {
      let newContent = this.description;
      newContent = newContent.replace(/"/g, "'");
      this.description = newContent;
      console.log(this.description)
    }
  },
  methods: {
    showDialog() {
      this.dialog = true
      this.amountToPay = (this.areaCost + this.extraPackage1Cost + this.extraPackage2Cost + this.extraPackage3Cost).toFixed(2)
      console.log(this.amountToPay)
    },
    optionChange() {
      
      if (this.radios == 'radio-1') {
        this.payMonthly = !this.payMonthly
      } else if (this.radios == 'radio-2') {
        this.payMonthly = !this.payMonthly
      }
      if (this.payMonthly === true) {
        this.amountToPay = (this.areaCost + this.extraPackage1Cost + this.extraPackage2Cost + this.extraPackage3Cost).toFixed(2)
      console.log(this.payMonthly)
      console.log(this.amountToPay)
      } else {
        this.amountToPay = (((this.extraPackage1Cost + this.areaCost + this.extraPackage3Cost) * 12 * .8)+(this.extraPackage2Cost * 12)).toFixed(2)
      console.log(this.payMonthly)
      console.log(this.amountToPay)
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
        this.minimumRequirements = true;
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
        this.saved = true;
        
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
