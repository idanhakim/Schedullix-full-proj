<template>
<section class="home-main">
      <section>
        <v-layout column wrap class="my-5" align-center>
          <div class="doctor-section">
            <div class="doctor-template">
              <img src="https://apiterapia.com.co/wp-content/uploads/2017/07/doctor.png" alt="">
            </div>
            <div class="doctor-side">
              <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum nemo nihil veniam dolore 
              natus rem consectetur
               itaque dolorum autem, cumque quo repudiandae ad laborum maxime sunt iure. Voluptatum, quod in!
              </p>
              <v-btn large color="primary" @click="loadDefaultUser('1')">Try doctor template</v-btn>
            </div>
          </div>
          <div class="barber-section">
            <div class="barber-side">
              <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum nemo nihil veniam dolore 
              natus rem consectetur
               itaque dolorum autem, cumque quo repudiandae ad laborum maxime sunt iure. Voluptatum, quod in!
              </p>
              <v-btn large color="primary" @click="loadDefaultUser('2')">Try barber template</v-btn>
            </div>
            <div class="barber-template">
              <img src="http://pluspng.com/img-png/barber-shop-png-4-png-2741.png" alt="">
            </div>
          </div>
          <div class="beautician-section">
            <div class="beautician-template">
              <img src="https://skinpurrfect.com.au/wp-content/uploads/2017/07/Beauty-Icon-4.png" alt="">
            </div>
            <div class="beautician-side">
              <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum nemo nihil veniam dolore 
              natus rem consectetur
               itaque dolorum autem, cumque quo repudiandae ad laborum maxime sunt iure. Voluptatum, quod in!
              </p>
              <v-btn large color="primary" @click="loadDefaultUser('3')">Try beautician template</v-btn>
            </div>
          </div>
          <div class="divider"></div>
          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">color_lens</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Web Design</div>
                    </v-card-title>
                    <v-card-text>
                      You’ll love how fast you can get online website for you, and it will look amazing! you will instantly build a website personalized
                      just for you complete with professional apointments and images. All you have to do is answer a few
                      simple questions about who you are and what you do. When you’re ready, go live in a click.
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">flash_on</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline">Fast development</div>
                    </v-card-title>
                    <v-card-text>
                      Get advanced capabilities with all the design features of the Schedullix Editor. Build custom web applications and robust
                      websites. It’s serverless, hassle-free editing. You can set up and build your own , content rich websites,
                      Plus, anything you create is SEO compatible. With our website builder, you can create anything you
                      want.
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">build</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Completely Open Sourced</div>
                    </v-card-title>
                    <v-card-text>
                      Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare. Pellentesque habitant morbi tristique senectus
                      et netus et malesuada fames ac turpis egestas. Nullam in aliquet odio. Aliquam eu est vitae tellus
                      bibendum tincidunt. Suspendisse potenti.
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>
    </section>
  </template>

<script>
import {
  ACT_LOAD_USER
} from "@/store/userModule.js";

export default {
  data() {
    return {};
  },
  methods: {
    loadDefaultUser(typeUser) {
      this.$store
        .dispatch({
          type: ACT_LOAD_USER,
          loginInfo: { email: "", password: typeUser }
        })
        .then(user => {
          this.$router.push(`/${user._id}/editPage`);
        })
        .catch();
    }
  }
};
</script>

<style lang="scss" scoped>
.divider {
  width: 100vw;
  background-color: lightgray;
  height: 1px;
}
.home-main {
  // background-color: white;
}
.beautician-section,
.doctor-section {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: fit-content;
  width: 100%;
  // background-color: white;
}
.barber-section {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column-reverse;
  height: fit-content;
  width: 100%;
  background-color: lightgrey;
}
.beautician-template,
.barber-template,
.doctor-template {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 50%;
  padding: 2em;
}
.beautician-template img,
.barber-template img,
.doctor-template img {
  width: 100%;
  height: 20vh;
  margin: 0 auto;
}
.beautician-side,
.barber-side,
.doctor-side {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 5em;
  font-size: 1em;
}
@media only screen and (min-width: 700px) {
  .beautician-side,
  .barber-side,
  .doctor-side {
    width: 50vw;
    padding: 2em;
    font-size: 1.5em;
  }
  .beautician-template img,
  .barber-template img,
  .doctor-template img {
    height: 80%;
  }
  .beautician-template,
  .barber-template,
  .doctor-template {
    width: 30vw;
  }
  .beautician-section,
  .doctor-section,
  .barber-section {
    flex-direction: row;
  }
}
</style>
