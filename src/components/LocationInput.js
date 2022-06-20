import React, { useState } from "react";
import TextInput from "components/Form/TextInput";
import Button from "components/Form/Button";
import { PlusCircle, Search } from "react-feather";
import useMap from "contexts/map";
import firebase from "firebase";
import apis from "services/maps"
import { toast } from "react-toastify";

const functions = firebase.functions;

const LocationInput = (props) => {
  const {
    className,
  } = props;


  const [map, setMap] = useMap();

  const [locations, setLocations] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const _onSearch = async () => {
    //search place from google geocoding api
    try {
      setLoading(true);

      console.log("searching...");
      let res = await functions.httpsCallable("searchPlaceFromId")({ search });
      console.log(res);

      //setLocations(data);
      setLoading(false);
      //setSearch("");
    } catch (e) {
      toast.error("Une erreur est survenue");
      console.error(e);
      setLocations(null);
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="flex items-stretch mt-4">
        <TextInput value={search}
          onChange={setSearch}
          placeholder="Adress..."
          onEnterPressed={_onSearch}
          className="flex-1" />
        <span className="cursor-pointer bg-blue-600 h-9 ml-3 px-4 rounded text-white flex items-center justify-center hover:bg-blue-800">
          <Search className="cursor-pointer" onClick={_onSearch} />
        </span>
      </div>
      {locations !== null && locations.length > 0 ?
        <div className="flex flex-col">
          {locations.map(location => (
            <div key={location.place_id} className="flex justify-between items-center rounded-lg bg-gray-100 p-3 mb-3">
              <div className="flex items-center">
                <span className="ml-2 select-none">{location.formatted_address}</span>
              </div>
              <div className="flex items-center" style={{ columnGap: 5 }}>
                <Button onClick={() => setMap(location)}>
                  <PlusCircle size={22} color="green" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        : locations !== null && locations.length === 0 ?
          <p>Adresse introuvable</p>
          : <></>}
    </div>
  )
}

export default LocationInput;