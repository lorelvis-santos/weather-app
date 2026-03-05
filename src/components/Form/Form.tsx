import { useState } from "react";
import { countries } from "../../data/countries";
import styles from "./Form.module.css";
import type { SearchType } from "../../types";

export default function Form() {
  const [search, setSearch] = useState<SearchType>({
    city: "",
    countryCode: "",
  });

  return (
    <form className={styles.form}>
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
          required
        />
      </div>

      <div className={styles.form__field}>
        <label className={styles.form__label} htmlFor="country">
          País
        </label>
        <select className={styles.form__select} name="country" id="country">
          <option selected disabled>
            Selecciona una opción
          </option>
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
