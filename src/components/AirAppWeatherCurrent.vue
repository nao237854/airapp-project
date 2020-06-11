<template>
  <div v-if="data" class="weather-current">
    <div class="weather-current__temp">
      {{ data.main.temp }}<span style="font-weight:normal">°</span>C
    </div>
    <div class="weather-current__details">
      <div class="weather-current__detail">
        <div class="weather-current__detail-property">Date:</div>
        <div class="weather-current__detail-value">{{ data.parsedDt }}</div>
      </div>
      <div class="weather-current__detail">
        <div class="weather-current__detail-property">Location:</div>
        <div class="weather-current__detail-value">
          {{ data.name }}, {{ data.sys.country }}
        </div>
      </div>
      <div class="weather-current__detail">
        <div class="weather-current__detail-property">Description:</div>
        <div class="weather-current__detail-value">
          {{ data.weather[0].description }}
        </div>
      </div>
    </div>
    <div class="weather-current__more">
      <a>More</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "AirAppWeatherCurrent",
  data: () => ({
    data: null
  }),
  props: {
    city: {
      default: null,
      type: String
    }
  },
  watch: {
    city: async function(nv) {
      if (nv) {
        const { data } = await this.$http.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${nv}&units=metric&appid=${process.env.VUE_APP_OPENWEATHERMAP_API_KEY}`
        );
        this.data = data;
        this.data.parsedDt = new Date(this.data.dt * 1000).toLocaleDateString();
        this.data.main.temp = Math.round(this.data.main.temp);
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/styles";

$marginColumn: 0.5em;
.weather-current {
  color: $c2;
  background-color: $c1-2;
  padding: 1em 0.5em;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  .weather-current__temp {
    font-size: 3em;
    font-weight: bold;
    letter-spacing: 0.01em;
    margin: $marginColumn;
  }
  .weather-current__details {
    margin: $marginColumn;
    font-size: 0.8em;
    .weather-current__detail {
      .weather-current__detail-property {
        font-weight: bold;
        display: inline-block;
        margin-right: 0.5em;
        margin-bottom: 0.5em;
      }
      .weather-current__detail-value {
        display: inline-block;
        color: $c2;
      }
    }
  }
  .weather-current__more {
    padding-left: 3em;
    margin: $marginColumn;
    margin-left: auto;
    align-self: flex-end;
    font-size: 0.8em;
    a {
      cursor: pointer;
      text-transform: uppercase;
      font-weight: bold;
    }
  }
}
</style>
