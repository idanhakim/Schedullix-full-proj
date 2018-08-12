<template>
    <div class="list-daily-appts" v-if="dateSelected">
      <header>
          <h2>{{dateToShow}}</h2>
          <h3>Pick a time</h3>
      </header>

        <ul class="clean-list">
            <li v-for="timeDay in availableTimeList" :key="timeDay.timestamp" 
                  @click="addCustomer(timeDay.timestamp)" :style="{'background-color': bgButtons}">
                <h4>{{timeDay.hours | validTime}}:{{timeDay.minutes | validTime}}</h4>
            </li>
        </ul>

        <h3 v-if="availableTimeList.length <=0 && dateSelected">
            There is no space available at the selected time!
        </h3>
    </div>
</template>

<script>
import moment from "moment";
import {
  GETTER_CUSTOMERS_FOR_DATE,
  GETTER_TIMES_FOR_DATE,
  ACT_ADD_CUSTOMER,
  GETTER_USER_ID
} from "@/store/userModule.js";

import {
  eventBus,
  EVENT_ADD_CUSTOMER,
  EVENT_TOGGLE_REG_MENU
} from "@/services/event-bus-service.js";

import userService from "@/services/userService.js";

export default {
  name: "list-daily-appts-cmp",
  props: {
    dateSelected: Number,
    bgButtons: String
  },
  data() {
    return {};
  },
  computed: {
    dateToShow() {
      return moment(this.dateSelected).format("MMM Do YY");
    },
    availableTimeList() {
      var customersForDate = this.$store.getters[GETTER_CUSTOMERS_FOR_DATE](
        this.dateSelected
      );
      var freeTimeInDay = this.$store.getters[GETTER_TIMES_FOR_DATE](
        this.dateSelected
      );

      customersForDate.forEach(customer => {
        var idx = freeTimeInDay.findIndex(freeTime => {
          return freeTime.timestamp === customer.time;
        });

        if (idx !== -1) {
          freeTimeInDay.splice(idx, 1);
        }
      });
      return freeTimeInDay;
    }
  },
  created() {},
  methods: {
    addCustomer(timestampForCustomer) {
      console.log('add customer',timestampForCustomer);
      eventBus.$emit(EVENT_ADD_CUSTOMER, timestampForCustomer);
      eventBus.$emit(EVENT_TOGGLE_REG_MENU);
    }
  }
};
</script>

<style scoped lang="scss">
.list-daily-appts {
  width: 30vw;
  height: 80%;
}
header h2,
h3 {
  margin: 10px;
}
.list-daily-appts ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 70%;
  overflow-y: scroll;
}
li {
  width: 90%;
  padding: 20px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  height: 20%;
  margin-bottom: 10px;
  border-radius: 3px;
  border: 1px solid transparent;
}

li:hover {
  transition: all 0.5s ease;
  color: lightblue;
  border: 1px solid lightblue;
  box-shadow: -2px 2px 16px 1px rgba(0, 0, 0, 0.75);
  animation: pulse 1s;
}

::-webkit-scrollbar {
  width: 12px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: lightgray;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: darkgrey;
  cursor: pointer;
}
</style>
