import React, {useState, useEffect} from "react";
import GoogleMapReact from 'google-map-react';
import ReactJson from 'react-json-view';
import useMap from "contexts/map";
import apis from "services/maps";

const Map = () => {
  const [map, setMap] = useMap();

  return (
    <div className="bg-red-300 flex-1">
      <GoogleMapReact
        defaultCenter={{lat: 48.1160277, lng: -1.7584828}}
        defaultZoom={6}
        bootstrapURLKeys={{ key: apis.maps, libraries: 'places' }}
      >
      </GoogleMapReact>
    </div>
  )
}

export default Map;