<template>
  <div v-if="data" class="weather-more">
    <div class="weather-more__details">
      <div data-key="date" class="weather-more__detail">
        <div class="weather-more__detail-property">Date:</div>
        <div class="weather-more__detail-value">
          {{ data.current.parsedDt }}
        </div>
      </div>
      <div data-key="location" class="weather-more__detail">
        <div class="weather-more__detail-property">Location:</div>
        <div class="weather-more__detail-value">
          {{ data.city.name }}, {{ data.city.countryCode }}
        </div>
      </div>
    </div>
    <div class="weather-more__table">
      <div class="weather-more__row weather-more__row--header">
        <div class="weather-more__col">Hour</div>
        <div class="weather-more__col">Temperature</div>
        <div class="weather-more__col">Description</div>
      </div>
      <div
        v-for="weather in data.hourly"
        :key="weather.dt"
        class="weather-more__row"
      >
        <div data-key="hour" class="weather-more__col">{{ weather.hour }}</div>
        <div data-key="temp" class="weather-more__col">
          {{ weather.temp }}<span style="font-weight:normal">°</span>C
        </div>
        <div data-key="description" class="weather-more__col">
          {{ weather.weather[0].description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AirAppWeatherMore",
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

        nv.hourly = nv.hourly.filter((weather, index) => {
          const now = new Date(Date.now());
          const weatherDate = new Date(weather.dt * 1000);
          return !(index % 3) && now.getDate() === weatherDate.getDate();
        });

        nv.hourly.forEach(weather => {
          const date = new Date(weather.dt * 1000);

          weather.temp = Math.round(weather.temp);
          weather.hour =
            date.getHours() +
            ":" +
            (date.getMinutes() < 10 ? "0" : "") +
            date.getMinutes();
        });
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/styles";
.weather-more {
  width: 100%;
  .weather-more__details {
    color: $c2;
    background-color: $c1-2;
    padding: 1em 0.5em;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    box-sizing: border-box;

    .weather-more__detail {
      .weather-more__detail-property {
        font-weight: bold;
        display: inline-block;
        margin-right: 0.5em;
      }
      .weather-more__detail-value {
        display: inline-block;
        color: $c2;
      }
    }
  }
  .weather-more__table {
    margin-top: 2em;
    .weather-more__row {
      color: $c2;

      .weather-more__col {
        background-color: $c1-2;
        width: 32%;
        display: inline-block;
        margin: 1%;
        text-align: center;
        &:first-child {
          margin-left: 0;
        }
        &:last-child {
          margin-right: 0;
        }
        padding: 1em 0;
      }

      &--header {
        font-weight: bold;
        text-align: center;
        .weather-more__col {
          background-color: transparent;
        }
      }
      width: 100%;
    }
  }
}
</style>
