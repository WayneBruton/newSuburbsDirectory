<template>
  <v-container>
    <!-- <img src="../assets/heart_PNG51352.png" alt="LOGO" style="width: 10%;" /> -->
    <img src="../assets/newLogo.png" alt="LOGO" style="width: 7.5%;" />

    <v-flex xs12 md12 sm12>
      <h1>Package Options</h1>
      <v-container>
        <br />
        <v-data-table :headers="headers" :loading="true" :items="packages" class="elevation-5">
          <!-- <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear> -->
          <template v-slot:items="props">
            <td class="text-xs-left" width="30%">{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.details }}</td>
            <td class="text-xs-right">R{{ props.item.monthly.toFixed(2) }}</td>
            <td class="text-xs-right">R{{ props.item.annual.toFixed(2) }}</td>
            <td class="text-xs-right">{{ props.item.discount }}</td>
          </template>
        </v-data-table>
        <br />
        <br />
        <v-flex xs12 sm8 md10 offset-md1>
          <p>
            * We offer a 20% discount if you pay upfront for the year.
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
          annual: 864,
          discount: "20%"
        },
        {
          name: "Per suburb (facebook group) / per month",
          details: "Monday & Thursday",
          monthly: 120,
          annual: 1152,
          discount: "20%"
        },
        {
          name: "Constantia & Surrounds / per month",
          details: `*Please note to make use of the Constantia &
                    Surrounds service you need to be signed up to post
                    in Southern Suburbs Sell & Swop.`,
          monthly: 25,
          annual: 240,
          discount: "20%"
        },
        {
          name: "Bishops Court Community Group / per month",
          details: `*Please note to make use of the Constantia &
                    Surrounds service you need to be signed up to post
                    in Southern Suburbs Sell & Swop.`,
          monthly: 25,
          annual: 240,
          discount: "20%"
        },
        {
          name: "Upper Claremont Community Group / per month",
          details: `*Please note to make use of the Constantia &
                    Surrounds service you need to be signed up to post
                    in Southern Suburbs Sell & Swop.`,
          monthly: 25,
          annual: 240,
          discount: "20%"
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
          discount: "20%"
        }
      ]
    };
  }
};
</script>

<style scoped></style>
