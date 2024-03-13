import React from "react";
import { useState, useEffect } from "react";
import GoogleMap from "google-map-react";

const MapApp = () => {
  const [position, setPosition] = useState({ latitude: null, longitude: null });

  const Marker = ({ text }) => (
    <div
      style={{
        borderRadius: 20,
        backgroundColor: "#4181ec",
        border: "solid",
        color: "#4181ec",
        width: "10px",
        height: "10px",
      }}
    ></div>
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            setPosition({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          function () {
            console.log("error");
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          }
        );
      } else {
        console.log("Geolocation is not available in your browser.");
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const defaultProps = {
    center: {
      lat: position.latitude,
      lng: position.longitude,
    },
    zoom: 15,
  };

  return (
    // Important! Always set the container height explicitly
    <div>
      <div style={{ height: "100vh", width: "100vw" }}>
        <GoogleMap
          bootstrapURLKeys={{ key: "AIzaSyDFIg5Kl3XDFflf0FZuhOJBIVARcWxQiOE" }}
          center={defaultProps.center}
          zoom={defaultProps.zoom}
          options={{ gestureHandling: "none" }}
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
