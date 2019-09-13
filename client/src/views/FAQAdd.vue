<template>
  <v-container>
    <!-- <img src="../assets/heart_PNG51352.png" alt="LOGO" style="width: 10%;" /> -->
    <img src="../assets/newLogo.png" alt="LOGO" style="width: 7.5%;" />

    <v-flex xs12>
      <h1>Add FAQ</h1>
      <v-container xs12>
        <br />
        <v-flex xs12 md12>
          <!-- <v-col cols="12" sm="6"> -->
            <v-text-field
              background-color="grey lighten-2"
              color="black"
              label="Title"
              placeholder="Enter Title"
              outlined
              v-model="title"
            ></v-text-field>
          <!-- </v-col> -->
          <br />
          <br />
          <!-- <v-col cols="12" md="6"> -->
            <v-textarea
              outlined
              background-color="grey lighten-2"
              color="black"
              name="input-7-4"
              label="Details"
              placeholder="Enter Description"
              v-model="description"
            ></v-textarea>
          <!-- </v-col> -->
          <v-btn @click="addFAQ">Add FAQ</v-btn>
        </v-flex>
        <v-snackbar style="margin: 250px;" v-model="snackbar">
          {{ snackBarMessage }}
          <v-btn color="pink" text @click="snackbar = false">close</v-btn>
        </v-snackbar>
        <br />
        <hr />
        <br />
        <v-flex xs12 md12>
          <v-expansion-panel popout light>
            <v-expansion-panel-content
              v-for="(faq, i) in faqs"
              :key="i"
              style="background-color: #F4EBDE;"
            >
              <div slot="header">{{ faq.title }}</div>
              <v-card style="background-color: #F4EBDE;">
                <v-card-text>{{ faq.description }}</v-card-text>
              </v-card>
              <v-btn :id="faq.id" @click="deleteFAQ($event)">Delete {{ faq.id }}</v-btn>
              <!-- @click="deleteNotice($event)" -->
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-flex>
      </v-container>
    </v-flex>
  </v-container>
</template>

<script>
import DirectoryService from "@/services/DirectoryServices";
export default {
  data() {
    return {
      faqs: [
        {
          id: 1,
          title: "What is suburbs directory all about?",
          description:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita amet qui accusamus vitae iure dicta dolore, commodi ipsam, rem labore pariatur explicabo id doloremque ipsa error? Doloremque, velit? Aperiam, voluptatum!"
        },
        {
          id: 2,
          title: "How do I pay?",
          description:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita amet qui accusamus vitae iure dicta dolore, commodi ipsam, rem labore pariatur explicabo id doloremque ipsa error? Doloremque, velit? Aperiam, voluptatum!"
        }
      ],
      title: "",
      description: "",
      snackbar: false,
      snackBarMessage: "Both title and description are required."
    };
  },
  created() {
    this.loadFAQ();
  },
  watch: {
    // htmlForEditor(newVal, oldVal) {
    description() {
      let newContent = this.description;
      newContent = newContent.replace(/"/g, "'");
      this.description = newContent;
      console.log(this.description);
    }
  },
  methods: {
    async loadFAQ() {
      this.faqs = []
      let response = await DirectoryService.getFAQ();
      response.data.forEach((el) => {
        let faq = {
          id: el.id,
          title: el.title,
          description: el.faq_description
        }
        this.faqs.push(faq)
      })

    },
    deleteFAQ: function(event) {
      let targetID = event.currentTarget.id;
      let credentials = {
        id: targetID
      };
      DirectoryService.deleteFAQ(credentials)
        .then(response => {
          console.log(response.data);
          this.loadFAQ();
        })
        .catch(e => {
          console.log(e);
        })
    },
    async addFAQ() {
      let credentials = {
        title: this.title,
        description: this.description
      }
      if (this.title == "" || this.description == "") {
        this.snackbar = true;
      } else {
        let response = await DirectoryService.addFAQ(credentials)
        console.log(response.data)
        this.loadFAQ()
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