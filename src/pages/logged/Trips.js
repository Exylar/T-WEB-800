import React, { useState, useEffect } from "react";
import { PlusCircle } from "react-feather";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

import useUser from "contexts/user";
import Spinner from "components/Spinner";
import Button from "components/Form/Button";
import SidebarModal from "components/SidebarModal";
import TextInput from "components/Form/TextInput";
import CheckboxInput from "components/Form/CheckboxInput";
import useFirebaseTrip from "hooks/useTrip";

const Trips = () => {
  const [ctx] = useUser();
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  const [modal, setModal] = useState(false);
  const [tripTitle, setTripTitle] = useState("");
  const [tripPublic, setTripPublic] = useState(false);

  const { getTrips, addTrip, trips } = useFirebaseTrip();

  useEffect(() => {
    getTrips();
    setLoading(false);
  }, [ctx.user.uid]);

  const _onSubmit = async () => {
    try {
      if (tripTitle.length === 0) {
        toast.error("Veuillez renseigner un titre");
      } else {
        addTrip(tripTitle, ctx, tripPublic);
        setModal(false);
        setTripTitle("");
        setTripPublic(0);
      }
    } catch (e) {
      console.error(e);
      toast.error(e.message);
    }
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl text-blue-600 font-semibold" style={{ height: 42 }}>Vos voyages ({trips?.length})</h1>
        <Button color="primary" className="flex" style={{ gap: 5 }} onClick={() => setModal(true)}>
          <PlusCircle size={24} color="#2563EB" />
          Nouveau voyage
        </Button>
      </div>
      {loading ?
        <div className="flex items-center justify-center" style={{ height: "calc(100vh - 140px)" }}>
          <Spinner size="lg" color="primary" />
        </div>
        : trips.length === 0 ?
          <div className="flex items-center justify-center" style={{ height: "calc(100vh - 140px)" }}>
            <span className="text-xl text-blue-600">Vous n'avez aucun voyage planifié actuellement</span>
          </div>
          :

          <div className="my-4">
            {trips.map(trip => (
              <div className="rounded bg-white p-2 mb-2 flex justify-between items-center" key={trip.uid}>
                {trip.title}
                <div className="flex items-center">
                  {
                    trip.public ? <span className="text-green-600 items-end mr-2">Public</span> : <span className="text-red-600 items-end mr-2">Privé</span>
                  }
                  <Button onClick={() => history.push(`/trips/${trip.uid}/plan`)}>Accèder</Button>
                </div>
              </div>
            ))}
          </div>
      }
      <SidebarModal title="Créer un voyage" isOpen={modal} toggle={() => setModal(false)}>
        <TextInput onChange={setTripTitle} value={tripTitle} placeholder="Rando vers le Mordor" label="Nom du voyage" />
        <CheckboxInput onChange={setTripPublic} value={tripPublic} sublabel="Permet à d'autes personnes éditer le voyage" label="Disponible au public" className="mt-6" />

        <div className="flex items-center justify-center mt-10 mb-2">
          <div className="mr-3">
            <Button onClick={() => setModal(false)}>Annuler</Button>
            </div>
          <div>
            <Button color="success" onClick={_onSubmit}>Valider</Button>
          </div>
        </div>
      </SidebarModal>
    </div>
  )
}

export default Trips;