<template>
  <div class="weather">
    <div class="weather__city-select">
      <input v-model="city" class="weather__input" />
      <button class="weather__button">Check</button>
    </div>
    <div class="weather__box">
      <AirAppWeatherCurrent :city="city" />
    </div>
  </div>
</template>

<script>
import AirAppWeatherCurrent from "@/components/AirAppWeatherCurrent.vue";

// const AlgoliaAPIKey = process.env.VUE_APP_ALGOLIA_API_KEY;
// const AlgoliaApplicationId = process.env.VUE_APP_ALGOLIA_APPLICATION_ID;

export default {
  name: "AirAppWeather",
  data: () => ({
    city: ""
  }),
  components: {
    AirAppWeatherCurrent
  },
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
          `https://places-dsn.algolia.net/1/places/reverse?aroundLatLng=${lat},%20${lng}&hitsPerPage=1`
        );
        return data.hits[0].city.default[0];
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
  width: 100%;
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
    background-color: $c1-2;
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
    text-transform: uppercase;
    background-color: $c3-2;
    padding: 1em;
    color: $c2;
    &:focus {
      outline: 0;
    }
    outline: 0;
  }
  .weather__box {
    margin-top: 1em;
  }
}
</style>
