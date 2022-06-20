import React, { useEffect } from "react";
import Map from "components/Map";
import usePlanId from "hooks/usePlanId";

import { Provider as MapProvider } from "contexts/map";
import { Power } from "react-feather";
import firebase from "firebase";
import { useHistory } from "react-router-dom";
import useFirebaseTrip from "hooks/useTrip";
import useUser from "contexts/user";

const auth = firebase.auth();

const Logged = ({ children }) => {

  const planId = usePlanId();
  const [ctx] = useUser();
  const { getTrip } = useFirebaseTrip();

  const history = useHistory();
  const _onClick = () => {
    auth.signOut();
    history.push("/");
  }

  useEffect(async () => {
    if (planId !== null && planId) {
      let trip = await getTrip(planId)
      if (trip.exists) {
        if (trip.data().owner === ctx.user.uid || trip.data().public)
          return true
        else {
          history.push("/trips")
          return false
        }
      } else {
        history.push("/trips")
        return false
      }
    }
  }, [planId])

  return (
    <div>
      {/* header */}
      <div className="w-full h-16 flex items-center px-4">
        {/* left */}
        <div>
          <span>Le Logo</span>
        </div>
        {/* right */}
        <div className="flex-1 flex justify-end">
          <Power className="text-blue-600 cursor-pointer" onClick={_onClick} size={28} />
        </div>
      </div>
      {/* content */}
      <div className="flex items-stretch" style={{ height: "calc(100vh - 64px)" }}>
        <MapProvider>
          <div className="bg-gray-200 flex-1 overflow-y-auto relative" style={{ maxWidth: 500 }}>
            {children}
          </div>
          <Map />
        </MapProvider>
      </div>
    </div>
  )
}

export default Logged;