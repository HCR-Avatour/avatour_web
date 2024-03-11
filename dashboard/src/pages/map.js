import React from "react";
import { useState, useEffect } from "react";
import GoogleMap from "google-map-react";

const MapApp = () => {
  const [position, setPosition] = useState({ latitude: null, longitude: null });

  const Marker = ({ text }) => <div style={{ color: "red" }}>{text}</div>;

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      console.log("Geolocation is not available in your browser.");
    }
  }, []);

  const defaultProps = {
    center: {
      lat: position.latitude,
      lng: position.longitude,
    },
    zoom: 1,
  };

  return (
    // Important! Always set the container height explicitly
    <div>
      <div style={{ height: "100vh", width: "100vw", opacity: 0.5 }}>
        <GoogleMap
          bootstrapURLKeys={{ key: "AIzaSyDFIg5Kl3XDFflf0FZuhOJBIVARcWxQiOE" }}
          defaultCenter={defaultProps.center}
          zoom={defaultProps.zoom}
        >
          <Marker
            lat={position.latitude}
            lng={position.longitude}
            text="Avatour"
          />
        </GoogleMap>
      </div>
    </div>
  );
};

export default MapApp;