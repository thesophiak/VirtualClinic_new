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
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: mapApi,
    libraries: ['places']
  });

  const [location, setLocation] = useState("Toronto");

  const handleSubmit = (event) => {
    event.preventDefault();
    setLocation(event.target.inputLocation.value);
  };

  const requestData = {
    includedTypes: ["restaurant"],
    maxResultCount: 10,
    locationRestriction: {
      circle: {
        center: {
          latitude: 37.7937,
          longitude: -122.3965
        },
        radius: 500.0
      }
    }
  };
  
  axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=doctor&location=-33.8670522%2C151.1957362&radius=1500&type=doctor&key=${mapApi}`).then((response)=> console.log(response)).catch(error => console.log(error))


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
