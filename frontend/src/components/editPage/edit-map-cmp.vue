<template>
    <div class="edit-map animated bounceInRight" :style="mapConfig.styleObj">
        <v-btn fab dark color="indigo" class="open-toolbar" title="Open toolbar"
                @click.stop="openToolbar" v-if="modePage === 'edit'">
            <v-icon dark>edit</v-icon>
        </v-btn>

        <section class="map-container">
            <div class="side-map">
                <h2> {{this.address}}</h2>
            </div>

            <gmap-map class="g-map" :center="center" :zoom="16"  >
                <gmap-marker :key="index" v-for="(m, index) in markers" 
                              :position="m.position" @click="center=m.position">
                </gmap-marker>
            </gmap-map>
        </section>
    </div>
</template>

<script>
import mapService from "../../services/mapService.js";
import { MUT_SET_USER_LOC } from "../../store/userModule.js";
import {
  eventBus,
  EVENT_OPEN_TOOL_BAR,
  EVENT_ADDRESS_CHANGE
} from "@/services/event-bus-service.js";

export default {
  name: "editMap",
  props: {
    location: Object,
    mapConfig: Object,
    modePage: String
  },
  data() {
    return {
      center: {},
      markers: [],
      places: [],
      address: "",
      currentPlace: null
    };
  },
  created() {
    eventBus.$on(EVENT_ADDRESS_CHANGE, address => {
      this.setPlace(address);
      this.addMarker();
    });
  },
  mounted() {
    this.geolocate();
    if (this.location) {
      this.currentPlace = this.location;
      mapService.getAddress(this.location).then(address => {
        this.address = address;
      });
      this.addMarker();
    }
  },

  methods: {
    // receives a place object via the autocomplete component
    setPlace(place) {
      this.currentPlace = place;
      var userLocation = {
        lat: this.currentPlace.geometry.location.lat(),
        lng: this.currentPlace.geometry.location.lng()
      };
      this.$store.commit({
        type: MUT_SET_USER_LOC,
        userLocation: { ...userLocation }
      });
      mapService.getAddress(userLocation).then(address => {
        this.address = address;
      });
      this.markers.splice(0, 1, userLocation);
    },
    addMarker() {
      if (this.markers.length === 0) {
        var marker = {
          lat: this.currentPlace.lat,
          lng: this.currentPlace.lng
        };
      } else {
        var marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        };
      }
      this.markers.push({
        position: marker
      });
      this.places.push(this.currentPlace);
      this.center = marker;
      this.currentPlace = null;
    },

    geolocate() {
      if (this.location) {
        this.center = {
          lat: this.location.lat,
          lng: this.location.lng
        };
      } else {
        navigator.geolocation.getCurrentPosition(position => {
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
        });
      }
    },
    openToolbar() {
      eventBus.$emit(EVENT_OPEN_TOOL_BAR, "map");
    }
  }
};
</script>

<style lang="scss" scoped>
.open-toolbar:hover {
  transition: all 0.5s ease;
  transform: scale(1.1);
}
.side-map {
  width: 50%;
  min-width: 300px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
}
.side-map * {
  padding: 0.5em;
  margin: auto;
}

h1 {
  margin: 0;
}

h2 {
  margin: auto;
}
input {
  padding: 1em;
  background-color: white;
  color: black;
  padding-right: 10px;
}
.edit-map {
  padding: 1em;
  display: flex;
  flex-direction: column;
  // border: 1px solid black;
}
.g-map {
  // margin-left: 2em;
  // margin-right: 2em;
  width: 90%;
  height: 50vh;
}
.map-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin: 0 auto;
}

.open-toolbar {
  position: absolute;
  right: 1%;
  z-index: 10;
}
@media only screen and (min-width: 900px) {
  .map-container {
    flex-direction: row;
  }
  .g-map {
    width: 70%;
  }
}
</style>
