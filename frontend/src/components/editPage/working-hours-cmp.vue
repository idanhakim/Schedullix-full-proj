<template>
    <section class="working-hours">
        <h2>Working hours</h2>
        <table>
            <tr v-for="workDay in workingHours" :key="workDay.day">
                <td>{{workDay.day}} : </td>
                <td v-if="workDay.isOpen">{{workDay.hoursOpen.startTime.hours | validTime}}:{{workDay.hoursOpen.startTime.minutes | validTime}}
                    -
                    {{workDay.hoursOpen.endTime.hours | validTime}}:{{workDay.hoursOpen.endTime.minutes | validTime}} 
                </td>        
                <td v-else class="closed">Closed!</td> 
            </tr>
        </table>
  </section>
</template>

<script>
export default {
  name: "working-hours-cmp",
  props: {
    workingHours: Array
  },
  methods: {},
  data() {
    return {};
  }
};
</script>

<style scoped lang="scss">
h2 {
  margin-bottom: 10px;
}
table tr td {
  padding: 10px 20px;
  margin: 5px;
  border-bottom: 1px solid black;
}

table {
  margin: 0 auto;
  width: 80%;
}

.closed {
  color: red;
}

@media only screen and (min-width: 900px) {
  table {
    width: fit-content;
    height: 65vh;
  }
}
</style>
