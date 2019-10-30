<template>
  <v-container style="background-color: transparant;">
    <br />
    <br />
    <!-- <img src="../assets/heart_PNG51352.png" alt="LOGO" style="width: 10%;" /> -->
    <img src="../assets/newLogo.png" alt="LOGO" style="width: 7.5%;" />

    <v-flex xs12 md12 sm12 ma-0 justify-start>
      <h1>Package Options</h1>
      <v-container fluid xs12 md12 sm12 column justify-center>
        <br />
        <v-layout fluid xs12 v-resize="onResize" ma-0 style="padding-top:15px; width: 100%">
          <v-data-table
            :headers="headers"
            :loading="false"
            :items="packages"
            class="elevation-5"
            :hide-headers="isMobile"
            :class="{ mobile: isMobile }"
            xs12
          >
            <!-- <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear> -->
            <template v-slot:items="props">
              <tr v-if="!isMobile">
                <td class="text-xs-left" width="30%">{{ props.item.name }}</td>
                <td class="text-xs-left">{{ props.item.details }}</td>
                <td class="text-xs-right">R{{ props.item.monthly.toFixed(2) }}</td>
                <td class="text-xs-right">R{{ props.item.annual.toFixed(2) }}</td>
                <td class="text-xs-right">{{ props.item.discount }}</td>
              </tr>
              <tr v-else>
                <ul>
                  <li class="flex-item" data-label="Package">
                    <label for style="font-weight: bold;">Package :</label>
                    {{ props.item.name }}
                  </li>
                  <li class="flex-item" data-label="Details">
                    <label for>Details :</label>
                    {{ props.item.details }}
                  </li>
                  <li class="flex-item" data-label="Monthly (R)">
                    <label for>Monthly :</label>
                    R {{ parseFloat(props.item.monthly).toFixed(2) }}
                  </li>
                  <li class="flex-item" data-label="Annual (R)">
                    <label for>Annual :</label>
                    R {{ parseFloat(props.item.annual).toFixed(2) }}
                  </li>
                  <li class="flex-item" data-label="Discount">
                    <label for>Discount :</label>
                    {{ parseFloat(props.item.discount) }}%
                  </li>
                </ul>
              </tr>
            </template>
          </v-data-table>
        </v-layout>
        <br />
        <br />
        <v-flex xs12 sm8 md10 offset-md1>
          <p>
            * We offer a 10% discount if you pay upfront for the year.
            This does not apply to admin assist.
            <br />* If you would like to advertise for 1 month only please
            contact us to discuss our once off advertising fee.
            <br />* Please note that you have to be signed up with our
            SOUTHERN SUBURBS COMMUNITY GROUP in order to choose
            CONSTANTIA & SURROUNDS COMMUNITY GROUP as an add on option.
            <br />* All prices are subject to an annual increase
          </p>
        </v-flex>
      </v-container>
    </v-flex>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          text: "Package",
          align: "center",
          sortable: false,
          value: "name"
        },
        { text: "Details", align: "center", sortable: false, value: "details" },
        { text: "Monthly", align: "center", sortable: false, value: "monthly" },
        { text: "Annual", align: "center", sortable: false, value: "annual" },
        {
          text: `Annual Discount`,
          align: "center",
          sortable: false,
          value: "discount"
        }
      ],
      packages: [
        {
          name: "Per suburb (facebook group) / per month",
          details: "Mondays only",
          monthly: 90,
          annual: 972,
          discount: "10%"
        },
        {
          name: "Per suburb (facebook group) / per month",
          details: "Monday & Thursday",
          monthly: 120,
          annual: 1296,
          discount: "10%"
        },
        {
          name: "Constantia & Surrounds / per month",
          details: `*Please note to make use of this service you need to be signed up to post
                    in Southern Suburbs Sell & Swop.`,
          monthly: 25,
          annual: 300,
          discount: "n/a"
        },
        {
          name: "Bishops Court Community Group / per month",
          details: `*Please note to make use of this service you need to be signed up to post
                    in Southern Suburbs Sell & Swop.`,
          monthly: 25,
          annual: 300,
          discount: "n/a"
        },
        {
          name: "Upper Claremont Community Group / per month",
          details: `*Please note to make use of this service you need to be signed up to post
                    in Southern Suburbs Sell & Swop.`,
          monthly: 25,
          annual: 300,
          discount: "n/a"
        },
        {
          name: `Admin assist / per month / per
                suburb`,
          details: `Don’t want to be bothered with remembering to
                    post your own adverts? That’s OK, one of our
                    admins can do it for you!`,
          monthly: 80,
          annual: 960,
          discount: "n/a"
        },
        {
          name: `Cover photo / per month / per
                  group`,
          details: `Having your business displayed on our Facebook
                    group cover photo is the maximum amount of
                    exposure your business can receive.`,
          monthly: 1200,
          annual: 11520,
          discount: "10%"
        }
      ],
      isMobile: false
    };
  },
  methods: {
    onResize() {
      if (window.innerWidth < 769) this.isMobile = true;
      else this.isMobile = false;
      if (this.isMobile === false) {
        this.packages = [
          {
            name: "Per suburb (facebook group) / per month",
            details: "Mondays only",
            monthly: 90,
            annual: 972,
            discount: "10%"
          },
          {
            name: "Per suburb (facebook group) / per month",
            details: "Monday & Thursday",
            monthly: 120,
            annual: 1296,
            discount: "10%"
          },
          {
            name: "Constantia & Surrounds / per month",
            details: `*Please note to make use of this service you need to be signed up to post
                    in Southern Suburbs Sell & Swop.`,
            monthly: 25,
            annual: 300,
            discount: "n/a"
          },
          {
            name: "Bishops Court Community Group / per month",
            details: `*Please note to make use of this service you need to be signed up to post
                    in Southern Suburbs Sell & Swop.`,
            monthly: 25,
            annual: 300,
            discount: "n/a"
          },
          {
            name: "Upper Claremont Community Group / per month",
            details: `*Please note to make use of this service you need to be signed up to post
                    in Southern Suburbs Sell & Swop.`,
            monthly: 25,
            annual: 300,
            discount: "n/a"
          },
          {
            name: `Admin assist / per month / per
                suburb`,
            details: `Don’t want to be bothered with remembering to
                    post your own adverts? That’s OK, one of our
                    admins can do it for you!`,
            monthly: 80,
            annual: 960,
            discount: "n/a"
          },
          {
            name: `Cover photo / per month / per
                  group`,
            details: `Having your business displayed on our Facebook
                    group cover photo is the maximum amount of
                    exposure your business can receive.`,
            monthly: 1200,
            annual: 12960,
            discount: "10%"
          }
        ];
      } else {
        this.packages = [
          {
            name: "Per suburb per month",
            details: "Mondays only",
            monthly: 90,
            annual: 972,
            discount: "10%"
          },
          {
            name: "Per suburb per month",
            details: "Monday & Thursday",
            monthly: 120,
            annual: 1296,
            discount: "10%"
          },
          {
            name: "Constantia & Surrounds",
            details: `Only members of Southern Suburbs Sell & Swop.`,
            monthly: 25,
            annual: 300,
            discount: "n/a"
          },
          {
            name: "Bishops Court Community Group",
             details: `Only members of Southern Suburbs Sell & Swop.`,
            monthly: 25,
            annual: 300,
            discount: "n/a"
          },
          {
            name: "Upper Claremont Community Group",
             details: `Only members of Southern Suburbs Sell & Swop.`,
            monthly: 25,
            annual: 300,
            discount: "n/a"
          },
          {
            name: `Admin assist per
                suburb`,
            details: `Let us do your adverts for you`,
            monthly: 80,
            annual: 960,
            discount: "n/a"
          },
          {
            name: `Cover photo per
                  group`,
            details: `Get maximum 
                    exposure for your business.`,
            monthly: 1200,
            annual: 12960,
            discount: "10%"
          }
        ];
      }
    }
  }
};
</script>

<style scoped>
.items {
  display: flex;
  justify-content: space-between;
  margin: 3px;
  padding: 10px 3px;
  height: 50px;
}

.mobile {
  color: #333;
}

.flex-item {
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
  /* align-content: space-between; */
  flex-wrap: wrap;
  padding: 5px 5px;
  margin: 5px 5px;
  width: 100%;
  height: 55px;
}
/* .flex-item2 {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 1px 1px;
  width: 100%;
  height: 120px;
} */
ul {
  display: flex;
  flex-direction: column;

  /* justify-content: space-evenly; */
  /* align-content: space-evenly; */
  align-items: space-around;
  width: 225px;
}
li {
  margin: 5px 0px;
}

@media screen and (max-width: 768px) {
  .mobile table.v-table tr {
    max-width: 100%;
    position: relative;
    display: block;
  }

  .mobile table.v-table tr:nth-child(odd) {
    border-left: 6px solid deeppink;
  }

  .mobile table.v-table tr:nth-child(even) {
    border-left: 6px solid cyan;
  }

  .mobile table.v-table tr td {
    display: flex;
    width: 150%;
    border-bottom: 2px solid #f5f5f5;
    height: auto;
    padding: 10px;
  }

  .mobile table.v-table tr td ul li:before {
    content: attr(data-label);
    padding-right: 0.5em;
    text-align: left;
    display: block;
    color: #999;
  }
  .v-datatable__actions__select {
    width: 50%;
    margin: 0px;
    justify-content: flex-end;
  }
  .mobile .theme--light.v-table tbody tr:hover:not(.v-datatable__expand-row) {
    background: transparent;
  }
  label {
    font-weight: bold;
  }
}
</style>
