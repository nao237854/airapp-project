<template>
  <div class="weather">
    <div class="weather__places">
      <places
        class="weather__input"
        v-model="cityLabel"
        @change="onCityChange"
        :options="placesOptions"
        ref="places"
      ></places>
      <button @click="getWeather(city)" class="weather__button">
        Check
      </button>
    </div>
    <div class="weather__info">
      <AirAppWeatherBox @more="onMoreClick" :data="currentWeather" />
    </div>
  </div>
</template>

<script>
import AirAppWeatherBox from "@/components/AirAppWeatherBox.vue";
import Places from "vue-places";

export default {
  name: "AirAppWeather",
  data: () => ({
    currentWeather: null,
    city: null,
    cityLabel: "",
    placesOptions: {
      appId: process.env.VUE_APP_ALGOLIA_API_ID,
      apiKey: process.env.VUE_APP_ALGOLIA_API_KEY,
      type: "city",
      templates: {
        value: suggestion => suggestion.name
      }
    }
  }),
  components: {
    AirAppWeatherBox,
    Places
  },
  props: {
    data: {
      default: null,
      type: Object
    }
  },
  watch: {
    data: function(nv) {
      if (nv) {
        this.city = nv;
        this.cityLabel = nv.name;
        this.getWeather(nv);
      }
    }
  },
  methods: {
    onCityChange(val) {
      if (val.name) {
        this.city = {
          name: val.name,
          lat: val.latlng.lat,
          lng: val.latlng.lng,
          countryCode: val.countryCode.toUpperCase()
        };
      }
    },
    onMoreClick() {
      this.$emit("more", this.city);
    },
    async getWeather(city) {
      try {
        const { data } = await this.$http.get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${city.lat}&lon=${city.lng}&units=metric&exclude=daily,minutely,hourly&appid=${process.env.VUE_APP_OPENWEATHERMAP_API_KEY}`
        );
        this.currentWeather = { current: data.current, city: { ...city } };
      } catch (error) {
        return null;
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/styles";
.weather {
  width: 100%;

  .weather__places {
    width: 100%;
    display: flex;
    .weather__button {
      margin-left: 5%;
      width: 25%;
    }
    /deep/ .algolia-places {
      width: 70%;
      .ap-icon-pin {
        display: none;
      }
    }
  }
  .weather__input {
    background-color: $c1-2;
    border: 1px solid $c3;
    border-radius: 0;
    color: $c2;
    &::-webkit-search-cancel-button {
      -webkit-appearance: none;
    }
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
    padding: 0;
    color: $c2;
    &:focus {
      outline: 0;
    }
    outline: 0;
  }
  .weather__info {
    margin-top: 1em;
  }
}
</style>
