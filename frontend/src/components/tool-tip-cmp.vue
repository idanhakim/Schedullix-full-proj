<template>
        <div class="tooltip">
            <slot name="object-tool-tip"></slot>
            <div class="tooltiptext animated fadeInUp" v-if="visibleToolTipText">
                <slot name="text-tool-tip"></slot>
            </div>
        </div>
</template>

<script>
export default {
  name: "tool-tip-cmp",
  props: { visibleToolTipText: Boolean },
  data() {
    return {};
  },
  computed: {},
  created() {},
  methods: {}
};
</script>

<style scoped lang="scss">
/* Tooltip container */
.tooltip {
  position: relative;
  display: inline-block;
}

/* Tooltip text */
.tooltip .tooltiptext {
  width: 120px;
  background-color: #555;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;

  /* Position the tooltip text */
  position: absolute;
  z-index: 1;
  bottom: 100%;
  left: 50%;
  margin-left: -60px;
}

/* Tooltip arrow */
.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}
</style>