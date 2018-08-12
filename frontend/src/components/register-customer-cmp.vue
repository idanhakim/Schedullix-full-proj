<template>
    <section class="register-customer"  @click.stop >
        <h1>Register Oppintment</h1>

        <div v-if="!isRegisterComplited">
            <section>
              <p>Your oppintment will be scheduled at :</p>
              
              <h3>{{timeCustomer | moment("dddd, MMMM Do YYYY, h:mm:ss a")}}</h3>
            </section>

            <form @submit.prevent="registerCustomer">
                <section class="inputs-container">
                    <v-text-field v-validate="'required'" v-model="customer.name"
                                    :error-messages="errors.collect('name')"
                                      label="Full Name" data-vv-name="name" required>
                    </v-text-field>

                    <v-text-field v-validate="'required|max:10'" v-model="customer.phone"
                                    :counter="10" :error-messages="errors.collect('phone')"
                                      label="Phone Number" data-vv-name="phone" required>
                    </v-text-field>
                </section>
                
                <section class="save-container">
                    <v-btn color="primary" :disabled="modePage === 'edit'" type="submit">Confirm</v-btn>
                    <v-btn color="primary" @click.prevent="cancelRegisterCustomer">Cancel</v-btn>
                    <h4 v-if="modePage === 'edit'">This part works only after uot publish your page!</h4>
                </section>
            </form>
        </div>
        <successCheck v-if="isRegisterComplited"></successCheck>

  </section>
</template>

<script>
import {
  eventBus,
  EVENT_TOGGLE_REG_MENU
} from "@/services/event-bus-service.js";
import { ACT_ADD_CUSTOMER, GETTER_USER_BUSINESS_NAME } from "@/store/userModule.js";
import textService from "@/services/textService.js";
import successCheck from "@/components/success-check-cmp.vue";

export default {
  name: "register-customer-cmp",
  props: {
    timeCustomer: Number,
    modePage: String
  },
  components: {
    successCheck
  },
  data() {
    return {
      customer: this.getEmptyCustomer(),
      isRegisterComplited: false,
      userBusinessName: this.$store.getters[GETTER_USER_BUSINESS_NAME]
    };
  },
  computed: {},
  created() {},
  methods: {
    registerCustomer() {
      console.log("registerCustomer");
      this.customer.time = this.timeCustomer;      
      textService.sendMessage(this.customer, this.userBusinessName).then(res => {
        console.log("sent sms");
        console.log(res);
      });
      this.$store
        .dispatch({
          type: ACT_ADD_CUSTOMER,
          customer: this.customer
        })
        .then(_ => {
          console.log("success to add customer");

          this.customer = this.getEmptyCustomer();
        })
        .catch(_ => {
          console.log("Fail to add customer");
        });

      this.isRegisterComplited = true;
      setTimeout(() => {
        eventBus.$emit(EVENT_TOGGLE_REG_MENU);
        this.isRegisterComplited = false;
      }, 2000);
    },
    cancelRegisterCustomer() {
      eventBus.$emit(EVENT_TOGGLE_REG_MENU);
      this.customer = this.getEmptyCustomer();
    },
    getEmptyCustomer() {
      return {
        name: "",
        phone: "",
        time: 0,
        isDone: false
      };
    }
  }
};
</script>

<style scoped lang="scss">
.register-customer {
  border-radius: 6px;
  background-color: white;
  width: 100vw;
  height: 80vh;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}
button {
  background-color: lightsteelblue;
  width: 70px;
  height: 35px;
  border: 1px solid black;
  border-radius: 6px;
  margin-left: 10px;
  margin-bottom: 10px;
}
form {
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.inputs-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 3em;
}
.save-container {
}

input {
  padding: 5px;
  margin-bottom: 15px;
  border-bottom: 1px solid black;
}

input:focus {
  border-bottom: 2px solid rgb(38, 8, 145);
  outline: none;
}

h1 {
  font-size: 30px;
}

h4 {
  // margin-top: 10px;
  color: red;
  font-size: 10px;
}
@media only screen and (min-width: 700px) {
  .register-customer {
    width: 50vw;
    height: 70vh;
  }
}
</style>
