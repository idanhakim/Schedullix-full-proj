<template>
    <section class="edit-schedule animated bounceInRight" :style="schedule.styleObj">
        <section class="btn-container">
            <v-btn fab dark color="indigo" class="open-toolbar" v-if="modePage === 'edit'" 
                    title="Open toolbar" @click.stop="openToolbar">
                <v-icon dark>edit</v-icon>
            </v-btn>
        </section>

        <section class="schedule-container">
          <v-app class="date-picker">
            <v-date-picker  @input="handleInput" :color="schedule.styleDate.colorHeader" 
                            :landscape="false" :light="schedule.styleDate.light"
                            :dark="schedule.styleDate.dark" full-width v-model="dateSelected"
                            :min="minDate"/>
          </v-app>
            <list-daily-appts class="list-cmp" :dateSelected="Date.parse(dateSelected)" :bgButtons="schedule.styleApptsList.background"/>
        </section>
    </section>
</template>
 
<script>
import listDailyAppts from "./list-daily-appts-cmp.vue";
import moment from "moment";
import { eventBus, EVENT_OPEN_TOOL_BAR } from "@/services/event-bus-service.js";

export default {
  components: {
    listDailyAppts
  },
  props: {
    schedule: Object,
    modePage: String
  },
  data() {
    return {
      dateSelected: ""
    };
  },
  computed: {
    minDate() {
      return moment()
        .format()
        .split("T")[0]
        .toString();
    }
  },
  methods: {
    openToolbar() {
      eventBus.$emit(EVENT_OPEN_TOOL_BAR, "schedule");
    },
    handleInput(ev) {
      this.dateSelected = ev;
    }
  },
  mounted() {
    this.dateSelected = this.minDate;
  }
};
</script>

<style lang="scss" scoped>
.open-toolbar:hover {
  transition: all 0.5s ease;
  transform: scale(1.1);
}
.edit-schedule {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  height: 120vh;
}
.btn-container {
  position: absolute;
  top: 0;
  right: 3px;
}
.open-toolbar {
  position: absolute;
  right: 1%;
  z-index: 10;
}

.schedule-container {
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  height: 100%;
}
.date-picker {
  width: 100%;
  height: fit-content;
  z-index: 0;
  margin-top: 2em;
}
.list-cmp {
  height: 57%;
  width: 90vw;
  padding: 2em;
  margin: 0 auto;
}
@media only screen and (min-width: 900px) {
  .edit-schedule {
    height: 80vh;
  }
  .schedule-container {
    flex-direction: row;
    height: 80%;
  }
  .list-cmp {
    width: 50vw;
    height: 100%;
  }
  .date-picker {
    width: 50%;
  }
}
</style>
