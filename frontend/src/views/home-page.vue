<template>
    <div class="home">
        <v-app light>
            <v-content>
        <home-header></home-header>
                <home-main></home-main>
                <home-footer></home-footer>
            </v-content>
        </v-app>
    </div>
</template>

<script>
import homeHeader from "@/components/homePage/home-header-cmp.vue";
import homeMain from "@/components/homePage/home-main-cmp.vue";
import homeFooter from "@/components/homePage/home-footer-cmp.vue";

export default {
  name: "home",
  components: {
    homeHeader,
    homeMain,
    homeFooter
  }
};
</script>

<style lang="scss" scoped>
.home {
  margin: 0;
  padding: 0;
  width: 100vw;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  z-index: -1;
}
</style>