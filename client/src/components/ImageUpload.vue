<template>
  <div>
    <input
      type="file"
      ref="file"
      name="image"
      accept="image/*"
      style="font-size: 1.2em; padding: 10px 0;"
      @change="setImage"
    />
    <br />
    <div class="imageDiv" v-if="showImage">
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
    <button @click.prevent="cropImage" v-if="imgSrc != ''" style="margin-right: 40px;">Crop</button>
    <button @click.prevent="rotate" v-if="imgSrc != ''">Rotate</button>
    <br />
    <br />
  </div>
</template>

<script>
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
// import ImageUpload from "@/components/ImageUpload";
export default {
    name: "ImageUpload",
  data() {
    return {
      imgSrc: "",
      cropImg: "",
      showImage: false
    };
  },
  components: {
      VueCropper
    //   ImageUpload
  },
  methods: {
      setImage(e) {
    this.showImage = true
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
          this.uploadImage()
        };
        reader.readAsDataURL(file);
        
      } else {
        alert("Sorry, FileReader API not supported");
      }
    },
    cropImage() {
      // get image data for post processing, e.g. upload or setting image src
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
      this.uploadImage()
    },
    rotate() {
      // guess what this does :)
      this.$refs.cropper.rotate(90);
    },
    uploadImage() {
        this.$store.dispatch("setUploadedImage", this.cropImg);
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
    width: 90%;
  }
}
</style>