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
      <AirAppWeather :data="location"></AirAppWeather>
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
    location: null
  }),
  created() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.location = pos;
      });
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
