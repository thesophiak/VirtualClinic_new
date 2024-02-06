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
import selectIcon from "../../assets/icons/select.svg";

export default function Modal({ open, onClose }) {
  const mapApi = process.env.REACT_APP_MAP_KEY;
  const apiBE = `http://localhost:5000/`;
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: mapApi,
    libraries: ["places"],
  });
  const torontoCoordinates = { lat: 43.65107, lng: -79.347015 };
  const [location, setLocation] = useState(
    `${torontoCoordinates.lat},${torontoCoordinates.lng}`
  );
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [clinics, setClinics] = useState([]);

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
          setClinics(response.data.results);
        })
        .catch((error) => console.log(error));
    }
  }, [coordinates]);

  // UPDATE MAP WITH SELECTED CLINIC
  const handleClinicClick = (lat, lng) => {
    setLocation(`${lat},${lng}`);
  };

  if (!isLoaded) {
    return <>Loading ...</>;
  }

  if (!open) return null;

  return (
    <>
      <div className="map-section">
        <div className="map-section__title-x">
          <img
            onClick={onClose}
            className="close-modal"
            src={closeIcon}
            alt="home icon"
          />
          <h1 className="map-section__title">Find the nearest doctor</h1>
        </div>
        <section className="map-container1">
          <div className="map">
            <iframe
              className="map-iframe"
              loading="lazy"
              src={`https://www.google.com/maps/embed/v1/place?key=${mapApi}&q=${location}`}
            ></iframe>
          </div>
          <div className="clinics">
            <form className="map-form" onSubmit={handleSubmit}>
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
            <ul className="clinic-list">
              {clinics.map((clinic, index) => (
                <li
                  className="clinic-list-item"
                  key={index}
                  onClick={() =>
                    handleClinicClick(
                      clinic.detail.geometry.location.lat,
                      clinic.detail.geometry.location.lng
                    )
                  }
                >
                  <div className="name-url">
                    <div className="clinic-name">{clinic.detail.name}</div>
                    {clinic.detail.website && (
                      <a
                        href={clinic.detail.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          className="clinic-url"
                          src={selectIcon}
                          alt="icon"
                        />
                      </a>
                    )}
                  </div>
                  <div className="clinic-rating">
                    {clinic.detail.rating}
                    <img className="star-icon" src={starIcon} alt="Star icon" />
                  </div>
                  <div className="clinic-address">{clinic.detail.vicinity}</div>
                  <div className="clinic-phone">
                    {clinic.detail.formatted_phone_number}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
