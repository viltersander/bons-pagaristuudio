import React from 'react';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';

const ContactsPage = () => {
  const googleMapsApiKey = 'AIzaSyC7xG5UbeQARp72cC9nufHX7TRxpOZoK_8'; // Replace with your actual API key

  const mapOptions = {
    disableDefaultUI: true,
    styles: [
      // Custom map styles can be added here
    ],
  };

  return (
    <div id="contact" style={{ position: 'relative', height: '400px' }}>
      <div className="p-6">
        <LoadScript googleMapsApiKey={googleMapsApiKey}>
          <GoogleMap
            mapContainerStyle={{ height: '100%', width: '100%' }}
            center={{ lat: 58.25256462128469, lng: 22.484175652315106 }}
            zoom={18}
            options={mapOptions}
          >
            <Marker position={{ lat: 58.25256462128469, lng: 22.484175652315106 }} />
          </GoogleMap>
        </LoadScript>

        <div className="absolute top-6 sm:top-10 md:top-10 lg:top-10 left-8 bg-white p-4 shadow-xl border-2 border-black rounded-lg">
          <h2>Böns Pagaristuudio</h2>
          <p>Kohtu 1a, Kuressaare, Estonia</p>
          <p>Tel 5335 8141</p>
          <p>bonspagar@gmail.com</p>
        </div>
        <div className="absolute top-64 sm:top-16 md:top-16 lg:top-16 right-16 sm:right-12 md:right-12 lg:right-12 bg-white p-4 shadow-xl border-2 border-black rounded-lg">
          <h2>Avatud</h2>
          <p>T - P kell 9.00 - 16.00</p>
          <p>E - SULETUD</p>
        </div>
      </div>
    </div>
  );
};

export default ContactsPage;
