import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '8px', // Rounded edges with a radius of 8px
};

const center = {
  lat: 58.2525485015731,
  lng: 22.4841616263166,
};

const mapOptions = {
  disableDefaultUI: true,
  clickableIcons: false,
};

const InfoWindowContent = () => (
  <div>
    <h2 className="font-bold text-sm">Böns Pagaristuudio</h2>
    <div className="font-normal tracking-wide">
      <p>Kohtu 1a, Kuressaare, Eesti</p>
      <p>Tel 5335 8141</p>
      <p>bonspagar@gmail.com</p>
      <h2>Avatud:</h2>
      <p>T - P kell 9.00 - 16.00</p>
      <p>E - SULETUD</p>
    </div>
  </div>
);

export default function SimpleMap() {
  const [infoWindowOpen, setInfoWindowOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const handleMarkerClick = () => {
    setInfoWindowOpen(!infoWindowOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      const mobileSize = window.innerWidth < 780;
      setIsMobile(mobileSize);
      if (!mobileSize) {
        setInfoWindowOpen(false);
      }
    };

    handleResize(); // Initial check

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const infoWindowPosition = {
    lat: center.lat + 0.00000,
    lng: center.lng,
  };

  return (
    <div id="contact" className="p-6" style={{ position: 'relative' }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={18}
        options={mapOptions}
      >
        <Marker position={center} onClick={handleMarkerClick} />

        {infoWindowOpen && isMobile && (
          <InfoWindow position={infoWindowPosition} onCloseClick={() => setInfoWindowOpen(false)}>
            <InfoWindowContent />
          </InfoWindow>
        )}
      </GoogleMap>

      {infoWindowOpen && !isMobile && (
        <InfoWindow position={infoWindowPosition} onCloseClick={() => setInfoWindowOpen(false)}>
          <InfoWindowContent />
        </InfoWindow>
      )}

      <div className="absolute sm:top-10  left-10 bg-white p-4 shadow-xl border-2 border-black rounded-lg hidden smi:block">
        <h2>Böns Pagaristuudio</h2>
        <p>Kohtu 1a, Kuressaare, Eesti</p>
        <p>Tel 5335 8141</p>
        <p>bonspagar@gmail.com</p>
      </div>
      <div className="absolute top-64 sm:top-10 sm:right-10 bg-white p-4 shadow-xl hidden smi:block border-2 border-black rounded-lg">
        <h2>Avatud</h2>
        <p>T - P kell 9.00 - 16.00</p>
        <p>E - SULETUD</p>
      </div>

      <style>
        {`
          .gm-ui-hover-effect {
            transform: scale(1.2); /* Increase the size of the close button */
          }
        `}
      </style>
    </div>
  );
}
