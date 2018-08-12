<template>
    <div>
        <div class="hidden">
            <input type="file" class="hidden" ref="upload" accept="image/*" @input="onInputFile" />
            <input type="color" class="hidden" ref="bgColor" @input="onInputBgColor">
            <input type="color" class="hidden" ref="txtColor" @input="onInputTxtColor">
            <input type="color" class="hidden" ref="apptColor" @input="onInputApptColor">
        </div>

        <section class="toolbar">

            <section class="header" @mousedown="dragToolbar">
                <button @click="closeToolbar">X</button>
                Style your page {{selectedCmp}}
            </section>
            <section class="btns">

                <v-menu :nudge-width="100">
                    <v-toolbar-title slot="activator">
                        <v-btn fab dark small color="blue" title="Edit text">
                            <v-icon dark>text_fields</v-icon>
                        </v-btn>
                    </v-toolbar-title>
                    <v-list>
                        <v-list-tile v-for="font in fonts" :key="font" @click="updateFont">
                            {{font}}
                        </v-list-tile>
                    </v-list>
                </v-menu>
                <v-btn v-if="selectedCmp === 'about'" fab dark small color="purple"
                        title="Change working hours" @click.stop="openWorkingHoursEditor">
                    <v-icon dark>access_time</v-icon>
                </v-btn>
                <v-btn fab dark small color="orange" title="Text color" @click.stop="openInputTxtColor">
                    <v-icon dark>format_color_text</v-icon>
                </v-btn>
                <v-btn v-if="selectedCmp !== 'header'" fab dark small color="blue" 
                        title="Background color" @click.stop="openInputBgColor">
                    <v-icon dark>format_color_fill</v-icon>
                </v-btn>
                <v-btn v-if="selectedCmp === 'schedule'" fab dark small color="green"
                        title="Change calender style" @click.stop="openInputApptColor">
                    <v-icon dark>list</v-icon>
                </v-btn>
                <v-btn v-if="selectedCmp === 'about' || selectedCmp === 'header'" fab dark small 
                        color="pink" title="Upload image" @click.stop="openInputFile">
                    <v-icon dark>add_photo_alternate</v-icon>
                </v-btn>
                <v-btn fab dark small color="red" title="Delete area" @click.stop="hideCmp">
                    <v-icon dark>delete</v-icon>
                </v-btn>
                <section class="address" v-if="selectedCmp === 'map'">
                    <h3>Your business location: </h3>
                    <gmap-autocomplete @place_changed="setAddress">
                    </gmap-autocomplete>
                </section>
                <section class="calender-edit" v-if="selectedCmp === 'schedule'">
                    <h3>Style your calender: </h3>
                    <select class="select-calender-color" @input="onInputCalenderBgColor" 
                            :value="selectedCalenderColor" :style="{'background-color': selectedCalenderColor}">
                        <option class="calender-color" v-for="color in calenderHeaderColor" 
                                :key="color" :value="color" :style="{'background-color': color}">
                        </option>
                    </select>
                    <v-btn fab dark small color="blue" title="Text color" @click.stop="toggleCalenderTheme">
                        <v-icon dark>event</v-icon>
                    </v-btn>
                    <!-- <v-btn fab dark small color="blue" title="Background color" @click.stop="toggleCalenderLandscape">
                        <v-icon dark>chrome_reader_mode</v-icon>
                    </v-btn> -->
                </section>
                <br />
                <v-btn v-if="selectedCmp === 'header'" fab dark small color="gray" title="Text color" @click.stop="alignItems('horizontal', 'left')">
                    <v-icon dark>format_align_left</v-icon>
                </v-btn>                
                <v-btn v-if="selectedCmp === 'header'" fab dark small color="gray" title="Text color" @click.stop="alignItems('horizontal','center')">
                    <v-icon dark>format_align_center</v-icon>
                </v-btn>
                <v-btn v-if="selectedCmp === 'header'" fab dark small color="gray" title="Text color" @click.stop="alignItems('horizontal','right')">
                    <v-icon dark>format_align_right</v-icon>
                </v-btn>
                <v-btn v-if="selectedCmp === 'header'" fab dark small color="gray" title="Text color" @click.stop="alignItems('vertical','flex-start')">
                    <v-icon dark>vertical_align_top</v-icon>
                </v-btn>
                <v-btn v-if="selectedCmp === 'header'" fab dark small color="gray" title="Text color" @click.stop="alignItems('vertical','center')">
                    <v-icon dark>drag_handle</v-icon>
                </v-btn>
                <v-btn v-if="selectedCmp === 'header'" fab dark small color="gray" title="Text color" @click.stop="alignItems('vertical','flex-end')">
                    <v-icon dark>vertical_align_bottom</v-icon>
                </v-btn>
            </section>
        </section>
    </div>
</template>

<script>
import toolbarService from "@/services/toolbarService.js";
import utilsService from "@/services/utilsService.js";
import {
  eventBus,
  EVENT_SELECTED_CMP,
  EVENT_OPEN_EDITOR_WORKING_HOURS,
  EVENT_ADDRESS_CHANGE,
  EVENT_OPEN_TOOL_BAR
} from "@/services/event-bus-service.js";

import {
  MUT_UPDATE_COLOR_CMP,
  MUT_UPDATE_IMG,
  MUT_UPDATE_CALENDER_BG_COLOR,
  MUT_TOGGLE_CALENDER_THEME,
  MUT_TOGGLE_CALENDER_LANDSCAPE,
  GETTER_CALENDER_COLOR,
  MUT_UPDATE_APPT_LIST_COLOR_CMP,
  MUT_UPDATE_IS_ACTIVE_CMP,
  MUT_ALIGN_HEADER_TEXT
} from "@/store/userModule.js";

export default {
  name: "toolbar",
  props: ["selectedCmp"],
  components: {},
  data() {
    return {
      fonts: [
        "Arial",
        "Impact",
        "Do Hyeon",
        "Raleway",
        "Merriweather",
        "Modern Antiqua",
        "Indie Flower",
        "MedievalSharp",
        "Pacifico",
        "Dancing Script",
        "Ruslan Display",
        "Gloria Hallelujah"
      ],
      currCmp: null,
      calenderHeaderColor: [
        "blue",
        "red",
        "orange",
        "yellow",
        "brown",
        "black",
        "white",
        "grey"
      ],
      show: false
    };
  },
  created() {
    eventBus.$on(EVENT_SELECTED_CMP, cmp => {
      this.currCmp = cmp;
    });
  },
  computed: {
    selectedCalenderColor() {
      return this.$store.getters[GETTER_CALENDER_COLOR];
    }
  },
  methods: {
    dragToolbar(ev) {
      toolbarService.dragElement(ev.target.parentNode);
    },

    hideCmp() {
      this.$store.commit({
        type: MUT_UPDATE_IS_ACTIVE_CMP,
        cmp: this.selectedCmp
      });
    },

    openInputFile() {
      this.$refs.upload.click();
    },

    openInputBgColor() {
      this.$refs.bgColor.click();
    },

    openInputApptColor() {
      this.$refs.apptColor.click();
    },

    openInputCalenderColor() {
      this.$refs.calenderColor.click();
    },

    onInputBgColor(ev) {
      this.$store.commit({
        type: MUT_UPDATE_COLOR_CMP,
        cmp: this.selectedCmp,
        propertyToUpdate: "background",
        value: ev.target.value
      });
    },

    openInputTxtColor() {
      this.$refs.txtColor.click();
    },

    onInputTxtColor(ev) {
      this.$store.commit({
        type: MUT_UPDATE_COLOR_CMP,
        cmp: this.selectedCmp,
        propertyToUpdate: "color",
        value: ev.target.value
      });
    },

    onInputApptColor(ev) {
      this.$store.commit({
        type: MUT_UPDATE_APPT_LIST_COLOR_CMP,
        color: ev.target.value
      });
    },

    onInputCalenderBgColor(ev) {
      this.$store.commit({
        type: MUT_UPDATE_CALENDER_BG_COLOR,
        color: ev.target.value
      });
    },

    toggleCalenderTheme() {
      this.$store.commit({ type: MUT_TOGGLE_CALENDER_THEME });
    },

    toggleCalenderLandscape() {
      this.$store.commit({ type: MUT_TOGGLE_CALENDER_LANDSCAPE });
    },

    updateFont(ev) {
      this.$store.commit({
        type: MUT_UPDATE_COLOR_CMP,
        cmp: this.selectedCmp,
        propertyToUpdate: "font-family",
        value: ev.target.innerText
      });
    },

    onInputFile() {
      var reader = new FileReader();
      var file = this.$refs.upload.files[0];
      reader.onloadend = () => {
        this.$store.commit({
          type: MUT_UPDATE_IMG,
          cmp: this.selectedCmp,
          imgUrl: reader.result
        });
      };
      if (file) reader.readAsDataURL(file);
      utilsService
        .doUploadImg(file)
        .then(res => {
          this.$store.commit({
            type: MUT_UPDATE_IMG,
            cmp: this.selectedCmp,
            imgUrl: res
          });
        })
        .catch(err => console.log("Upload failed, saved as dataURL"));
    },

    openWorkingHoursEditor() {
      this.closeToolbar()
      eventBus.$emit(EVENT_OPEN_EDITOR_WORKING_HOURS);
    },

    setAddress(address) {
      eventBus.$emit(EVENT_ADDRESS_CHANGE, address);
    },

    closeToolbar() {
      eventBus.$emit(EVENT_OPEN_TOOL_BAR, null);
    },
    alignItems(direction, alignment) {
        this.$store.commit({type: MUT_ALIGN_HEADER_TEXT, direction, alignment})
    }
  }
};
</script>

<style scoped lang="scss">
.toolbar {
  width: 400px;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 99999;
  display: flex;
  justify-content: space-between;
  position: fixed;
  flex-wrap: wrap;
  padding: 0 0 10px 0;
  border-radius: 5px;
  top: 15%;
  right: 15%;
}

.header {
  background-color: rgba(92, 92, 92, 0.5);
  width: 100%;
  padding: 5px;
  margin: 0;
  border-radius: 5px 5px 0 0;
  cursor: move;
  font-size: 20px;
  text-align: center;
}

.header button {
  float: left;
}
.calender {
  background-color: rgba(92, 92, 92, 0.5);
  width: 100%;
  padding: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.btns {
  margin: auto;
  padding: 10px;
}

.btn {
  height: 80px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(92, 92, 92, 0.5);
  color: white;
  border: 1px solid black;
  cursor: pointer;
}

.hidden {
  display: none;
}

.address {
  margin: 10px;
}

.address input {
  background: white;
  padding: 5px;
  margin: 5px;
}

.address button {
  border: 1px solid black;
  padding: 5px;
  background: antiquewhite;
}

h3 {
  margin: 10px;
}

.select-calender-color {
  overflow: hidden;
  padding: 5px;
  -moz-border-radius: 9px 9px 9px 9px;
  -webkit-border-radius: 9px 9px 9px 9px;
  border-radius: 50%;
  box-shadow: 1px 1px 11px #330033;
  outline: none;
  height: 38px;
  width: 38px;
  margin: 10px;
  cursor: pointer;
}

.calender-color {
  border-radius: 50%;
}

@media only screen and (max-width: 600px) {
  .toolbar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    right: 85vw;
    top: 68vh;
  }
}
</style>
