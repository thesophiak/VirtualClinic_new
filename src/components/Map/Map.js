import { useState } from "react";
import "./Map.scss";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
  Autocomplete,
} from "@react-google-maps/api";
import axios from "axios";

const mapApi = process.env.REACT_APP_MAP_KEY;

export default function Map() {
  const apiBE = `http://localhost:5000/`;

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: mapApi,
    libraries: ['places']
  });

  const [location, setLocation] = useState("Toronto");

  const handleSubmit = (event) => {
    event.preventDefault();
    setLocation(event.target.inputLocation.value);
  };

  axios.get(`${apiBE}?location=${encodeURIComponent('-33.8670522,151.1957362')}`)
  .then((response) => console.log("map: ", response.data))
  .catch(error => console.log(error));


  if (!isLoaded) {
    return <>Loading ...</>;
  }

  return (
    <>
      <h1>This is a map</h1>
      <form onSubmit={handleSubmit}>
        <label>Your address</label>
        <Autocomplete>
          <input type="text" name="inputLocation"></input>
        </Autocomplete>
        <button type="submit">Load Map</button>
      </form>
      <div className="map">
        <iframe
          width="500"
          height="300"
          style={{ border: 0 }}
          loading="lazy"
          src={`https://www.google.com/maps/embed/v1/place?key=${mapApi}&q=${location}`}
        ></iframe>
      </div>
    </>
  );
}
