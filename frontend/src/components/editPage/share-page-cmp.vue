<template>
<section class="share-page" v-if="isShow">

    <h1>Share your page</h1>
    
    <section class="btns-share-container">
        <social-sharing :url="businessUrl" title="The Progressive JavaScript Framework"
                        :description="txtMsgShare" :quote="txtMsgShare"
                        hashtags="vuejs,javascript,framework" inline-template>
            <div>
                <network network="googleplus">
                    <v-btn fab small dark color="red" title="Share in Linkdin!">
                        <v-icon dark>fab fa-google-plus-g</v-icon>
                    </v-btn>
                </network>

                <network network="facebook">
                    <v-btn fab small dark color="indigo" title="Share in Facebook!">
                        <v-icon dark>fab fa-facebook-square</v-icon>
                    </v-btn>
                </network>

                <network network="whatsapp">
                    <v-btn fab small dark color="green" title="Share in Whatsapp!">
                        <v-icon dark>fab fa-whatsapp</v-icon>
                    </v-btn>
                </network>

                <network network="sms">
                    <v-btn fab small dark color="orange" title="Send in SMS!">
                        <v-icon dark>fa-comments</v-icon>
                    </v-btn>
                </network>

                <network network="telegram">
                    <v-btn fab small dark color="primary" title="Share in Telegram!">
                        <v-icon dark> fab fa-telegram-plane</v-icon>
                    </v-btn>
                </network>
            </div>
        </social-sharing>
    </section>

        <section class="address-page-container">
            <h3>{{businessUrl}}</h3>
            <tool-tip :visibleToolTipText="visibleToolTipText">    
                <v-btn slot="object-tool-tip" fab small dark color="indigo"
                        title="Copy Business URL" v-clipboard:copy="businessUrl" @click="onClickCopyAddress" >
                  <v-icon dark>file_copy</v-icon>
                </v-btn> 
                <span slot="text-tool-tip">Address Copied!</span>
            </tool-tip>
        </section>
    </section>
</template>

<script>
import { GETTER_BUSINESS_NAME } from "@/store/userModule.js";
import toolTip from "@/components/tool-tip-cmp.vue";

import {
  eventBus,
  EVENT_TOGGLE_SHARE_MENU
} from "@/services/event-bus-service.js";

export default {
  name: "share-page-cmp",
  components: { toolTip },
  data() {
    return {
      isShow: false,
      visibleToolTipText: false,
      txtMsgShare:
        "I invite you to visit my home business page.\n You can easily schedule an available appointment 24/7."
    };
  },
  created() {
    eventBus.$on(EVENT_TOGGLE_SHARE_MENU, _ => {
      this.isShow = !this.isShow;
    });
  },
  methods: {
    onClickCopyAddress() {
      this.visibleToolTipText = true;
      setTimeout(() => {
        this.visibleToolTipText = false;
      }, 2000);
    }
  },
  watch: {},
  computed: {
    businessUrl() {
      return `http://schedullix.herokuapp.com/#/${
        this.$store.getters[GETTER_BUSINESS_NAME]
      }`;
    }
  }
};
</script>

<style scoped lang="scss">
.share-page {
  background-color: #403b3bd9;

  height: 150px;
  color: white;
  font-size: 10px;
  position: fixed;
  z-index: 100;
  border-radius: 5px;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
}

.address-page-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

h3 {
  border: 1px solid black;
  padding: 8px;
  background-color: #bdbdbd47;
  border-radius: 3px;
}

h1 {
  font-size: 20px;
}
@media only screen and (min-width: 600px) {
  .share-page {
    max-width: 420px;
    left: 15px;
    bottom: 110px;
  }
}

@media only screen and (max-width: 600px) {
  .share-page {
    left: 0px;
    top: 140px;
    width: 100vw;
  }
}
</style>