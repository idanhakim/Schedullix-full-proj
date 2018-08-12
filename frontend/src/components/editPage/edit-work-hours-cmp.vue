<template>
<section class="edit-work-hours" @click.stop>
    <section class="header">
        <h1 class="black-text mb-2 display-4 text-xs-center">Working Hours</h1>
        <p class="mb-1">Select your bussiness working hours</p>
    </section>

    <section class="days" v-if="workingHourEdit">
        <!-- <v-app class="sliders" style="height:0px"> -->
            <!-- <v-container > -->
                <!-- <v-layout> -->
                    <ul>
                        <li v-for="(workDay ,idx) in workingHourEdit" :key="idx">
                            <time-slider class="time-slider" v-model="workingHourEdit[idx]">
                            </time-slider>
                        </li>
                    </ul>
                <section class="btns">
                    <v-btn color="primary" @click.stop="updateUser">Update</v-btn>
                    <v-btn color="primary" @click.stop="exitEditWorkingHours">Cancel</v-btn>
                </section>
                <!-- </v-layout> -->
            <!-- </v-container> -->
        <!-- </v-app> -->
    </section>
</section>
</template>

<script>
import timeSlider from "@/components/editPage/time-slider-cmp.vue";
import {
  GETTER_USER,
  ACT_UPDATE_USER,
  MUT_UPDATE_WORKING_HOURS
} from "@/store/userModule.js";

import {
  eventBus,
  EVENT_TOGGLE_EDIT_WORK_HOURS
} from "@/services/event-bus-service.js";

export default {
  name: "edit-work-hours-cmp",
  components: { timeSlider },
  props: {
    workingHours: Array
  },
  methods: {
    updateUser() {
      console.log("update user");
      this.$store.commit({
        type: MUT_UPDATE_WORKING_HOURS,
        workingHours: this.workingHourEdit
      });

      eventBus.$emit(EVENT_TOGGLE_EDIT_WORK_HOURS);
    },
    exitEditWorkingHours() {
      eventBus.$emit(EVENT_TOGGLE_EDIT_WORK_HOURS);
    }
  },
  data() {
    return {
      workingHourEdit: JSON.parse(JSON.stringify(this.workingHours))
    };
  },
  created() {},
  watch: {}
};
</script>

<style scoped>

.header {
}
.display-4 {
  font-size: 2em !important;
}
.edit-work-hours {
  border-radius: 6px;
  background-color: white;
  width: 100vw;
  height: 80vh;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.days {
  height: 70%;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 1em;
  flex-direction: column;
 
}
.days ul {
  position: relative;
  left:-40px;
        
        width: 70vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
       
}

li {
  
  display: flex;
  align-items: center;
  width: 100%;
  padding: 1em; 
}

.time-slider {
  width: 65%;
}
.hour-minute {
  border: 1px solid black;
  width: 100px; 
}
h3 {
  font-size: 10px !important;
}

button {
  background-color: lightsteelblue;
  width: 70px;
  height: 35px;
  border: 1px solid black;
  border-radius: 6px;
  margin-left: 10px;
}

select {
  -webkit-border-radius: 2px;
  -webkit-box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  background-image: url(http://i62.tinypic.com/15xvbd5.png),
    -webkit-linear-gradient(#fafafa, #f4f4f4 40%, #e5e5e5);
  background-position: 97% center;
  background-repeat: no-repeat;
  border: 1px solid #aaa;
  color: #555;
  width: 40px;
}
.time-slider .slider-container {
  width: 50vw !important;
}
@media only screen and (min-width: 400px){
.days ul{
  position: unset;
  width: 100%;
  margin: 0 auto;
  /* left:30px; */
  padding: 0;
}
li{
  padding: 0
}
}
@media only screen and (min-width: 700px) {
  .edit-work-hours {
    width: 50vw;
    padding: 10px;
    margin:0 auto
  }
  .days ul {
    width: 100%;
    padding: 0;
    align-self:center
  }
  li {
    width: 100%;
  }
}
</style>
