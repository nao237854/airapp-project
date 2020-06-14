<template>
  <div class="more">
    <div class="more__header">
      <h1>AirApp</h1>
      <span @click="goBack()" class="more__back more__bolded">Go back</span>
    </div>
    <div class="more__content">
      <AirAppWeatherMore :data="weather" />
    </div>
  </div>
</template>

<script>
import AirAppWeatherMore from "@/components/AirAppWeatherMore.vue";

export default {
  name: "More",
  components: {
    AirAppWeatherMore
  },
  data: () => ({
    weather: null
  }),
  async mounted() {
    this.weather = await this.getWeather(this.$route.params.city);
  },
  methods: {
    async getWeather(city) {
      try {
        const { data } = await this.$http.get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${city.lat}&lon=${city.lng}&units=metric&exclude=daily,minutely&appid=${process.env.VUE_APP_OPENWEATHERMAP_API_KEY}`
        );
        return {
          current: data.current,
          city: { ...city },
          hourly: data.hourly
        };
      } catch (error) {
        return "";
      }
    },
    goBack() {
      this.$router.push({
        name: "home",
        params: { city: this.$route.params.city }
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/styles";

$componentWidth: 40%;

.more {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  max-width: 1264px;
  margin: 0 auto;

  .more__bolded {
    font-weight: bold;
  }

  .more__header {
    width: $componentWidth;
    color: $c2;
    display: flex;
    justify-content: space-between;
    h1 {
      font-size: 1.8em;
    }
    .more__back {
      align-self: flex-end;
      margin: 0 0 1em 0;
      cursor: pointer;
    }
  }

  .more__content {
    width: $componentWidth;
  }

  @media screen and (max-width: 1264px) {
    $componentWidth: 50%;
    .more__content {
      width: $componentWidth;
    }
    .more__header {
      width: $componentWidth;
    }
  }
  @media screen and (max-width: 960px) {
    $componentWidth: 60%;
    .more__content {
      width: $componentWidth;
    }
    .more__header {
      width: $componentWidth;
    }
  }
  @media screen and (max-width: 600px) {
    $componentWidth: 80%;
    .more__content {
      width: $componentWidth;
    }
    .more__header {
      width: $componentWidth;
    }
  }
}
</style>
