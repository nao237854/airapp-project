<template>
  <div class="weather">
    <div class="weather__city-select">
      <input v-model="city.name" class="weather__input" />
      <button class="weather__button">Check</button>
    </div>
    <div class="weather__info">
      <AirAppWeatherBox @more="onMoreClick" :data="currentWeather" />
    </div>
  </div>
</template>

<script>
import AirAppWeatherBox from "@/components/AirAppWeatherBox.vue";

export default {
  name: "AirAppWeather",
  data: () => ({
    currentWeather: null,
    city: ""
  }),
  components: {
    AirAppWeatherBox
  },
  props: {
    data: {
      default: null,
      type: Object
    }
  },
  watch: {
    data: async function(nv) {
      if (nv) {
        this.city = nv;
        this.currentWeather = await this.getWeather(nv);
      }
    }
  },
  methods: {
    onMoreClick() {
      this.$emit("more", this.city);
    },
    async getWeather(city) {
      try {
        const { data } = await this.$http.get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${city.lat}&lon=${city.lng}&units=metric&exclude=daily,minutely,hourly&appid=${process.env.VUE_APP_OPENWEATHERMAP_API_KEY}`
        );
        return { current: data.current, city };
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
  .weather__info {
    margin-top: 1em;
  }
}
</style>
