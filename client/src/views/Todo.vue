<template>
  <v-layout row>
    <v-flex xs12 sm9 offset-sm1>
      <br />
      <br />
      <br />
      <br />
      <v-snackbar style="margin: 150px;" v-model="snackbar" top>
        {{ actualMessage }}
        <v-btn color="pink" text @click="snackbar = false">close</v-btn>
      </v-snackbar>

      <v-container fluid grid-list-md>
        <v-flex xs12 sm12 md12>
          title
          <v-combobox v-model="title" :items="who" label="Who has added this task?"></v-combobox>headline
          <v-text-field label="Title" outline v-model="headline"></v-text-field>
        </v-flex>
        <v-layout row wrap>
          <v-flex xs12>
            subtitle
            <v-textarea outline name="input-7-4" label="Description" v-model="subtitle"></v-textarea>
          </v-flex>
        </v-layout>
        <v-btn @click="addTask">Add Task</v-btn>
      </v-container>

      <v-card>
        <v-toolbar color="pink" dark>
          <v-toolbar-side-icon></v-toolbar-side-icon>
          <v-toolbar-title>Outstanding Issues</v-toolbar-title>
        </v-toolbar>

        <v-list three-line>
          <template v-for="(item, index) in items">
            <v-list-tile :id="item.id" :key="item.id" ripple @click="toggle(index)">
              <v-list-tile-content>
                <v-list-tile-title v-if="!item.done">{{ item.title }}</v-list-tile-title>
                <v-list-tile-title v-else style="text-decoration: line-through;">{{ item.title }}</v-list-tile-title>
                <v-list-tile-sub-title class="text--primary" v-if="!item.done">{{ item.headline }}</v-list-tile-sub-title>
                <v-list-tile-sub-title
                  class="text--primary"
                  v-else
                  style="text-decoration: line-through;"
                >{{ item.headline }}</v-list-tile-sub-title>
                <v-list-tile-sub-title v-if="!item.done">{{ item.subtitle }}</v-list-tile-sub-title>
                <v-list-tile-sub-title
                  v-else
                  style="text-decoration: line-through;"
                >{{ item.subtitle }}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-list-tile-action-text>{{ item.done }}</v-list-tile-action-text>
                <v-icon v-if="selected.indexOf(index) < 0" color="grey lighten-1">star_border</v-icon>

                <v-icon v-else color="yellow darken-2">star</v-icon>
              </v-list-tile-action>

              <v-list-tile-action :id="item.id" v-if="item.done" @click="deleteTask($event)">
                <v-list-tile-action-text>Delete</v-list-tile-action-text>
                <v-icon v-if="item.done" color="red darken-2">delete</v-icon>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider v-if="index + 1 < items.length" :key="index"></v-divider>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import DirectoryService from "@/services/DirectoryServices";
export default {
  data() {
    return {
      selected: [],
      items: [
        // {
        //   id: 1,
        //   done: false,
        //   headline: "Brunch this weekend?",
        //   title: "Ali Connors",
        //   subtitle:
        //     "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
        // },
        // {
        //   id: 2,
        //   done: false,
        //   headline: "Summer BBQ",
        //   title: "me, Scrott, Jennifer",
        //   subtitle: "Wish I could come, but I'm out of town this weekend."
        // },
        // {
        //   id: 3,
        //   done: false,
        //   headline: "Oui oui",
        //   title: "Sandra Adams",
        //   subtitle: "Do you have Paris recommendations? Have you ever been?"
        // },
        // {
        //   id: 4,
        //   done: false,
        //   headline: "Birthday gift",
        //   title: "Trevor Hansen",
        //   subtitle:
        //     "Have any ideas about what we should get Heidi for her birthday?"
        // },
        // {
        //   id: 5,
        //   done: false,
        //   headline: "Recipe to try",
        //   title: "Britta Holt",
        //   subtitle:
        //     "We should eat this: Grate, Squash, Corn, and tomatillo Tacos."
        // }
      ],
      title: "Wayne Bruton",
      who: ["Wayne Bruton", "Lisa Berg", "Nicole Berg"],
      headline: "",
      subtitle: "",
      snackbar: false,
      actualMessage: "Please fill in all details"
    };
  },
  created() {
    this.items = [];
    this.getTasks();
    // let newObject = {
    //   id: 6,
    //   done: false,
    //   headline: "Sort out issue",
    //   title: "Wayne Bruton",
    //   subtitle: "Sort out this issue finally"
    // };
    // this.items.push(newObject);
  },

  methods: {
    toggle(index) {
      const i = this.selected.indexOf(index);
      if (i > -1) {
        this.selected.splice(i, 1);
        this.items[index].done = false;
        let credentials = {
          id: this.items[index].id,
          done: this.items[index].done
        };
        DirectoryService.editTask(credentials);
      } else {
        this.selected.push(index);
        this.items[index].done = true;
        console.log(this.items[index].id);
        let credentials = {
          id: this.items[index].id,
          done: this.items[index].done
        };
        DirectoryService.editTask(credentials);
      }
      setTimeout(() => {
        this.getTasks();
        //   console.log("Hello hello guys!!!")
      }, 500);
    },
    async addTask() {
      if (this.headline === "" || this.subtitle === "") {
        this.snackbar = true;
      } else {
        let newObject = {
          done: false,
          headline: this.headline,
          title: this.title,
          subtitle: this.subtitle
        };
        this.items.push(newObject);
        await DirectoryService.addTask(newObject);
        this.headline = "";
        // this.title = "";
        this.subtitle = "";
        this.getTasks();
      }
    },
    deleteTask(event) {
      let targetID = event.currentTarget.id;
      console.log(targetID);
      DirectoryService.deleteTask(targetID);
      this.getTasks();
    },
    async getTasks() {
      let response = await DirectoryService.getTasks();
      this.items = response.data;
      console.log("Here is the data", response.data);
      this.items.forEach(el => {
        if (el.done === 1) {
          el.done = true;
        } else {
          el.done = false;
        }
      });
    }
  }
};
</script>