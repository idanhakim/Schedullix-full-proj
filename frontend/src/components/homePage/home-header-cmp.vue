<template>
    <section class="home-header">
        <section class="carousel-container">
            <div class="side-carousel">
                <h1 class="white--text mb-2 display-1 text-xs-center">
                    Create Beautiful Scheduling appointment page for your Business
                </h1>
                <p class="white--text subheading mb-2 text-xs-center">
                  Powered by The three dummies
                </p>
                <v-btn color="primary" dark large @click="getStarted">
                   Get Started 
                </v-btn>
            </div>
            <v-carousel style="height:100%" hide-delimiters hide-controls class="carosela">
                <v-carousel-item class="carosela-item" v-for="(imgCarousel, idx) in imgsCarosel" 
                                  :key="idx" :src="`img/carosel${idx+1}.png`" style="height:100%">
                </v-carousel-item>
            </v-carousel>
        </section>
    </section>
</template>
 
<script>
import userService from "@/services/userService.js";
import {
  ACT_LOAD_USER,
  GETTER_IS_LOGIN,
  GETTER_USER_ID,
  ACT_CHECK_USER_LOGIN
} from "@/store/userModule.js";

export default {
  data() {
    return {
      imgsCarosel: [
        {
          src: "img/carosel1.png"
        },
        {
          src: "img/carosel2.png"
        },
        {
          src: "img/carosel3.png"
        },
        {
          src: "img/carosel4.png"
        }
      ]
    };
  },
  methods: {
    getStarted() {
      var isLogin = this.$store.getters[GETTER_IS_LOGIN];

      if (isLogin) {
        this.$store.dispatch({ type: ACT_CHECK_USER_LOGIN }).then(user => {
          this.$router.push(`/${user._id}/editPage`);
        });
      } else {
        this.$store
          .dispatch({
            type: ACT_LOAD_USER,
            loginInfo: { email: "", password: "" }
          })
          .then(user => {
            this.$router.push(`/${user._id}/editPage`);
          })
          .catch();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.carosela-item {
  min-width: 100vw;
  min-height: 100% !important;
  max-height: 100% !important;
  max-width: 100vw !important;
}

.carosela {
  width: 100%;
}
v-parallax {
  max-width: 100%;
  max-height: 100%;
}
.home-header {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 65vh;
}
.side-carousel {
  position: absolute;
  z-index: 1000000000 !important;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 65vh;
  padding: 1em;
  margin: 0;
  background-color: rgba(49, 44, 44, 0.5);
  color: white;
}
.carousel-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
p {
  font-size: 0.9em !important;
  margin: 0;
  padding: 0;
}
.display-1 {
  font-size: 1.2em !important;
}
@media only screen and (min-width: 900px) {
  .home-header {
    height: 100vh;
  }
  .display-1 {
    font-size: 2em !important;
  }
  .side-carousel {
    height: 100vh;
    width: 100%;
    min-height: 250px;
  }
}
</style>
