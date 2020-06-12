<template>
  <div v-if="data" class="weather-box">
    <div class="weather-box__temp">
      {{ data.current.temp }}<span style="font-weight:normal">°</span>C
    </div>
    <div class="weather-box__details">
      <div class="weather-box__detail">
        <div class="weather-box__detail-property">Date:</div>
        <div class="weather-box__detail-value">{{ data.current.parsedDt }}</div>
      </div>
      <div class="weather-box__detail">
        <div class="weather-box__detail-property">Location:</div>
        <div class="weather-box__detail-value">
          {{ data.city.name }}, {{ data.city.countryCode }}
        </div>
      </div>
      <div class="weather-box__detail">
        <div class="weather-box__detail-property">Description:</div>
        <div class="weather-box__detail-value">
          {{ data.current.weather[0].description }}
        </div>
      </div>
    </div>
    <div class="weather-box__more">
      <a @click="onMoreClick">More</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "AirAppWeatherBox",
  props: {
    data: {
      default: null,
      type: Object
    }
  },
  watch: {
    data: function(nv) {
      if (nv) {
        nv.current.parsedDt = new Date(
          nv.current.dt * 1000
        ).toLocaleDateString();
        nv.current.temp = Math.round(nv.current.temp);
      }
    }
  },
  methods: {
    onMoreClick() {
      this.$emit("more");
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/styles";

$marginColumn: 0.5em;
.weather-box {
  color: $c2;
  background-color: $c1-2;
  padding: 1em 0.5em;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  .weather-box__temp {
    font-size: 3em;
    font-weight: bold;
    letter-spacing: 0.01em;
    margin: $marginColumn;
  }
  .weather-box__details {
    margin: $marginColumn;
    font-size: 0.8em;
    .weather-box__detail {
      .weather-box__detail-property {
        font-weight: bold;
        display: inline-block;
        margin-right: 0.5em;
        margin-bottom: 0.5em;
      }
      .weather-box__detail-value {
        display: inline-block;
        color: $c2;
      }
    }
  }
  .weather-box__more {
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
