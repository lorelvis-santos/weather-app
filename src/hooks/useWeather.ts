import axios from "axios";
import { z } from "zod";
import type { SearchType } from "../types";

// Zod
// Se necesita crear un esquema primero de la siguiente forma
const Weather = z.object({
  name: z.string(),
  main: z.object({
    temp: z.number(),
    temp_max: z.number(),
    temp_min: z.number(),
  }),
});

type Weather = z.infer<typeof Weather>;

// function isWeatherResponse(response: unknown): response is Weather {
//   return (
//     Boolean(response) &&
//     typeof response === "object" &&
//     typeof (response as Weather).name === "string" &&
//     typeof (response as Weather).main.temp === "number" &&
//     typeof (response as Weather).main.temp_max === "number" &&
//     typeof (response as Weather).main.temp_min === "number"
//   );
// }

export default function useWeather() {
  const fetchWeather = async (search: SearchType) => {
    const appId = import.meta.env.VITE_APP_KEY;

    try {
      const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.countryCode}&appid=${appId}`;

      const { data } = await axios.get(geoUrl);
      const { lat, lon } = data[0];

      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`;

      // Forma 1 de trabajar con apis:
      //  - Casteando el type
      // const { data: weatherResult } = await axios<Weather>(weatherUrl);

      // Forma 2 de trabajar con apis:
      //  - Con Type Guards
      // const { data: weatherResult } = await axios(weatherUrl);
      // const result = isWeatherResponse(weatherResult);
      // console.log(result);

      const { data: weatherResult } = await axios(weatherUrl);
      const result = z.safeParse(Weather, weatherResult);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    fetchWeather,
  };
}
