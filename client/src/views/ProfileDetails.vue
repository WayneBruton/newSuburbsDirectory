<template>
  <v-container>
    <h1>Add / Edit profile</h1>
    <!-- <v-alert class="danger-alert"  :value="true" type="info">If you already have a profile, please login</v-alert> -->
    <v-layout xs9 column offset-xs2>
      <v-layout class="panelWidth" xs3 column justify-space-around>
        <v-flex xs3 offset-xs0>
          <v-flex>
            <br>
            <v-flex sm12 offset-xs0>
              <form enctype="multipart/form-data">
                <panel title="upload main profile image">
                  <input type="file" ref="file" @change="selectFile">
                  <br>
                  <br>
                  <v-checkbox
                    v-if="showProfileCropper"
                    v-model="showProfilePreview"
                    label="showPreview"
                    color="beige lighten-1"
                  ></v-checkbox>
                  <div>
                    <div
                      v-if="profileImg"
                      ref="holdingDivProfile"
                      id="holdingDivProfile"
                      :style="profileStyles"
                    >
                      <img :src="profileImgSRC" alt ref="profileImg" style="width: 100%">
                      <vue-draggable-resizable
                        v-if="showProfileCropper"
                        :parent="true"
                        class-name-active="my-active-class"
                        class-name="my-class"
                        :z-index="10"
                        :y="10"
                        :x="10"
                        :w="profileCropperWidth"
                        :h="profileCropperHeight"
                        @dragging="onDrag"
                        @resizing="onResize"
                        :min-width="200"
                        :min-height="125"
                        :lock-aspect-ratio="true"
                      >
                        <p>X: {{ x }} / Y: {{ y }} - Width: {{ width }} / Height: {{ height }}</p>
                      </vue-draggable-resizable>
                    </div>
                    <br>
                    <br>
                    <div>
                      <img
                        v-if="showProfilePreview"
                        :src="profileCroppedImageSRC"
                        alt
                        ref
                        style="width: 30%"
                      >
                    </div>
                  </div>
                  <br>
                </panel>
                <br>
                <!-- <v-container column justify-space-around> -->

                <!-- </v-container> -->
                <br>
                <br>

                <v-text-field
                  label="Business Name"
                  placeholder="Business Name"
                  autocomplete="false"
                ></v-text-field>
                <v-text-field label="First Name" placeholder="First Name" autocomplete="false"></v-text-field>
                <v-text-field label="Last Name" placeholder="Last Name" autocomplete="false"></v-text-field>
                <v-text-field
                  label="Contact Number"
                  placeholder="Contact Number"
                  type="number"
                  autocomplete="false"
                ></v-text-field>
                <v-text-field label="Email" placeholder="email" autocomplete="false"></v-text-field>
                <v-text-field
                  label="Website"
                  placeholder="Enter your Website URL"
                  autocomplete="false"
                ></v-text-field>
                <v-text-field
                  label="Facebook"
                  placeholder="Enter your Facebook link"
                  autocomplete="false"
                ></v-text-field>
                <v-text-field
                  label="Instagram"
                  placeholder="Enter your instagram link"
                  autocomplete="false"
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
                      :id="area.id.toString()"
                      :label="area.area_description"
                      color="beige lighten-1"
                    ></v-checkbox>
                  </li>
                </ul>
                <br>
                <hr>

                <br>
                <v-flex>
                  <v-label>Options</v-label>
                </v-flex>
                <v-flex xs12 sm6 md12 d-flex>
                  <v-select :items="items" box label="Choose your package option"></v-select>
                </v-flex>
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
                        :id="category.id.toString()"
                        :label="category.category_description"
                        color="beige lighten-1"
                      ></v-checkbox>
                    </li>
                  </ul>
                </v-flex>
                <v-textarea
                  label="Business Description"
                  required
                  placeholder="Description about 250 words"
                ></v-textarea>
                <br>
                <v-flex>
                  <v-label>Other Options</v-label>
                </v-flex>
                <v-flex>
                  <v-checkbox
                    v-model="constantia"
                    label="Constantia & Surrounds"
                    color="beige lighten-1"
                  ></v-checkbox>
                  <v-checkbox
                    v-model="adminAssist"
                    label="Admin Assistance"
                    color="beige lighten-1"
                  ></v-checkbox>
                  <v-checkbox
                    v-model="coverPhoto"
                    label="Cover Photo (monthly)"
                    color="beige lighten-1"
                  ></v-checkbox>
                </v-flex>
                <br>

                <hr>
                <br>
                <panel title="upload business image 1">
                  <!-- <input type="file" ref="file"> -->
                  <br>
                  <br>
                  <img src alt style="width: 30%;">
                </panel>
                <br>
                <div
                  ref="holdingDiv"
                  style="height: 502px; width: 100%; border: 1px solid red; position: relative; display: none;"
                >
                  <img ref="image" src alt width="100%" height>
                  <!-- <vue-draggable-resizable
                    class-name-active="my-active-class"
                    class-name="my-class"
                    :z-index="10"
                    :w="200"
                    :h="200"
                    @dragging="onDrag"
                    @resizing="onResize"
                    :lock-aspect-ratio="true"
                    :parent="true"
                  >
                    <p>
                      Hello! I'm a flexible component. You can drag me around and you can resize me.
                      <br>
                      X: {{ x }} / Y: {{ y }} - Width: {{ width }} / Height: {{ height }}
                    </p>
                  </vue-draggable-resizable>-->
                </div>
                <br>
                <panel title="upload business image 2">
                  <!-- <input type="file" ref="file"> -->
                  <br>
                  <br>
                  <img src alt style="width: 30%;">
                  <div
                    ref="holdingDiv"
                    style="height: 502px; width: 502px; border: 1px solid red; position: relative; display: none;"
                  >
                    <img ref="image" src alt width="100%" height>
                    <!-- <vue-draggable-resizable
                      class-name-active="my-active-class"
                      class-name="my-class"
                      :z-index="10"
                      :w="200"
                      :h="200"
                      @dragging="onDrag"
                      @resizing="onResize"
                      :lock-aspect-ratio="true"
                      :parent="true"
                      :resizable="true"
                    >
                      <p>
                        Hello! I'm a flexible component. You can drag me around and you can resize me.
                        <br>
                        X: {{ x }} / Y: {{ y }} - Width: {{ width }} / Height: {{ height }}
                      </p>
                    </vue-draggable-resizable>-->
                  </div>
                </panel>
                <br>
                <!-- <v-container column justify-space-around> -->

                <br>
                <panel title="upload business image 3">
                  <!-- <input type="file" ref="file"> -->
                  <br>
                  <br>
                  <img src alt style="width: 30%;">
                  <div
                    ref="holdingDiv"
                    style="height: 502px; width: 502px; border: 1px solid red; position: relative; display: none;"
                  >
                    <img ref="image" src alt width="100%" height>
                    <!-- <vue-draggable-resizable
                      class-name-active="my-active-class"
                      class-name-resizable="my-resizable-class"
                      class-name="my-class"
                      :z-index="10"
                      :resizable="true"
                      :w="200"
                      :h="200"
                      @dragging="onDrag"
                      @resizing="onResize"
                      :lock-aspect-ratio="true"
                      :parent="true"
                    >
                      <p>
                        Hello! I'm a flexible component. You can drag me around and you can resize me.
                        <br>
                        X: {{ x }} / Y: {{ y }} - Width: {{ width }} / Height: {{ height }}
                      </p>
                    </vue-draggable-resizable>-->
                  </div>
                </panel>
                <br>
                <!-- <v-container column justify-space-around> -->

                <v-btn light color="#F4EBDE">Save & return later</v-btn>
                <v-btn id="btn2" light color="#F4EBDE">Continue >></v-btn>
              </form>
            </v-flex>

            <v-alert class="danger-alert" v-if="error" :value="true" type="error">{{ error }}</v-alert>
            <v-alert class="danger-alert" v-if="success" :value="true" type="success">{{ success }}</v-alert>
          </v-flex>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
import VueDraggableResizable from "vue-draggable-resizable";

// optionally import default styles
import "vue-draggable-resizable/dist/VueDraggableResizable.css";
import DirectoryService from "@/services/DirectoryServices";
import Panel from "@/components/Panel";
// import Authenticate from "@/functions/authenticateAdmin";
export default {
  data() {
    return {
      // PROFILE IMAGE
      profileImg: null,
      profileImgSRC: null,
      profileImgfileType: null,
      profileStyles: {
        height: "100%",
        width: "100%",
        border: "1px solid yellow",
        position: "relative"
      },
      showProfileCropper: false,
      showProfilePreview: false,
      profileCropperWidth: 200,
      profileCropperHeight: 125,
      profileCroppedImageSRC: null,
      profileImageOriginalWidth: null,
      profileImageOriginalHeight: null,
      profileDivWidth: null,
      profileDivHeight: null,

      file: null,
      areas: null,
      constantia: false,
      adminAssist: false,
      coverPhoto: false,
      categories: null,
      items: ["Option1", "Option2", "Option3", "Option4", "Option5"],
      error: null,
      success: null,

      width: 0,
      height: 0,
      x: 300,
      y: 300
    };
  },
  mounted() {
    this.areas = this.$store.state.areas;
    // console.log(this.areas);
    this.categories = this.$store.state.categories;
    if (window.screen.width < 768) {
      this.profileStyles.width = "100%";
      alert("Hello");
    }
    // console.log(this.categories);
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
    // this.$nextTick(() => {
    //   this.checkImageLoaded();
    // });
  },
  components: {
    Panel,
    VueDraggableResizable
  },
  methods: {
    async selectFile() {
      this.file = this.$refs.file.files[0];
      let formData = new FormData();
      formData.append("file", this.file);
      formData.append("fileName", this.profileImg);
      console.log(formData);
      // if (this.profileImg) {
      //   try {
      //     await DirecoryService.insertPofileDraftImage({
      //       // let response = await AdminService.removeImageFileName({
      //       fileName: this.productImg
      //     });
      //   } catch (err) {
      //     console.log(err);
      //   }
      // }
      try {
        let response = await DirectoryService.insertPofileDraftImage(formData);
        this.profileImg = response.data.File.filename;
        this.profileImgSRC = response.data.imageFile;
        this.profileImgfileType = response.data.fileType;
        // console.log('image width:', this.profileImgSRC.naturalWidth)
        // console.log(response);
        console.log("Image Name = profileImg", this.profileImg);
        this.$nextTick(() => {
          this.checkImageLoaded();
        });
      } catch (err) {
        this.error = err;
        console.log(err);
      }
    },
    checkImage() {
      this.profileImageOriginalWidth = this.$refs.profileImg.naturalWidth;
      this.profileImageOriginalHeight = this.$refs.profileImg.naturalHeight;
      let widthImg = this.$refs.profileImg.naturalWidth;
      let heightImg = this.$refs.profileImg.naturalHeight;
      // console.log(
      //   "Holding Div Width",
      //   this.$refs.holdingDivProfile.clientWidth
      // );
      // console.log(
      //   "Holding Div Height",
      //   this.$refs.holdingDivProfile.clientHeight
      // );
      // console.log(
      //   "Holding Div left",
      //   this.$refs.holdingDivProfile.getBoundingClientRect().left
      // );
      // console.log(
      //   "Holding Div top",
      //   this.$refs.holdingDivProfile.getBoundingClientRect().top
      // );
      // this.x = this.$refs.holdingDivProfile.getBoundingClientRect().left
      // this.y = this.$refs.holdingDivProfile.getBoundingClientRect().top

      // console.log(this.width);
      console.log("Image Width:", widthImg);
      console.log("Image Height:", heightImg);
      // if (widthImg > heightImg) {
      this.profileStyles.width = 100 + "%";
      // this.profileStyles.height = 100 + '%'
      // console.log(this.profileStyles.height);
      this.w =
        // }
        setTimeout(() => {
          this.showProfileCropper = true;
          this.width = this.profileCropperWidth;
          this.height = this.profileCropperHeight;
          console.log("Profile Cropper Width:", this.width);
          console.log("Profile Cropper Height:", this.height);
        });
      this.profileDivWidth = this.$refs.holdingDivProfile.clientWidth;
      this.profileDivHeight = this.$refs.holdingDivProfile.clientHeight;

      console.log(
        "Holding Div Width 2",
        this.$refs.holdingDivProfile.clientWidth
      );
      console.log(
        "Holding Div Height 2",
        this.$refs.holdingDivProfile.clientHeight
      );

      // this.profileStyles.height = this.$refs.holdingDivProfile.clientWidth * .66625 + 'px'
      // this.profileStyles.height = widthImg + 'px'

      // if (widthImg > heightImg) {
      //   this.$refs.holdingDivProfile.height = heightImg;
      //   this.profileImgCropBoxW = 200;
      //   this.profileImgCropBoxH = 200;
      // }

      // setTimeout(() => {
      //   console.log("Holding Div", this.$refs.holdingDivProfile.clientHeight);
      //   console.log("Holding Div", this.$refs.holdingDivProfile.clientWidth);
      //   console.log("Image Width:", widthImg);
      //   console.log("Image Height:", heightImg);
      // }, 1500);
    },
    checkImageLoaded() {
      if (this.$refs.profileImg.complete) {
        // this.showProfileCropper = true
        this.checkImage();
      } else {
        this.$refs.profileImg.addEventListener("load", () => {
          // this.showProfileCropper = true
          this.checkImage();
        });
      }
    },

    async cropProfileImage() {
      let data = {
        imageToCrop: this.profileImg,
        originalImageWidth: this.profileImageOriginalWidth,
        originalImageHeight: this.profileImageOriginalHeight,
        divWidth: this.profileDivWidth - 2,
        divHeight: this.profileDivHeight - 2,
        cropperWidth: this.profileCropperWidth,
        cropperHeight: this.profileCropperHeight,
        cropperX: this.x, //Left
        cropperY: this.y, //Right
        imageToDelete: this.profileCroppedImageSRC
      };
      let response = await DirectoryService.cropProfileImage(data);
      console.log(response.data.data)
      this.profileCroppedImageSRC = response.data.data
      console.log('I WANT TO DELETE THIS IMAGE::',this.profileCroppedImageSRC)
    },

    onResize: function(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.profileCropperWidth = this.width,
      this.profileCropperHeight = this.height
      console.log(this.width, this.height);
      setTimeout(() => {
        this.cropProfileImage();
      }, 200);
    },
    onDrag: function(x, y) {
      this.x = x;
      this.y = y;
      this.profileCropperWidth = this.width,
      this.profileCropperHeight = this.height
      setTimeout(() => {
        this.cropProfileImage();
      }, 200);
    }
  }
};
</script>

<style scoped>
/* #holdingDivProfile {
  width: 500px;
  height: 333.125px;
  border: 1px solid black;
} */
.my-class {
  background-color: yellow;
  /* color: white; */
  opacity: 0.5;
}
.my-active-class {
  border: 1px solid black;
  -webkit-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
}

@media screen and (max-width: 768px) {
  #holdingDivProfile {
    width: 100%;
    /* height: 500px; */
  }
}
</style>
