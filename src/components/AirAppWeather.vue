<template>
  <div class="weather">
    <div class="weather__city-select">
      <input v-model="city" class="weather__input" />
      <button class="weather__button">Check</button>
    </div>
  </div>
</template>

<script>
// import { Loader } from "google-maps";

export default {
  name: "AirAppWeather",
  data: () => ({
    city: ""
  }),
  props: {
    data: {
      default: null
    }
  },
  watch: {
    data: async function(nv) {
      if (nv) {
        this.city = await this.getCity(nv.coords.latitude, nv.coords.longitude);
      }
    }
  },
  methods: {
    async getCity(lat, lng) {
      try {
        const { data } = await this.$http.get(
          `http://photon.komoot.de/reverse?lon=${lng}&lat=${lat}`
        );
        return data.features[0].properties.city;
      } catch (error) {
        return "";
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/styles";
.weather {
  width: inherit;
  .weather__city-select {
    width: 100%;
    .weather__button {
      margin-left: 5%;
      width: 25%;
    }
    .weather__input {
      width: 70%;
    }
  }
  .weather__input {
    background-color: rgba($c1, 0.5);
    border: 1px solid $c3;
    padding: 1em;
    color: $c2;
    &:focus {
      outline: 0;
    }
    outline: 0;
    box-sizing: border-box;
  }
  .weather__button {
    box-sizing: border-box;
    cursor: pointer;
    font-weight: bold;
    border-style: hidden;
    background-color: rgba($c3, 0.5);
    padding: 1em;
    color: $c2;
    &:focus {
      outline: 0;
    }
    outline: 0;
  }
}
</style>
