import "./Modal.scss";
import { useState, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
  Autocomplete,
} from "@react-google-maps/api";
import axios from "axios";
import closeIcon from "../../assets/icons/close-24px.svg";
import starIcon from "../../assets/icons/star.svg";

export default function Modal({ open, onClose }) {
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

  if (!open) return null;

  return (
    <>
      <div className="map-section">
        <img
          onClick={onClose}
          className="close-modal"
          src={closeIcon}
          alt="home icon"
        />
        <h1 className="map-section__title">Find the nearest doctor</h1>
        <form className="map-form" onSubmit={handleSubmit}>
          <label className="map-label">
            Enter your address to find the closest doctor to you.
          </label>
          <div className="input-button-container">
            <Autocomplete>
              <input
                className="map-input"
                type="text"
                name="inputLocation"
              ></input>
            </Autocomplete>

            <button className="button-map" type="submit">
              Load Map
            </button>
          </div>
        </form>

        <section className="map-container1">
          <div className="map">
            <iframe
              className="map-iframe"
              // width="400"
              // height="300"
              // style={{ border: 0 }}
              loading="lazy"
              src={`https://www.google.com/maps/embed/v1/place?key=${mapApi}&q=${location}`}
            ></iframe>
          </div>
          <div className="clinics">
            <ul className="clinic-list">
              {clinics.map((clinic, index) => (
                <li className="clinic-list-item" key={index}>
                  <div className="clinic-name">{clinic.name}</div>
                  <div>
                    {clinic.rating}
                    <img className="star-icon" src={starIcon} alt="Star icon" />
                  </div>
                  <div>{clinic.vicinity}</div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
