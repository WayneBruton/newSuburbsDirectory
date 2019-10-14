// import AdminService from "@/services/AdminServices";
import DirectoryService from "../services/DirectoryServices";
export default {
  async authenticate() {
    console.log("Busy authenticating!!! ");
    console.log(this.$store.state.isAdminUserLoggedIn);
    console.log("Admin Token", this.$store.state.adminToken);
    console.log("Admin ID", this.$store.state.adminId);

    if (
      this.$store.state.adminToken !== null &&
      this.$store.state.isAdminUserLoggedIn !== false &&
      this.$store.state.adminId !== null
    ) {
      await DirectoryService.authenticateAdmin({
        token: this.$store.state.adminToken,
        user: this.$store.state.adminId,
        email: this.$store.state.adminEmail
      })
        .then(response => {
          console.log(response);
          if (!response.data.success) {
            this.$store.dispatch("setAdminToken", null);
            this.$store.dispatch("setAdminUser", null);
            // this.$store.dispatch("setAdminUserName", null);
            this.error =
              "Your session has expired! You will be redirected to the login page.";
            setTimeout(() => {
              this.error = null;
              this.$router.push({
                name: "loginAdmin"
              });
            }, 800);
          }
        })
        .catch(error => {
          this.error = error.response;
          console.log("ERROR", this.error);
          console.log("ERROR", error);
        });
    }
    if (
      !this.$store.state.isAdminUserLoggedIn ||
      !this.$store.state.adminToken
    ) {
      this.error =
        "Your session has expired! You will be redirected to the login page.";
      setTimeout(() => {
        this.error = null;
        this.$router.push({
          name: "loginAdmin"
        });
      }, 800);
    }
  }
};
