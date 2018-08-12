<template>
    <section class="bussniess-profile">
      <div class="update-user-container">
          <h3 class="black-text mb-5 mt-5 display-4 text-xs-center">My Bussniess Profile</h3>
          <form class="update-user-form" >
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
           
            <!-- <v-text-field
            v-validate="'required|max:30'"
            v-model="user.businessName"
            :counter="30"
            :error-messages="errors.collect('businessName')"
            label="Business Name"
            data-vv-name="businessName"
            required
            ></v-text-field> -->
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
import { ACT_UPDATE_USER, GETTER_USER } from "@/store/userModule.js";
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
    var user =  JSON.parse(JSON.stringify(this.$store.getters[GETTER_USER]))
    if(user){
      this.user = user
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
          this.phone = this.phone;
          this.$store.dispatch({ type: ACT_UPDATE_USER, user: JSON.parse(JSON.stringify(this.user)) });
        }
      });
    },
    clear() {
      this.user = { ...this.getEmptyUser() };
      console.log(this.user);
    },
    getEmptyUser() {
      return {
        name: "",
        password: null,
        email: "",
        phone: null,
        businessName: ""
      };
    }
  }
};
</script>  

 
<style lang="scss" scoped>
h3.display-4{
  font-size: 4em!important;
  font-weight: normal;  
}
.bussniess-profile {
  margin: 0;
  padding: 0;
  width: 100%;
  padding:6em; 
  height: 100vh;
  background-image: url('https://c.pxhere.com/photos/0f/1e/collaborate_collaboration_creative_design_designer_group_groupware_hands-911060.jpg!d');
  background-size:100% 100%; 
}
.update-user-container{
  background-color: rgba(255, 255, 255, 0.8);
  padding: 3em;
  width: 60vw;
  margin: 0 auto;
}
</style>