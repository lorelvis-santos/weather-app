import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { countries } from "../../data/countries";
import styles from "./Form.module.css";
import type { AlertType, SearchType } from "../../types";
import Alert from "../Alert/Alert";

type FormProps = {
  fetchWeather: (search: SearchType) => Promise<void>;
};

export default function Form({ fetchWeather }: FormProps) {
  const [search, setSearch] = useState<SearchType>({
    city: "",
    countryCode: "",
  });

  const [alert, setAlert] = useState<AlertType>({
    message: "",
    type: "none",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
  ) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(search).includes("")) {
      setAlert({
        message: "Todos los campos son obligatorios",
        type: "error",
      });
      return;
    }

    fetchWeather(search);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {alert.type !== "none" && <Alert alert={alert} />}

      <div className={styles.form__field}>
        <label className={styles.form__label} htmlFor="city">
          Ciudad
        </label>
        <input
          id="city"
          name="city"
          className={styles.form__input}
          type="text"
          placeholder="Ej. Cotuí"
          value={search.city}
          // required
          onChange={handleChange}
        />
      </div>

      <div className={styles.form__field}>
        <label className={styles.form__label} htmlFor="country">
          País
        </label>
        <select
          className={styles.form__select}
          name="countryCode"
          id="countryCode"
          value={search.countryCode}
          defaultValue={""}
          onChange={handleChange}
        >
          <option value={""}>Selecciona una opción</option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <input className={styles.form__submit} type="submit" value="Consultar" />
    </form>
  );
}
