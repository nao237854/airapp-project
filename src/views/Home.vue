<template>
  <div class="home">
    <div class="home__header">
      <h1>AirApp</h1>
      <h5>
        Check the weather! Enter the city name, or
        <span class="home__bolded">leave empty for geolocation</span>
      </h5>
    </div>
    <div class="home__content">
      <AirAppWeather @more="onMoreClick" :data="city"></AirAppWeather>
    </div>
  </div>
</template>

<script>
import AirAppWeather from "@/components/AirAppWeather.vue";
export default {
  name: "Home",
  components: {
    AirAppWeather
  },
  data: () => ({
    city: null
  }),
  async created() {
    if ("geolocation" in navigator) {
      if (!this.$route.params.city) {
        navigator.geolocation.getCurrentPosition(async pos => {
          const { data } = await this.$http.get(
            `https://places-dsn.algolia.net/1/places/reverse?aroundLatLng=${pos.coords.latitude},%20${pos.coords.longitude}&hitsPerPage=1`
          );
          this.city = {
            name: data.hits[0].city.default[0],
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            countryCode: data.hits[0].country_code.toUpperCase()
          };
        });
      } else {
        this.city = this.$route.params.city;
      }
    }
  },
  methods: {
    onMoreClick(city) {
      this.$router.push({ name: "more", params: { city } });
    }
  }
};
</script>

<style lang="scss">
@import "@/styles";

$componentWidth: 40%;

.home {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  max-width: 1264px;
  margin: 0 auto;

  .home__bolded {
    font-weight: bold;
  }

  .home__header {
    width: $componentWidth;
    color: $c2;
    text-align: center;
    h1 {
      font-size: 3em;
      margin: 0;
    }
    h5 {
      .home__bolded {
        color: $c2;
      }
      font-size: 1em;
      color: $c3;
      margin-top: 1em;
      font-weight: normal;
    }
  }

  .home__content {
    width: $componentWidth;
  }

  @media screen and (max-width: 1264px) {
    $componentWidth: 50%;
    .home__content {
      width: $componentWidth;
    }
    .home__header {
      width: $componentWidth;
    }
  }
  @media screen and (max-width: 960px) {
    $componentWidth: 60%;
    .home__content {
      width: $componentWidth;
    }
    .home__header {
      width: $componentWidth;
    }
  }
  @media screen and (max-width: 600px) {
    $componentWidth: 80%;
    .home__content {
      width: $componentWidth;
    }
    .home__header {
      width: $componentWidth;
    }
  }
}
</style>
