<template>
  <div class="edit-about animated bounceInRight" :style="styleObjContainer">
      <v-btn fab dark color="indigo" class="open-toolbar" title="Open toolbar"
              @click.stop="openToolbar" v-if="modePage === 'edit'">
        <v-icon dark>edit</v-icon>
      </v-btn>

      <section class="about-container">
          <div class="about-text">
              <h2>{{aboutConfig.titleTxt}}</h2>
              <textarea class="about-txt" v-if="modePage === 'edit'" rows="4" cols="50" :disabled="modePage === 'publish'" ref="txt" 
                        @input="updateMainTxt" :value="aboutConfig.mainTxt">
              </textarea>
              <p v-else class="about-txt">{{aboutConfig.mainTxt}}</p>
          </div>

          <input type="file" class="hidden" ref="upload" accept="image/*" @input="onInputFile" />

          <div class="img-container" :style="{'background-image': aboutConfig.styleObj['background-image']}" 
                @click="openInputFile">
          </div>

          <div class="working-hours">
              <workingHoursCmp :workingHours="workingHours" />
          </div>
      </section>
  </div>
</template>

<script>
import workingHoursCmp from "./working-hours-cmp.vue";
import editService from "@/services/editService.js";
import { MUT_UPDATE_ABOUT_TXT, MUT_UPDATE_IMG } from "@/store/userModule.js";
import { eventBus, EVENT_OPEN_TOOL_BAR } from "@/services/event-bus-service.js";

export default {
  name: "edit-about-cmp",
  props: {
    aboutConfig: Object,
    workingHours: Array,
    modePage: String
  },
  methods: {
    openToolbar() {
      eventBus.$emit(EVENT_OPEN_TOOL_BAR, "about");
    },
    updateMainTxt() {
      this.$store.commit({
        type: MUT_UPDATE_ABOUT_TXT,
        aboutTxt: this.$refs.txt.value
      });
    },
    openInputFile() {
      this.$refs.upload.click();
    },
    onInputFile() {
      var reader = new FileReader();
      var file = this.$refs.upload.files[0];
      reader.onloadend = () => {
        this.$store.commit({
          type: MUT_UPDATE_IMG,
          cmp: "about",
          imgUrl: reader.result
        });
      };
      if (file) reader.readAsDataURL(file);
    }
  },
  components: {
    workingHoursCmp
  },
  computed: {
    styleObjContainer() {
      var newStyleObj = { ...this.aboutConfig.styleObj };
      delete newStyleObj["background-image"];
      return newStyleObj;
    }
  }
};
</script>

<style scoped lang="scss">
.about-txt {
  padding: 20px;
  height: 80%;
  word-wrap: break-word;
  resize: none;
  outline: none;
  overflow: auto;
  font-size: 20px;
  overflow: hidden;
}
.btn-container {
  position: absolute;
  top: 0;
  right: 3px;
}
.edit-about {
  // border: 1px solid black;
  display: block;
  padding: 20px;
  width: 100%;
}

.about-text {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  line-height: 1.6;
  background-color: rgba(0, 0, 0, 0.1);
  // border-radius: 10px;
  // box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.5);
  margin-bottom: 2em;
}

.about-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.img-container {
  width: 100%;
  height: 50vh;
  // border: 1px solid black;
  background-repeat: no-repeat !important;
  background-size: cover !important;
  background-position: center !important;
  margin-bottom: 2em;
}

.open-toolbar {
  position: absolute;
  right: 1%;
  z-index: 10;
}
.working-hours {
  // height: 100%;
}
@media only screen and (min-width: 900px) {
  .img-container {
    width: 33%;
    height: 100%;
    margin: 0;
  }
  .edit-about {
    height: 80vh;
    margin: 0;
  }
  .about-container {
    flex-direction: row;
    align-items: center;
    margin: 0;
  }
  .about-text {
    width: 33%;
    height: 100%;
    margin: 0;
  }
  textarea {
    // width: 100vw;
  }
}

.open-toolbar:hover {
  transition: all 0.5s ease;
  transform: scale(1.1);
}
</style>
