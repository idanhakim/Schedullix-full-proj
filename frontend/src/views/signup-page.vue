<template>
    <section class="sign-up">
      <div class="sign-up-container">
        <h1 class="black-text mb-5 display-4 text-xs-center">Sign Up</h1>
        <form class="sign-up-form" >
            <v-text-field
            v-validate="'required|email'"
            v-model="user.email"
            :error-messages="errors.collect('email')"
            label="E-mail"
            data-vv-name="email"
            required
            ></v-text-field>

            <v-text-field
            v-validate="'required'"
            type="password"
            v-model="user.password"
            :error-messages="errors.collect('password')"
            label="Password"
            data-vv-name="password"
            required
            ></v-text-field>
           

            <v-text-field
            v-validate="'required'"
            type="phone"
            v-model="user.phone"
            :error-messages="errors.collect('phone')"
            label="Phone"
            data-vv-name="phone"
            required
            ></v-text-field>
           
            <v-text-field
            v-validate="'required|max:30'"
            v-model="user.businessName"
            :counter="30"
            :error-messages="errors.collect('businessName')"
            label="Business Name"
            data-vv-name="businessName"
            required
            ></v-text-field>
            <!-- <v-checkbox
              v-validate="'required'"

              v-model="checkbox"
              :error-messages="checkboxErrors"
              label="Do you agree?"
              required
              @change="$v.checkbox.$touch()"
              @blur="$v.checkbox.$touch()"
            ></v-checkbox> -->
            <v-btn color="primary" @click="submit">submit</v-btn>
            <v-btn color="primary" @click="clear">clear</v-btn>
        </form>
      </div>
    </section>
</template>

<script>
0;
import {
  ACT_ADD_USER,
  GETTER_TEMP_USER,
  ACT_LOAD_USER
} from "@/store/userModule.js";
import userService from "@/services/userService.js";
export default {
  $_veeValidate: {
    validator: "new"
  },

  data() {
    return {
      user: {},
      checkbox: false,
      dictionary: {
        attributes: {
          email: "E-mail Address"
          // custom attributes
        },
        custom: {
          name: {
            required: () => "Name can not be empty",
            max: "The name field may not be greater than 10 characters"
            // custom messages
          }
        }
      }
    };
  },
  created() {
    var user = JSON.parse(
      JSON.stringify(this.$store.getters[GETTER_TEMP_USER])
    );
    if (user) {
    user.password = ''
      this.user = user;
      delete this.user._id;
      console.log("new user", this.user);
    } else {
      this.user = JSON.parse(JSON.stringify(userService.getDefaultUser()));
      console.log("defualt user", this.user);
    }
  },
  mounted() {
    this.$validator.localize("he", this.dictionary);
  },
  computed: {
    checkboxErrors() {
      const errors = [];
      if (!this.$v.checkbox.$dirty) return errors;
      !this.$v.checkbox.required && errors.push("You must agree to continue!");
      return errors;
    }
  },

  methods: {
    submit() {
      this.$validator.validateAll().then(res => {
        // if (!this.checkbox) return;
        console.log(res);
        if (res) {
          this.user.businessName = this.user.businessName.split(" ").join("");
          this.phone = this.phone;
          this.$store
            .dispatch({ type: ACT_ADD_USER, user: { ...this.user } })
            .then(user => {
              console.log(user);
              this.$store
                .dispatch({
                  type: ACT_LOAD_USER,
                  loginInfo: { email: user.email, password: user.password }
                })
                .then(loggedInUser => {
                  this.$router.push(`/${loggedInUser._id}/editPage`);
                });
            });
        }
      });
    },
    clear() {
      this.user = { ...this.getEmptyUser() };
      console.log(this.user);
    },
    getEmptyUser() {
      return userService.getDefaultUser();
    }
  }
};
</script>

<style lang="scss" scoped>
h1{
  // padding-top: 2em;
  font-size: 4em!important;
  font-weight: normal;  
  //  background-color: white;
  // padding: 1em;
}
.sign-up form {
  width: 100%;
  margin: 0 auto;
}
.sign-up-container{
  background-color: rgba(255, 255, 255, 0.8);
   padding: 2em;
  width: 100%;
  height: fit-content;
  margin: 0 auto;
}
.sign-up{
  padding: 2em;
  padding-top: 6em;
  height: 100vh;
  background-image: url('https://c.pxhere.com/photos/0f/1e/collaborate_collaboration_creative_design_designer_group_groupware_hands-911060.jpg!d');
  background-size:100% 100%; 

}
@media only screen and (min-width: 700px) {
  .sign-up form {
    width: 70%;
    margin: 0 auto;
  }
  
  .sign-up-container{
    width: 60vw;
    height: fit-content;
    margin: 0 auto;
    padding: 5em
  }
}
</style>
