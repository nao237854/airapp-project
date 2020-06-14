import { shallowMount } from "@vue/test-utils";
import AirAppWeatherBox from "@/components/AirAppWeatherBox.vue";
import flushPromises from "flush-promises";

describe("AirAppWeatherBox", () => {
  const realDateToLocaleDateString = Date.prototype.toLocaleDateString.bind(
    global.Date
  );

  let weather;

  beforeEach(() => {
    weather = {
      current: {
        dt: 1592134138,
        parsedDt: new Date(),
        sunrise: 1592101763,
        sunset: 1592162158,
        temp: 22.9,
        feels_like: 18.51,
        pressure: 1013,
        humidity: 43,
        dew_point: 9.67,
        uvi: 7.33,
        clouds: 40,
        visibility: 10000,
        wind_speed: 6.2,
        wind_deg: 80,
        weather: [
          {
            id: 802,
            main: "Clouds",
            description: "scattered clouds",
            icon: "03d"
          }
        ]
      },
      city: {
        name: "Poznań"
      }
    };
  });

  afterEach(() => {
    global.Date.prototype.toLocaleDateString = realDateToLocaleDateString;
  });

  it("temp degree should be rounded", async () => {
    const wrapper = shallowMount(AirAppWeatherBox);
    wrapper.setProps({ data: weather });

    await flushPromises();

    const temperatureElm = wrapper.find(`.weather-box__temp`);
    expect(temperatureElm.text()).toMatch("23°C");
  });

  it("date should be formated", async () => {
    const wrapper = shallowMount(AirAppWeatherBox);
    wrapper.setProps({ data: weather });

    const toLocaleDateStringStub = jest.fn(() => "6/14/2020");
    global.Date.prototype.toLocaleDateString = toLocaleDateStringStub;

    await flushPromises();

    const dateElm = wrapper.find(
      `.weather-box__detail[data-key=date] .weather-box__detail-value`
    );
    expect(dateElm.text()).toMatch("6/14/2020");
  });
});
