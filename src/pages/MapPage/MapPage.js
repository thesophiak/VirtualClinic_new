import { useState, useEffect } from "react";
import "./MapPage.scss";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
  Autocomplete,
} from "@react-google-maps/api";
import axios from "axios";

export default function MapPage() {
  const mapApi = process.env.REACT_APP_MAP_KEY;
  const apiBE = `http://localhost:5000/`;

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: mapApi,
    libraries: ["places"],
  });

  const [location, setLocation] = useState("Toronto");
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [clinics, setClinics] = useState([]);

  console.log("coordinates", coordinates);
  console.log("clinics", clinics);

  // FIND ADDRESS ON MAP
  const handleSubmit = (event) => {
    event.preventDefault();
    setLocation(event.target.inputLocation.value);
    const address = event.target.inputLocation.value;
    geocodeAddress(address);
  };

  // FIND GEO CODE OF ADDRESS
  const geocodeAddress = (address) => {
    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ address: address }, (results, status) => {
      if (status === "OK") {
        setCoordinates({
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
        });
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  };

  // FIND NEARBY PLACES
  useEffect(() => {
    if (coordinates.lat && coordinates.lng) {
      const locationParam = `${coordinates.lat},${coordinates.lng}`;
      const encodedLocation = encodeURIComponent(locationParam);

      axios
        .get(`${apiBE}map?location=${encodedLocation}`)
        .then((response) => {
          console.log("map: ", response.data.results);
          setClinics(response.data.results);
        })
        .catch((error) => console.log(error));
    }
  }, [coordinates]);

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
      
      <section className="map-section">
      <div className="map">
        <iframe
          width="500"
          height="300"
          style={{ border: 0 }}
          loading="lazy"
          src={`https://www.google.com/maps/embed/v1/place?key=${mapApi}&q=${location}`}
        ></iframe>
      </div>
      <div className="clinics">
        <ul>
          {clinics.map((clinic, index) => (
            <li key={index}>
              <div>Name: {clinic.name}</div>
              <div>Rating: {clinic.rating}</div>
              <div>Vicinity: {clinic.vicinity}</div>
            </li>
          ))}
        </ul>
      </div>
      </section>
    </>
  );
}
