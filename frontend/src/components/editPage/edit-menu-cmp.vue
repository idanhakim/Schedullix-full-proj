<template>
    <section>
        <section class="edit-menu flex">

            <tool-tip :visibleToolTipText="visibleToolTipText">    
                <v-btn slot="object-tool-tip" fab dark color="green" title="Save" @click="saveUserPage">
                    <v-icon dark>save</v-icon>
                </v-btn>
                <span slot="text-tool-tip">Page Saved!</span>
            </tool-tip>

            <v-btn fab dark color="green" title="Publish" @click="changeMode('publish')" 
                    v-if="modePage === 'edit' && isRegisterUser">
                <v-icon dark>publish</v-icon>
            </v-btn> 

             <v-btn fab dark color="green" title="Edit" @click="changeMode('edit')" v-if="modePage === 'publish'">
                <v-icon dark>edit</v-icon>
            </v-btn> 

            <section class="share-container" v-if="modePage === 'publish'">
                <v-btn fab dark color="green" title="share" @click="openShareMenu" >
                    <v-icon dark>share</v-icon>
                </v-btn> 
                <sharePage></sharePage>
            </section>
        </section>
    </section>
</template>

<script>
import sharePage from "@/components/editPage/share-page-cmp.vue";
import toolTip from "@/components/tool-tip-cmp.vue";
import {
  ACT_UPDATE_USER,
  GETTER_IS_REGISTER_USER
} from "@/store/userModule.js";

import {
  eventBus,
  EVENT_UPDATE_USER,
  EVENT_CHANGE_MODE_PAGE,
  EVENT_OPEN_TOOL_BAR,
  EVENT_TOGGLE_SHARE_MENU,
  EVENT_TOGGLE_HEADER_PAGE
} from "@/services/event-bus-service.js";

export default {
  name: "edit-menu-cmp",
  props: {
    modePage: String
  },
  components: { sharePage, toolTip },
  data() {
    return { visibleToolTipText: false };
  },
  methods: {
    openShareMenu() {
      eventBus.$emit(EVENT_TOGGLE_SHARE_MENU);
    },
    saveUserPage() {
      eventBus.$emit(EVENT_UPDATE_USER);
      this.visibleToolTipText = true;
      setTimeout(() => {
        this.visibleToolTipText = false;
      }, 2000);
    },
    changeMode(mode) {
      eventBus.$emit(EVENT_CHANGE_MODE_PAGE, mode);
      eventBus.$emit(EVENT_TOGGLE_HEADER_PAGE);
      if (mode === "publish") {
        eventBus.$emit(EVENT_OPEN_TOOL_BAR, null); // In publish mode -> close tool bar
      }
    }
  },
  computed: {
    isRegisterUser() {
      console.log(this.$store.getters[GETTER_IS_REGISTER_USER]);

      return this.$store.getters[GETTER_IS_REGISTER_USER];
    }
  },
  created() {}
};
</script>

<style scoped lang="scss">
.edit-menu {
  position: fixed;
  display: flex;
  left: 5%;
  bottom: 5%;
  z-index: 100000;
  left: 18;
}

@media only screen and (max-width: 600px) {
  .edit-menu {
    position: fixed;
    flex-direction: row;
    height: 80px;
    top: 60px;
  }
}
</style>
