<template>
  <v-container>
    <!-- <img src="../assets/heart_PNG51352.png" alt="LOGO" style="width: 10%;" /> -->
    <img src="../assets/newLogo.png" alt="LOGO" style="width: 7.5%;" />

    <v-flex xs12>
      <h1>Cancelled</h1>
      <v-container>
        <br />
        <br />
        <v-layout column wrap>
          <h1>Your Payment for R{{ amountToPay }} was unsuccessful</h1>
          <h2>Try again? or leave it for later?</h2>
        </v-layout>
        <br />
        <v-layout row wrap justify-space-around>
          <div style="display: flex; justify-content: center;">
            <form
              action="https://www.payfast.co.za/eng/process"
              name="form_ad990b487f6e182cd44e0c189204bb70"
              onsubmit="return click_ad990b487f6e182cd44e0c189204bb70( this );"
              method="post"
            >
              <input type="hidden" name="cmd" value="_paynow" />
              <input type="hidden" name="receiver" value="10469596" />
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
          <v-btn :to="{ name: 'home' }">Try later!</v-btn>
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
      cancel_url: "",
      success_url: "",
      amountToPay: 0,
      monthly: null,
      profileID: 0
    };
  },
  async created() {
    let url = window.location.href.split("/");
    console.log(url[url.length - 1]);
    url = url[url.length - 1];
    console.log(url);

    let response = await DirectoryService.paymentsuccess(url);
    console.log(response.data);
    let data = response.data.split("|");
    this.amountToPay = data[1];
    console.log(this.amountToPay);
    let success = process.env.VUE_APP_SUCCESSURL;
    let cancel = process.env.VUE_APP_CANCELURL;
    this.success_url = `${success}${url}`;
    this.cancel_url = `${cancel}${url}`;
    console.log("Success:", this.success_url);
    console.log("Cancel:", this.cancel_url);
  }
};
</script>

<style scoped></style>
