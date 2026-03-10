import styles from "./App.module.css";
import Form from "./components/Form/Form";
import Spinner from "./components/Spinner/Spinner";
import WeatherDetail from "./components/WeatherDetail/WeatherDetail";
import useWeather from "./hooks/useWeather";
import Alert from "./components/Alert/Alert";

export default function App() {
  const { weather, hasWeatherData, loading, notFound, fetchWeather } =
    useWeather();

  return (
    <>
      <h1 className={styles.title}>Buscador de Clima</h1>
      <div className={styles.container}>
        <Form fetchWeather={fetchWeather} />
        {loading && <Spinner />}
        {notFound && (
          <Alert alert={{ type: "error", message: "Ciudad no encontrada" }} />
        )}
        {hasWeatherData && <WeatherDetail weather={weather} />}
      </div>
    </>
  );
}
