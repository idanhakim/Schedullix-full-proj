<template>
    <div v-if="user" class="edit-page">
          

          <editMenuCmp :modePage="modePage" :selectedCmp = "selectedCmp" 
                        v-if="isShowEditMenu && (!showRegisterMenu && !showEditWorkingHours)"/>

          <section>
            <toolbar-cmp v-show="isToolbarShow" :selectedCmp="selectedCmp"/>
          </section>

           <!--Modals  -->
          <div class="register-container" v-if="showRegisterMenu || showEditWorkingHours" 
                  @click="showRegisterMenu = false, showEditWorkingHours = false">
              <!-- modal for register customer  -->
              <register-customer :modePage="modePage" v-if="showRegisterMenu" :timeCustomer="timeCustomerReg">
              </register-customer>
              <!-- modal for edit working hours of business user  -->
              <edit-working-hours v-if="showEditWorkingHours" :workingHours="user.workingHours">
              </edit-working-hours>
          </div> 

          <!-- HEARDER component -->
          <section class="header" :class="{cmp: modePage === 'edit','edit-cmp': selectedCmp === 'header'}"
                       style="order: 1" draggable="false" @dragstart="dragCmp"
                          @drop="dropCmp"  @dragover="allowDrop"  ref="header"
                              v-if="user.configElements.header.isActive">
              <header-cmp :modePage="modePage" :headerConfig="user.configElements.header" />
          </section>

          <!-- ABOUT component -->
          <section class="about" :class="{cmp: modePage === 'edit','edit-cmp' : selectedCmp === 'about'}"
                       style="order: 2" draggable="false" @dragstart="dragCmp"
                        @drop="dropCmp"  @dragover="allowDrop"  ref="about"
                          v-if="user.configElements.about.isActive">
              <about-cmp :modePage="modePage" :workingHours="user.workingHours" :aboutConfig="user.configElements.about"/> 
          </section>

          <!-- SCHEDULE component -->
          <section class="schedule" :class="{cmp: modePage === 'edit','edit-cmp' : selectedCmp === 'schedule'}"
                       style="order: 3" draggable="false" @dragstart="dragCmp"
                          @drop="dropCmp"  @dragover="allowDrop"  ref="schedule"
                              v-if="user.configElements.about.isActive">
              <schedule-cmp :modePage="modePage" :schedule="user.configElements.schedule" />
          </section>

          <!-- MAP component -->
          <section class="map" :class="{cmp: modePage === 'edit','edit-cmp' : selectedCmp === 'map'}"
                       style="order: 4" draggable="false" @dragstart="dragCmp"
                          @drop="dropCmp"  @dragover="allowDrop"  ref="map"
                              v-if="user.configElements.about.isActive">
              <edit-map-cmp :modePage="modePage" :location="user.location" :mapConfig="user.configElements.map" />
          </section>
    </div>
</template>

<script>
import headerCmp from "@/components/editPage/edit-header-cmp.vue";
import aboutCmp from "@/components/editPage/edit-about-cmp.vue";
import scheduleCmp from "@/components/editPage/edit-schedule-cmp.vue";
import editMapCmp from "@/components/editPage/edit-map-cmp.vue";
import dragService from "@/services/dragService.js";
import toolbarCmp from "@/components/editPage/edit-toolbar-cmp.vue";
import toolbarService from "@/services/toolbarService.js";
import editMenuCmp from "@/components/editPage/edit-menu-cmp.vue";
import editWorkingHours from "@/components/editPage/edit-work-hours-cmp.vue";
import registerCustomer from "@/components/register-customer-cmp.vue";

import {
  eventBus,
  EVENT_TOGGLE_REG_MENU,
  EVENT_TOGGLE_EDIT_WORK_HOURS,
  EVENT_ADD_CUSTOMER,
  EVENT_SELECTED_CMP,
  EVENT_OPEN_EDITOR_WORKING_HOURS,
  EVENT_OPEN_TOOL_BAR,
  EVENT_UPDATE_USER,
  EVENT_CHANGE_MODE_PAGE
} from "@/services/event-bus-service.js";

import {
  GETTER_USER,
  GETTER_IS_LOGIN,
  ACT_UPDATE_USER,
  MUT_SET_TEMP_USER,
  ACT_LOAD_USER_BY_BUSINESS_NAME
} from "../store/userModule.js";

export default {
  name: "edit-page",
  data() {
    return {
      modePage: "edit",
      showRegisterMenu: false,
      showEditWorkingHours: false,
      isLogin: this.$store.getters[GETTER_IS_LOGIN],
      timeCustomerReg: 0,
      dragOriginOrderCmp: null,
      dragDestOrderCmp: null,
      draggedCmp: null,
      isToolbarShow: false,
      cmps: [],
      selectedCmp: null
    };
  },
  created() {
    var businessName = this.$route.params.businessName;
    if (businessName) {
      this.modePage = "publish";
      this.$store
        .dispatch({ type: ACT_LOAD_USER_BY_BUSINESS_NAME, businessName })
        .then(res => {
          if (!res) this.$router.push("/");
        })
        .catch(err => {
          console.log("not good", err);
        });
    }
    this.registerToEventBus();
  },
  computed: {
    user() {
      return JSON.parse(JSON.stringify(this.$store.getters[GETTER_USER]));
    },
    isShowEditMenu() {
      if (!this.isLogin || this.$route.name === "publishPage") {
        return false;
      }
      return true;
    }
  },
  mounted() {
    this.cmps.push(
      this.$refs.header,
      this.$refs.about,
      this.$refs.schedule,
      this.$refs.map
    );
  },
  methods: {
    registerToEventBus() {
      // CHANGE_MODE_PAGE
      eventBus.$on(EVENT_CHANGE_MODE_PAGE, mode => {
        this.modePage = mode;
      });

      // open/close modal for register customer
      eventBus.$on(EVENT_TOGGLE_REG_MENU, _ => {
        this.showRegisterMenu = !this.showRegisterMenu;
      });

      eventBus.$on(EVENT_TOGGLE_EDIT_WORK_HOURS, _ => {
        this.showEditWorkingHours = !this.showEditWorkingHours;
      });

      eventBus.$on(EVENT_ADD_CUSTOMER, time => {
        console.log("eventBus, on");
        console.log("time=", time);

        this.timeCustomerReg = time;
      });

      eventBus.$on(EVENT_OPEN_EDITOR_WORKING_HOURS, _ => {
        this.showEditWorkingHours = true;
      });

      eventBus.$on(EVENT_OPEN_TOOL_BAR, selectedCmp => {
        if (
          ((this.selectedCmp === selectedCmp || !selectedCmp) &&
            this.isToolbarShow) ||
          !selectedCmp
        ) {
          this.isToolbarShow = false;
          this.selectedCmp = null;
        } else {
          this.isToolbarShow = true;
          this.selectedCmp = selectedCmp;
        }
      });

      eventBus.$on(EVENT_UPDATE_USER, () => {
        if (this.user.email !== "") {
          this.$store.dispatch({ type: ACT_UPDATE_USER, user: this.user });
        } else {
          this.$store.commit({ type: MUT_SET_TEMP_USER, user: this.user });
          this.$router.push(`/signup`);
        }
      });
    },
    dragCmp(ev) {
      this.dragOriginOrderCmp = ev.target.style.order;
      this.draggedCmp = ev.target;
    },
    dropCmp(ev) {
      ev.preventDefault();
      this.dragDestOrderCmp = ev.target.parentNode.style.order;
      ev.target.parentNode.style.order = this.dragOriginOrderCmp;
      this.draggedCmp.style.order = this.dragDestOrderCmp;
    },
    allowDrop(ev) {
      ev.preventDefault();
    }
    // dragCmp(ev) {
    //   console.log(
    //     "Top>",
    //     ev.target.offsetTop,
    //     "Height>",
    //     ev.target.offsetHeight
    //   );
    //   console.log(ev.target);
    //   let cmpsPos = dragService.setNotesPos(this.cmps)
    //   dragService.dragElement(ev.target, cmpsPos);
    // console.log('orderrrrrrrrrrrrr',ev.target.parentNode.style.order)
    // this.selectedCmp = ev.target
    // },
    // dropCmp(ev) {
    //   console.log(ev);
    // }
  },
  components: {
    headerCmp,
    aboutCmp,
    scheduleCmp,
    editMapCmp,
    toolbarCmp,
    registerCustomer,
    editMenuCmp,
    editWorkingHours
  }
};
</script>

<style lang="scss" scoped>
.edit-page {
  margin: 0px;
  display: flex;
  flex-direction: column;
}
.box {
  display: inline-block;
  margin: 10px;
  width: 150px;
  height: 150px;
  background-color: black;
}
.empty-box {
  display: inline-block;
  width: 160px;
  height: 160px;
  border: 1px solid black;
}
.cmp {
  margin: 5px;
  cursor: pointer;
  background-color: #fff;
}

.edit-cmp {
  outline: 1px dashed rgb(248, 120, 120);
  -webkit-box-shadow: 0px 0px 14px 7px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 14px 7px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 14px 7px rgba(0, 0, 0, 0.75);
  z-index: 1;
}
.register-container {
  width: 100vw;
  height: 120vh;
  background-color: #39373799;
  position: fixed;
  z-index: 10000;
  top: -30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
