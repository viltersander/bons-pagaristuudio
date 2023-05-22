// import React from 'react';
// import { GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';

// const MapComponent = withScriptjs(
//   withGoogleMap(() => (
//     <GoogleMap
//       defaultZoom={18}
//       defaultCenter={{ lat: 58.25256462128469, lng: 22.484175652315106 }}
//       options={{
//         disableDefaultUI: true, // Disable default user interface controls

//         styles: [
//           // Custom map styles can be added here
//         ],
//       }}
//     >
//       <Marker position={{ lat: 58.25256462128469, lng: 22.484175652315106 }} />
//     </GoogleMap>
//   ))
// );

const ContactsPage: React.FC = () => {
//   const googleMapsApiKey = ''; // Replace with your actual API key

  return (
    <div className="p-6">
    <div id="contact" style={{ position: 'relative', height: '400px' }}>
      {/* <MapComponent
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}`}
        loadingElement={<div className="h-full" />}
        containerElement={<div className="h-full" />}
        mapElement={<div className="h-full" />}
      /> */}
      <div className="absolute top-6 sm:top-10 md:top-10 lg:top-10 left-8 bg-white p-4 shadow-xl border-2 border-black rounded-lg">
        <h2>Böns Pagaristuudio</h2>
        <p>Kohtu 1a, Kuressaare, Estonia</p>
        <p>Tel 5335 8141</p>
        <p>bonspagar@gmail.com</p>
      </div>
      <div className="absolute top-64 sm:top-16 md:top-16 lg:top-16 right-16 sm:right-12 md:right-12 lg:right-12
       bg-white p-4 shadow-xl border-2 border-black rounded-lg">
        <h2>Avatud</h2>
        <p>T - P kell 9.00 - 16.00</p>
        <p>E - SULETUD</p>
      </div>

    </div>
    </div>
  );
};

export default ContactsPage;