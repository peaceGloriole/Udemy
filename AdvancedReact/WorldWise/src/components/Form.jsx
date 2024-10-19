import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Form.module.css";

import { useUrlPosition } from "../hooks/useUrlPosition";

import { useCities } from "../context/CitiesContext";

import Button from "./Button";
import Message from "./Message";
import Spinner from "./Spinner";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = `https://api.bigdatacloud.net/data/reverse-geocode-client`;

function Form() {
  const navigate = useNavigate();
  const [mapLat, mapLng] = useUrlPosition();
  const [isLoadingGeoData, setIsLoadingGeoData] = useState(false);
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [geocodingError, setGeocodingError] = useState("");

  const { createCity, isLoading } = useCities();

  useEffect(() => {
    if (!mapLat && !mapLng) return;

    async function fetchGeoData() {
      try {
        setIsLoadingGeoData(true);
        setGeocodingError("");
        const response = await fetch(
          `${BASE_URL}?latitude=${mapLat}&longitude=${mapLng}`
        );
        const data = await response.json();

        if (!data.countryCode) {
          throw new Error(
            "That doesn't seem to be a city, click somewhere else!"
          );
        }

        setCityName(data.city || data.locality || "");
        setCountry(data.countryName || "");
        setEmoji(convertToEmoji(data.countryCode || ""));
      } catch (error) {
        setGeocodingError(error.message);
      } finally {
        setIsLoadingGeoData(false);
      }
    }

    if (mapLat && mapLng) {
      fetchGeoData();
    }
  }, [mapLat, mapLng]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!cityName || !date) return;

    const newTrip = {
      cityName,
      country,
      date,
      notes,
      position: { lat: mapLat, lng: mapLng },
    };

    await createCity(newTrip);
    navigate(`/app/cities`);
  }

  if (isLoadingGeoData) {
    return <Spinner />;
  }

  if (!mapLat && !mapLng) {
    return <Message message="Click on the map to add a new location" />;
  }

  if (geocodingError) {
    return <Message message={geocodingError} />;
  }

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ``}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type={`primary`}>Add</Button>
        <Button
          type={`back`}
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default Form;
