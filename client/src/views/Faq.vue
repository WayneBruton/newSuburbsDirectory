<template>
  <v-container>
    <br><br>
    <!-- <img src="../assets/heart_PNG51352.png" alt="LOGO" style="width: 10%;" /> -->
    <img src="../assets/newLogo.png" alt="LOGO" style="width: 7.5%;">

    <v-flex xs12>
      <h1>Frequently asked questions</h1>
      <v-container>
        <br>
        <br>
        <v-layout row wrap>
          <v-flex xs12 sm8 md10 offset-md1 offset-xs0>
            <v-expansion-panel popout light>
              <v-expansion-panel-content
                v-for="(item, i) in items"
                :key="i"
                style="background-color: #F4EBDE;"
              >
                <div slot="header">{{ item.title }}</div>
                <v-card style="background-color: #F4EBDE;">
                  <v-card-text>{{ item.description }}</v-card-text>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </v-container>
</template>

<script>
import DirectoryService from "@/services/DirectoryServices";
export default {
  data() {
    return {
      items: [
        {
          title: "What is suburbs directory all about?",
          description:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita amet qui accusamus vitae iure dicta dolore, commodi ipsam, rem labore pariatur explicabo id doloremque ipsa error? Doloremque, velit? Aperiam, voluptatum!"
        },
        {
          title: "What is suburbs directory all about?",
          description:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita amet qui accusamus vitae iure dicta dolore, commodi ipsam, rem labore pariatur explicabo id doloremque ipsa error? Doloremque, velit? Aperiam, voluptatum!"
        },
        {
          title: "What is suburbs directory all about?",
          description:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita amet qui accusamus vitae iure dicta dolore, commodi ipsam, rem labore pariatur explicabo id doloremque ipsa error? Doloremque, velit? Aperiam, voluptatum!"
        },
        {
          title: "What is suburbs directory all about?",
          description:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita amet qui accusamus vitae iure dicta dolore, commodi ipsam, rem labore pariatur explicabo id doloremque ipsa error? Doloremque, velit? Aperiam, voluptatum!"
        },
        {
          title: "What is suburbs directory all about?",
          description:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita amet qui accusamus vitae iure dicta dolore, commodi ipsam, rem labore pariatur explicabo id doloremque ipsa error? Doloremque, velit? Aperiam, voluptatum!"
        }
      ]
    };
  },
  created() {
    this.loadFAQ()
  },
  methods: {
    async loadFAQ() {
      this.items = []
      let response = await DirectoryService.getFAQ();
      response.data.forEach((el) => {
        let faq = {
          title: el.title,
          description: el.faq_description
        }
        this.items.push(faq)
      })

    }
  }
};
</script>

<style scoped></style>
