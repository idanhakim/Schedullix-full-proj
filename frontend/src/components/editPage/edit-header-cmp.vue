<template>
    <div class="edit-header animated bounceInRight" :style="headerConfig.styleObj" ref="divHeader">
        <div class="cmp-cover flex" :style="{'align-items': headerConfig['align-items']}">
            <input v-if="modePage === 'edit'" type="text" :disabled="modePage === 'publish'" class="header-text"
                      :value="headerConfig.titleTxt" @input="updateTitle"
                      :style="{'text-align': headerConfig['text-align']}" placeholder="Enter your header here" />

                      <h1 v-else class="header-text">{{headerConfig.titleTxt}}</h1>
        </div>
        <v-btn fab dark color="indigo" class="open-toolbar" title="Open toolbar"
                @click.stop="openToolbar" v-if="modePage === 'edit'">
            <v-icon dark>edit</v-icon>
        </v-btn>
    </div>
</template>

<script>
import toolbarService from "@/services/toolbarService.js";
import {
  MUT_UPDATE_HEADER_IMG,
  MUT_UPDATE_HEADER_TITLE
} from "@/store/userModule.js";
import { eventBus, EVENT_OPEN_TOOL_BAR } from "@/services/event-bus-service.js";

export default {
  name: "editHeader",
  components: {},
  props: {
    headerConfig: Object,
    modePage: String
  },
  data() {
    return {
      isEditHeaderTxt: false,
      title: this.headerConfig.titleTxt
    };
  },
  methods: {
    openToolbar() {
      eventBus.$emit(EVENT_OPEN_TOOL_BAR, "header");
    },
    updateTitle(ev) {
      console.log(ev)
      if (ev.keyCode == 13){
return
      } 
      this.title = ev.target.value
      this.$store.commit({
        type: MUT_UPDATE_HEADER_TITLE,
        title: this.title
      });
    }
  }
};
</script>

<style scoped lang="scss">
.open-toolbar:hover {
  transition: all 0.5s ease;
  transform: scale(1.1);
}
.edit-header {
  // display: flex;
  // align-items: center;
  // flex-direction: column;
  // border: 1px solid black;gia
  height: 50vh;
  background-repeat: no-repeat !important;
  background-size: 100% 100% !important;
  background-position: center !important;
}



.open-toolbar {
  position: absolute;
  display: flex;
  flex-direction: column;
  right: 1%;
  top: 12%;
  z-index: 10;
}

.drag-header {
  position: absolute;
  display: flex;
  flex-direction: column;
  right: 1%;
  top: 10%;
  z-index: 10;
}

.header-text {
  background-color: rgba(0, 0, 0, 0);
  font-size: 36px;
  // align-items: center;
  // height: 36px;
  width: 100vw;
  // resize: none;
  outline: none;
  // overflow: auto;
  padding: 40px;
}

@media only screen and (min-width: 900px) {
  .edit-header {
    height: 80vh;
    background-size: cover !important;
  }
  .header-text {
    font-size: 72px;
  }
}
</style>
