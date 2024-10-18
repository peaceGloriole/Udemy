import { useNavigate } from "react-router-dom";
import styles from "./CityList.module.css";

import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from "./Message";
import Button from "./Button";
import { useCities } from "../context/CitiesContext";

export default function CityList() {
  const { cities, isLoading } = useCities();
  const navigate = useNavigate();

  if (isLoading) {
    return <Spinner />;
  }

  if (!cities.length) {
    return <Message message="Add your first city" />;
  }

  return (
    <>
      <ul className={styles.cityList}>
        {cities.map((city) => (
          <CityItem city={city} key={city.id} />
        ))}
      </ul>
      <Button
        type="back"
        onClick={(e) => {
          e.preventDefault();
          navigate(`/`);
        }}
      >
        Go Back
      </Button>
    </>
  );
}
