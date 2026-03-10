import axios from "axios";
// import { object, string, number, type InferOutput, parse } from "valibot";
import { z } from "zod";
import type { SearchType } from "../types";
import { useMemo, useState } from "react";

// Valibot
// const WeatherSchema = object({
//   name: string(),
//   main: object({
//     temp: number(),
//     temp_max: number(),
//     temp_min: number(),
//   }),
// });

// type Weather = InferOutput<typeof WeatherSchema>;

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

export type Weather = z.infer<typeof Weather>;

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
  const initialState = {
    name: "",
    main: {
      temp: 0,
      temp_max: 0,
      temp_min: 0,
    },
  };

  const [weather, setWeather] = useState<Weather>(initialState);

  const [loading, setLoading] = useState(false);

  const fetchWeather = async (search: SearchType) => {
    const appId = import.meta.env.VITE_APP_KEY;

    setWeather(initialState);
    setLoading(true);

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

      // Forma 3 de trabajar con apis:
      //  - Con Zod
      const { data: weatherResult } = await axios(weatherUrl);
      const result = z.safeParse(Weather, weatherResult);

      if (result.success) {
        setWeather(result.data);
      }

      // Forma 3 de trabajar con apis:
      //  - Con Valibot
      // const { data: weatherResult } = await axios(weatherUrl);
      // const result = parse(WeatherSchema, weatherResult);
      // console.log(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const hasWeatherData = useMemo(() => weather.name, [weather]);

  return {
    weather,
    fetchWeather,
    hasWeatherData,
    loading,
  };
}
