import { shallowMount } from "@vue/test-utils";
import AirAppWeatherMore from "@/components/AirAppWeatherMore.vue";
import flushPromises from "flush-promises";

describe("AirAppWeatherMore", () => {
  const RealDate = Date;
  let weather;

  beforeEach(() => {
    global.Date.now = jest.fn(() => 1592200800000);

    weather = {
      city: {
        name: "Poznań",
        countryCode: "PL"
      },
      current: {
        dt: 1592200800,
        sunrise: 1592101763,
        sunset: 1592162158,
        temp: 23.22,
        feels_like: 19.49,
        pressure: 1013,
        humidity: 41,
        dew_point: 9.25,
        uvi: 7.33,
        clouds: 52,
        visibility: 10000,
        wind_speed: 5.1,
        wind_deg: 70,
        weather: [
          {
            id: 803,
            main: "Clouds",
            description: "broken clouds",
            icon: "04d"
          }
        ]
      },
      hourly: [
        {
          dt: 1592200800,
          temp: 15.7,
          feels_like: 14.44,
          pressure: 1014,
          humidity: 79,
          dew_point: 12.26,
          clouds: 4,
          wind_speed: 2.71,
          wind_deg: 61,
          weather: [
            { id: 800, main: "Clear", description: "clear sky", icon: "01d" }
          ]
        },
        {
          dt: 1592204400,
          temp: 17.04,
          feels_like: 16.13,
          pressure: 1014,
          humidity: 73,
          dew_point: 12.21,
          clouds: 13,
          wind_speed: 2.25,
          wind_deg: 57,
          weather: [
            { id: 801, main: "Clouds", description: "few clouds", icon: "02d" }
          ]
        },
        {
          dt: 1592208000,
          temp: 18.21,
          feels_like: 17.26,
          pressure: 1014,
          humidity: 66,
          dew_point: 11.87,
          clouds: 9,
          wind_speed: 2.13,
          wind_deg: 39,
          weather: [
            { id: 800, main: "Clear", description: "clear sky", icon: "01d" }
          ]
        },
        {
          dt: 1592211600,
          temp: 19.3,
          feels_like: 18.09,
          pressure: 1013,
          humidity: 61,
          dew_point: 11.62,
          clouds: 10,
          wind_speed: 2.44,
          wind_deg: 20,
          weather: [
            { id: 800, main: "Clear", description: "clear sky", icon: "01d" }
          ]
        },
        {
          dt: 1592215200,
          temp: 20.23,
          feels_like: 18.72,
          pressure: 1013,
          humidity: 57,
          dew_point: 11.54,
          clouds: 12,
          wind_speed: 2.8,
          wind_deg: 14,
          weather: [
            { id: 801, main: "Clouds", description: "few clouds", icon: "02d" }
          ]
        },
        {
          dt: 1592218800,
          temp: 20.82,
          feels_like: 19.27,
          pressure: 1013,
          humidity: 55,
          dew_point: 11.52,
          clouds: 23,
          wind_speed: 2.86,
          wind_deg: 10,
          weather: [
            { id: 801, main: "Clouds", description: "few clouds", icon: "02d" }
          ]
        },
        {
          dt: 1592222400,
          temp: 21.43,
          feels_like: 19.86,
          pressure: 1013,
          humidity: 52,
          dew_point: 11.36,
          clouds: 21,
          wind_speed: 2.77,
          wind_deg: 1,
          weather: [
            { id: 801, main: "Clouds", description: "few clouds", icon: "02d" }
          ]
        },
        {
          dt: 1592226000,
          temp: 21.8,
          feels_like: 20.23,
          pressure: 1013,
          humidity: 52,
          dew_point: 11.63,
          clouds: 39,
          wind_speed: 2.91,
          wind_deg: 355,
          weather: [
            {
              id: 802,
              main: "Clouds",
              description: "scattered clouds",
              icon: "03d"
            }
          ]
        },
        {
          dt: 1592229600,
          temp: 20.86,
          feels_like: 18.7,
          pressure: 1013,
          humidity: 58,
          dew_point: 12.31,
          clouds: 62,
          wind_speed: 4.1,
          wind_deg: 358,
          weather: [
            { id: 500, main: "Rain", description: "light rain", icon: "10d" }
          ],
          rain: { "1h": 0.13 }
        },
        {
          dt: 1592233200,
          temp: 20.21,
          feels_like: 18.56,
          pressure: 1013,
          humidity: 62,
          dew_point: 12.71,
          clouds: 66,
          wind_speed: 3.55,
          wind_deg: 357,
          weather: [
            {
              id: 803,
              main: "Clouds",
              description: "broken clouds",
              icon: "04d"
            }
          ]
        },
        {
          dt: 1592236800,
          temp: 20.42,
          feels_like: 19.34,
          pressure: 1013,
          humidity: 60,
          dew_point: 12.62,
          clouds: 55,
          wind_speed: 2.6,
          wind_deg: 346,
          weather: [
            {
              id: 803,
              main: "Clouds",
              description: "broken clouds",
              icon: "04d"
            }
          ]
        },
        {
          dt: 1592240400,
          temp: 20.39,
          feels_like: 19.89,
          pressure: 1013,
          humidity: 62,
          dew_point: 12.99,
          clouds: 47,
          wind_speed: 1.98,
          wind_deg: 334,
          weather: [
            {
              id: 802,
              main: "Clouds",
              description: "scattered clouds",
              icon: "03d"
            }
          ]
        },
        {
          dt: 1592244000,
          temp: 18.87,
          feels_like: 18.39,
          pressure: 1014,
          humidity: 71,
          dew_point: 13.64,
          clouds: 43,
          wind_speed: 2.25,
          wind_deg: 338,
          weather: [
            {
              id: 802,
              main: "Clouds",
              description: "scattered clouds",
              icon: "03d"
            }
          ]
        },
        {
          dt: 1592247600,
          temp: 17.07,
          feels_like: 15.95,
          pressure: 1014,
          humidity: 78,
          dew_point: 13.31,
          clouds: 70,
          wind_speed: 3.03,
          wind_deg: 343,
          weather: [
            { id: 500, main: "Rain", description: "light rain", icon: "10d" }
          ],
          rain: { "1h": 0.14 }
        },
        {
          dt: 1592251200,
          temp: 15.88,
          feels_like: 14.29,
          pressure: 1014,
          humidity: 83,
          dew_point: 13.11,
          clouds: 65,
          wind_speed: 3.6,
          wind_deg: 347,
          weather: [
            {
              id: 803,
              main: "Clouds",
              description: "broken clouds",
              icon: "04n"
            }
          ]
        },
        {
          dt: 1592254800,
          temp: 14.3,
          feels_like: 12.46,
          pressure: 1014,
          humidity: 87,
          dew_point: 12.2,
          clouds: 48,
          wind_speed: 3.59,
          wind_deg: 352,
          weather: [
            {
              id: 802,
              main: "Clouds",
              description: "scattered clouds",
              icon: "03n"
            }
          ]
        },
        {
          dt: 1592258400,
          temp: 13.19,
          feels_like: 11.57,
          pressure: 1015,
          humidity: 88,
          dew_point: 11.39,
          clouds: 35,
          wind_speed: 2.88,
          wind_deg: 351,
          weather: [
            {
              id: 802,
              main: "Clouds",
              description: "scattered clouds",
              icon: "03n"
            }
          ]
        },
        {
          dt: 1592262000,
          temp: 12.5,
          feels_like: 10.79,
          pressure: 1015,
          humidity: 90,
          dew_point: 10.98,
          clouds: 28,
          wind_speed: 2.86,
          wind_deg: 343,
          weather: [
            {
              id: 802,
              main: "Clouds",
              description: "scattered clouds",
              icon: "03n"
            }
          ]
        },
        {
          dt: 1592265600,
          temp: 11.9,
          feels_like: 9.97,
          pressure: 1015,
          humidity: 92,
          dew_point: 10.76,
          clouds: 23,
          wind_speed: 3.07,
          wind_deg: 343,
          weather: [
            { id: 801, main: "Clouds", description: "few clouds", icon: "02n" }
          ]
        },
        {
          dt: 1592269200,
          temp: 11.44,
          feels_like: 9.95,
          pressure: 1015,
          humidity: 94,
          dew_point: 10.52,
          clouds: 8,
          wind_speed: 2.4,
          wind_deg: 345,
          weather: [
            { id: 800, main: "Clear", description: "clear sky", icon: "01n" }
          ]
        },
        {
          dt: 1592272800,
          temp: 11.14,
          feels_like: 9.51,
          pressure: 1015,
          humidity: 94,
          dew_point: 10.29,
          clouds: 8,
          wind_speed: 2.48,
          wind_deg: 341,
          weather: [
            { id: 800, main: "Clear", description: "clear sky", icon: "01n" }
          ]
        },
        {
          dt: 1592276400,
          temp: 10.94,
          feels_like: 9.62,
          pressure: 1015,
          humidity: 95,
          dew_point: 10.25,
          clouds: 11,
          wind_speed: 2.01,
          wind_deg: 332,
          weather: [
            { id: 801, main: "Clouds", description: "few clouds", icon: "02d" }
          ]
        },
        {
          dt: 1592280000,
          temp: 12,
          feels_like: 10.83,
          pressure: 1015,
          humidity: 93,
          dew_point: 10.98,
          clouds: 12,
          wind_speed: 2.09,
          wind_deg: 332,
          weather: [
            { id: 801, main: "Clouds", description: "few clouds", icon: "02d" }
          ]
        },
        {
          dt: 1592283600,
          temp: 13.57,
          feels_like: 12.33,
          pressure: 1015,
          humidity: 88,
          dew_point: 11.65,
          clouds: 14,
          wind_speed: 2.49,
          wind_deg: 330,
          weather: [
            { id: 801, main: "Clouds", description: "few clouds", icon: "02d" }
          ]
        },
        {
          dt: 1592287200,
          temp: 15.2,
          feels_like: 13.89,
          pressure: 1015,
          humidity: 80,
          dew_point: 11.9,
          clouds: 14,
          wind_speed: 2.66,
          wind_deg: 332,
          weather: [
            { id: 801, main: "Clouds", description: "few clouds", icon: "02d" }
          ]
        },
        {
          dt: 1592290800,
          temp: 16.69,
          feels_like: 15.37,
          pressure: 1015,
          humidity: 71,
          dew_point: 11.6,
          clouds: 4,
          wind_speed: 2.52,
          wind_deg: 326,
          weather: [
            { id: 800, main: "Clear", description: "clear sky", icon: "01d" }
          ]
        },
        {
          dt: 1592294400,
          temp: 17.99,
          feels_like: 16.7,
          pressure: 1015,
          humidity: 66,
          dew_point: 11.71,
          clouds: 5,
          wind_speed: 2.53,
          wind_deg: 317,
          weather: [
            { id: 800, main: "Clear", description: "clear sky", icon: "01d" }
          ]
        },
        {
          dt: 1592298000,
          temp: 19.22,
          feels_like: 18.11,
          pressure: 1014,
          humidity: 62,
          dew_point: 11.95,
          clouds: 7,
          wind_speed: 2.36,
          wind_deg: 314,
          weather: [
            { id: 800, main: "Clear", description: "clear sky", icon: "01d" }
          ]
        },
        {
          dt: 1592301600,
          temp: 20.4,
          feels_like: 19.7,
          pressure: 1014,
          humidity: 59,
          dew_point: 12.2,
          clouds: 14,
          wind_speed: 1.93,
          wind_deg: 315,
          weather: [
            { id: 801, main: "Clouds", description: "few clouds", icon: "02d" }
          ]
        },
        {
          dt: 1592305200,
          temp: 21.47,
          feels_like: 20.89,
          pressure: 1014,
          humidity: 55,
          dew_point: 12.24,
          clouds: 25,
          wind_speed: 1.74,
          wind_deg: 316,
          weather: [
            {
              id: 802,
              main: "Clouds",
              description: "scattered clouds",
              icon: "03d"
            }
          ]
        }
      ]
    };
  });

  afterEach(() => {
    global.Date = RealDate;
  });

  it("date should be formated", async () => {
    const wrapper = shallowMount(AirAppWeatherMore);
    wrapper.setProps({ data: weather });
    global.Date.prototype.toLocaleDateString = jest.fn(() => "6/15/2020");

    await flushPromises();

    const dateElm = wrapper.find(
      `.weather-more__detail[data-key=date] .weather-more__detail-value`
    );
    expect(dateElm.text()).toMatch("6/15/2020");
  });

  it("should show hourly weather for the current day with 3 hour intervals", async () => {
    const wrapper = shallowMount(AirAppWeatherMore);
    wrapper.setProps({ data: weather });

    await flushPromises();

    const tableWeatherElm = wrapper.findAll(
      `.weather-more__table .weather-more__row:not(.weather-more__row--header)`
    );
    expect(tableWeatherElm.length).toBe(6);
  });

  it("hours should be proper formated", async () => {
    const wrapper = shallowMount(AirAppWeatherMore);
    wrapper.setProps({ data: weather });

    await flushPromises();

    const hourElm = wrapper
      .findAll(
        `.weather-more__table .weather-more__row:not(.weather-more__row--header) .weather-more__col[data-key=hour]`
      )
      .at(0);
    expect(hourElm.text()).toMatch("8:00");
  });

  it("temp degree should be rounded", async () => {
    const wrapper = shallowMount(AirAppWeatherMore);
    wrapper.setProps({ data: weather });

    await flushPromises();

    const tempElm = wrapper
      .findAll(
        `.weather-more__table .weather-more__row:not(.weather-more__row--header) .weather-more__col[data-key=temp]`
      )
      .at(0);
    expect(tempElm.text()).toMatch("16°C");
  });
});
