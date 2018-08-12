<template>
    <div id="nav" class="nav" v-if="isShowHeader">
        <v-toolbar dark tabs>
            <v-toolbar-title @click="changeLoction('/')">
                <img class="animated tada logo" src="/img/logo.png">
            </v-toolbar-title>
            <div class="main-nav">
                <v-tabs color="transparent">
                    <v-tab @click="changeLoction('/')">
                        Home
                    </v-tab>
                    <v-menu v-if="loggedInUserId && isRegisteredUser" color="white" offset-y open-on-hover activator lazy class="v-tabs__div">
                        <a slot="activator" class="v-tabs__item">
                            Bussiness
                            <v-icon>arrow_drop_down</v-icon>
                        </a>
                        <v-list>
                            <v-list-tile v-for="(item, index) in items" :key="index" 
                                        @click="changeLoction(`/${loggedInUserId}/${item.route}`)">
                                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                            </v-list-tile>
                        </v-list>
                    </v-menu>
                </v-tabs>
            </div>
            <div class="login">
                <v-tabs slider-color="transparent" color="transparent">

                    <v-tab flat v-if="!isRegisteredUser" @click="changeLoction('/login')">
                        login
                    </v-tab>
                    <v-tab flat v-if="isRegisteredUser" @click="logout">
                        logout
                    </v-tab>
                    <v-tab v-if="isRegisteredUser">
                        <v-avatar @click="changeLoction(`/${loggedInUserId}/bussinessProfile`)">
                            <div class="profile"></div>
                        </v-avatar>
                    </v-tab>
                </v-tabs>
            </div>
        </v-toolbar>
    </div>
</template>

<script>
import userService from "@/services/userService.js";
import {
  GETTER_USER_ID,
  GETTER_IS_REGISTER_USER,
  MUT_LOGOUT_USER
} from "@/store/userModule";
import {
  eventBus,
  EVENT_TOGGLE_HEADER_PAGE
} from "@/services/event-bus-service.js";

export default {
  data() {
    return {
      items: [
        { title: "Bussiness Calender", route: "bussinessCalender" },
        { title: "Bussiness Profile", route: "bussinessProfile" },
        { title: "Bussiness Page", route: "editPage" }
      ]
      // isRegisteredUser: this.$store.getters[GETTER_IS_REGISTER_USER],
      // loggedInUserId: this.$store.getters[GETTER_IS_LOGIN]
    };
  },

  created() {

  },
  methods: {
    changeLoction(url) {
      this.$router.push(url);
    },
    logout() {
      console.log("logging out...");
      this.$store.commit({ type: MUT_LOGOUT_USER });
      userService.logout();
      this.$router.push("/");
    }
  },
  computed: {
    loggedInUserId() {
      return this.$store.getters[GETTER_USER_ID];
    },
    isShowHeader() {
      if (this.$route.name === "publishPage") {
        return false;
      }
      return true;
    },
    isRegisteredUser() {
      return this.$store.getters[GETTER_IS_REGISTER_USER];
    }
  }
};
</script>

<style lang="scss" scoped>
.v-toolbar__title img {
  width: 150px;
  height: 8vh;
}
.v-toolbar__title {
  cursor: pointer !important;
}
.main-nav {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}

.logo {
  margin-top: 20px;
}

.login {
  display: flex;
}

.login * {
  background-color: transparent;
}
.profile {
  border-radius: 50%;
  width: 50px;
  height: 100%;
  background-color: #42b983;
  background-image: url("data:image/png;base64,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");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.v-toolbar__items {
  height: fit-content;
}
a.v-list__tile,
a .v-list__tile--link {
  color: #2c3e50 !important;
}
.nav .application,
.nav .theme--light {
  background-color: rgba(0, 0, 0, 0.5) !important;
}
.v-toolbar,
.v-toolbar--extended,
.theme--darkr {
  background-color: rgba(0, 0, 0, 0.5) !important;
}
.application--wrap {
  min-height: unset;
}
.v-tabs__item {
  color: white;
}
.nav {
  z-index: 5;
  position: fixed;
  width: 100%;
  margin: 0;
  padding: 0;
  // text-decoration: ;
  a {
    font-weight: bold;
    color: white;
    font-size: 0.9em;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
  a:hover {
    color: #e23c52;
  }
}
@media only screen and (min-width: 700px) {
}
</style>

