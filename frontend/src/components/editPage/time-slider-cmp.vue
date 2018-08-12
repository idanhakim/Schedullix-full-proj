<template>
    <div class="time-slider flex mb-0">
        <div class="switch-container">
            <v-switch :label="value.day" class="switch mt-0 mb-0" :class="{'active': value.isOpen}"
                      v-model="value.isOpen" @change="updateWorkingHours">
            </v-switch>
        </div>

        <div class="slider-container">
            <h3>{{startTimeToShow}}</h3>
            <v-range-slider :disabled="!value.isOpen" class="range-slider"  @change="updateWorkingHours"
                            v-model="times" :max="24" :min="0" :step="0.25"></v-range-slider>
            <h3>{{endTimeToShow}}</h3>
        </div>
    </div>
</template>

<script>
export default {
  name: "time-slider-cmp",
  props: ["value"],
  data() {
    return {
      times: [0, 0],
      startTimeToShow:
        this.value.hoursOpen.startTime.hours.toString() +
        ":" +
        this.value.hoursOpen.startTime.minutes.toString(),
      endTimeToShow:
        this.value.hoursOpen.endTime.hours.toString() +
        ":" +
        this.value.hoursOpen.endTime.minutes.toString()
    };
  },
  created() {
    this.initTimes();
  },
  methods: {
    initTimes() {
      this.times = [
        this.value.hoursOpen.startTime.hours +
          this.value.hoursOpen.startTime.minutes * 100 / 60 / 100,
        this.value.hoursOpen.endTime.hours +
          this.value.hoursOpen.endTime.minutes * 100 / 60 / 100
      ];
    },
    updateWorkingHours() {
      var newVal = JSON.parse(JSON.stringify(this.value));
      this.$emit("input", newVal);
    }
  },
  watch: {
    times(newVal) {
      // start time
      var hours = Math.floor(newVal[0]);
      var minutes = Math.round((newVal[0] - hours) / 100 * 60 * 100);
      this.value.hoursOpen.startTime = { hours, minutes };
      this.startTimeToShow = hours.toString() + ":" + minutes.toString();

      // end time
      hours = Math.floor(newVal[1]);
      minutes = Math.round((newVal[1] - hours) / 100 * 60 * 100);
      this.value.hoursOpen.endTime = { hours, minutes };
      this.endTimeToShow = hours.toString() + ":" + minutes.toString();
    }
  },
  computed: {}
};
</script>

<style scoped lang="scss">
.time-slider {
  width: 100%;
  height: 5.8vh;
  justify-content: center;
  align-items: center;
  padding: 0;
}
.day {
  width: 150px;
  height: 3vh;
  // align-self: center;
  align-items: center;
  justify-content: space-around;
}
.switch-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.time-slider .slider-container {
  display: flex;
  justify-content: space-between;
  background-color: transparent;
  width: 70%;
  padding: 0;
}
h3 {
  padding-top: 4px;
  max-width: 30px;
  min-width: 30px;
}
.sliders {
  height: 0;
  // min-height: 0;
}
.time {
  margin: 0;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 5vh;
}
.active {
  color: black;
  font-weight: 600;
}
.switch {
  max-width: 60px;
  padding: 0;
  margin-right: 40px;
}

.range-slider {
  min-width: 60%;
  max-width: 60%;
}

h3 {
  margin: 0 10px;
  height: fit-content;
}
</style>