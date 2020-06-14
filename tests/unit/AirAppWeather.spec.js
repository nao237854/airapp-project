import { shallowMount } from "@vue/test-utils";
import AirAppWeather from "@/components/AirAppWeather.vue";
import flushPromises from "flush-promises";

describe("AirAppWeather", () => {
  let city;
  let currentWeather;

  beforeEach(() => {
    city = {
      name: "Poznań"
    };
    currentWeather = {
      current: {
        weather: [{ description: "seems nice" }]
      },
      city
    };
  });

  it("renders props.city when passed", async () => {
    const wrapper = shallowMount(AirAppWeather);
    wrapper.getWeather = jest.fn();
    wrapper.setProps({ data: city });

    await flushPromises();

    const inputPlacesElm = wrapper.find(`.weather__input`);
    expect(inputPlacesElm.props().value).toMatch("Poznań");
  });

  it("get weather after the button is clicked", async () => {
    const wrapper = shallowMount(AirAppWeather, {
      mocks: {
        $http: {
          get: function() {
            return Promise.resolve({ data: { ...currentWeather } });
          }
        }
      }
    });
    city.name = "Warszawa";
    wrapper.vm.city = city;
    await flushPromises();

    const checkButtonElm = wrapper.find(`.weather__button`);
    checkButtonElm.trigger("click");
    await flushPromises();
    expect(wrapper.vm.currentWeather).toMatchObject(currentWeather);
  });
});
