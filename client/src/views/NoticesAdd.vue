<template>
  <v-container>
    <!-- <img src="../assets/heart_PNG51352.png" alt="LOGO" style="width: 10%;" /> -->
    <img src="../assets/newLogo.png" alt="LOGO" style="width: 7.5%;" />
    <v-flex xs12>
      <h1>Add Notice</h1>
      <v-container xs12>
        <br />
        <br />
        <br />
        <v-snackbar style="margin: 250px;" v-model="snackbar">
          {{ snackBarMessage }}
          <v-btn color="pink" text @click="snackbar = false">close</v-btn>
        </v-snackbar>
        <v-flex xs12 md12>
          <!-- <input type="text" placeholder="Notice Title Here" style="width: 100%; font-size: 120%;"> -->
          <v-text-field label="Title" placeholder="title" v-model="title" outline></v-text-field>
          <br />
          <!-- <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor> -->
          <br />
          <!-- <vue-editor
            id="editor"
            useCustomImageHandler
            @imageAdded="handleImageAdded"
            v-model="htmlForEditor"
          ></vue-editor>-->
          <!-- <vue-editor v-model="content" :editorToolbar="customToolbar" @change="test"></vue-editor> -->
          <!-- :editorToolbar="customToolbar" -->
          <vue-editor
            id="editor"
            useCustomImageHandler
            @image-added="handleImageAdded"
            v-model="htmlForEditor"
          ></vue-editor>
          <br />
          <br />
          <v-btn @click="postNotice" color="success">Load Notice</v-btn>
          <br />
          <br />
          <!-- <hr> -->
          <div v-if="notices">
            <!-- <hr> -->
            <br />
            <div v-for="notice in notices" :key="notice.id">
              <div style="border: 1px solid black; padding: 5rem;">
                <div style="width: 100%; text-align: center; font-size: 40px;">{{notice.heading}}</div>
                <br />
                <br />
                <div
                  style="width: 100%; text-align: center;font-size: 20px;"
                  v-html="notice.notice_text"
                ></div>
                <!-- <hr> -->
                <v-btn
                  :id="notice.id"
                  @click="deleteNotice($event)"
                  color="error"
                >Delete Notice {{ notice.id }}</v-btn>
              </div>
            </div>
          </div>
        </v-flex>
        <!-- <div
          v-if="htmlForEditor"
          v-html="htmlForEditor"
          style="border: 1px solid lightgrey; font-size: 120%;"
        ></div>-->
      </v-container>
    </v-flex>
  </v-container>
</template>

<script>
import DirectoryService from "@/services/DirectoryServices";
import { VueEditor } from "vue2-editor";
import axios from "axios";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export default {
  data() {
    return {
      title: "",
      htmlForEditor: "",
      customToolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["image"]
      ],
      notices: [],
      snackbar: false,
      snackBarMessage: ""

      // editor: ClassicEditor,
      // editorData: "<p>Rich-text editor content.</p>",
      // editorConfig: {
      //   // The configuration of the rich-text editor.
      // }
    };
  },
  components: {
    VueEditor
  },
  created() {
    // let response = await DirectoryService.getNotices();
    // this.notices = response.data;
    // console.log(this.notices);
    this.loadNotices();
  },
  watch: {
    // htmlForEditor(newVal, oldVal) {
    htmlForEditor() {
      let newContent = this.htmlForEditor;
      newContent = newContent.replace(/"/g, "'");
      this.htmlForEditor = newContent;
      console.log(this.htmlForEditor);
    }
  },
  methods: {
    deleteNotice: function(event) {
      let targetID = event.currentTarget.id;
      let credentials = {
        id: targetID
      };
      DirectoryService.deleteNotices(credentials)
        .then(response => {
          console.log(response.data);
          this.loadNotices();
        })
        .catch(e => {
          console.log(e);
        });
      // console.log(targetID)
    },
    async loadNotices() {
      let response = await DirectoryService.getNotices();
      this.notices = response.data;
      console.log(this.notices);
      this.notices.forEach(el => {
        el.notice_text = el.notice_text.replace(
          /<img/g,
          '<img style="border: 2px solid grey; width: 100%; border-radius: 7px; " '
        );
        el.notice_text = el.notice_text.replace(
          /<li/g,
          '<li style="border: 1px solid grey; margin: 4px 0; background-color: lightgrey;" '
        );
      });
    },
    // handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
    //   var formData = new FormData();
    //   formData.append("image", file);
    //   console.log("This is the formData",formData)
    //   let url;
    //   DirectoryService.addNoticeImage(formData)
    //     .then(response => {
    //       url = response.data.url;
    //       console.log(url);
    //       Editor.insertEmbed(cursorLocation, "image", url);
    //       resetUploader();
    //     })
    //     .catch(err => {
    //       console.log("Error Here!!!", err);
    //     });
    // },
    handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)

      var formData = new FormData();
      formData.append("image", file);
      console.log(formData);
      console.log("Testing");

      axios({
        url: "http://localhost:3000/addNoticeImage",
        method: "POST",
        data: formData
      })
        .then(result => {
          let url = result.data.url; // Get url from response
          Editor.insertEmbed(cursorLocation, "image", url);
          resetUploader();
        })
        .catch(err => {
          console.log(err);
        });
    },
    postNotice() {
      let credentials = {
        heading: this.title,
        notice_text: this.htmlForEditor
      };
      if (this.title == "") {
        this.snackBarMessage = "Your notice must have a title";
        this.snackbar = true;
      } else if (this.htmlForEditor == "") {
        this.snackBarMessage = "Your notice has no content?";
        this.snackbar = true;
      } else {
        DirectoryService.postNotice(credentials)
          .then(response => {
            console.log(response.data.result);
            this.loadNotices();
            this.htmlForEditor = "";
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
};
</script>

<style scoped>
li:nth-child(even) {
  background-color: grey;
}
</style>