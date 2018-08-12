<template>
  <div class="flex column login">
<div class="login-container">
            <h1 class="black-text mb-5 display-4 text-xs-center">Sign In</h1>
      <form class="mb-5">
        <v-text-field
          v-validate="'required'"
          v-model="loginInfo.email"
          :error-messages="errors.collect('email')"
          label="Email"
          data-vv-name="email"
          required
        ></v-text-field>
          <v-text-field
          v-validate="'required'"
          type='password'
          v-model="loginInfo.password"
          :error-messages="errors.collect('password')"
          label="Password"
          data-vv-name="password"
          required
        ></v-text-field>
        <v-btn color="primary"  @click="login">login</v-btn>
        <v-btn color="primary" @click="clear">clear</v-btn>
      </form >
      <h3>Don't have an account yet? <a href="#/signup">Get an account</a></h3>
</div>
 </div>   
</template>

<script>
import { ACT_LOAD_USER } from "@/store/userModule.js";

export default {
  name: "login",
  $_veeValidate: {
    validator: "new"
  },
  data() {
    return {
      slider: 45,
      volume: 10,
      price: [110, 440],
      loginInfo: {
        email: "",
        password: ""
      },
      dictionary: {
        attributes: {
          email: "E-mail Address"
          // custom attributes
        }
      }
    };
  },
  methods: {
    login() {
      if (this.loginInfo.email || this.loginInfo.password) {
        this.$store
          .dispatch({ type: ACT_LOAD_USER, loginInfo: this.loginInfo })
          .then(user => {
            this.$router.push(`/${user._id}/editPage`);
          })
          .catch();
      } else {
        console.log("inavlid user name");
      }
    },
    clear() {
      this.loginInfo.email = "";
      this.loginInfo.password = "";
      this.$validator.reset();
    }
  }
};
</script>

<style lang="scss" scoped>
h1 {
  font-size: 4em !important;
  font-weight: normal;
}
.login form {
  width: 100%;
  margin: 0 auto;
}
.login-container {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 2em;
  width: 100%;
  height: fit-content;
  margin: 0 auto;
}
.login {
  padding: 2em;
  padding-top: 6em;
  height: 100vh;
  background-image: url("https://c.pxhere.com/photos/0f/1e/collaborate_collaboration_creative_design_designer_group_groupware_hands-911060.jpg!d");
  background-size: 100vw 100vh;
}
@media only screen and (min-width: 700px) {
  .login form {
    width: 70%;
    margin: 0 auto;
  }

  .login-container {
    width: 60vw;
    height: fit-content;
    margin: 0 auto;
    padding: 5em;
  }
}
</style>