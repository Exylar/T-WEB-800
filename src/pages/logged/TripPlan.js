import { useEffect } from "react";
import React from "react";
import Nav from "./_nav";
import LocationInput from "components/LocationInput";
import usePlanId from "hooks/usePlanId";
import { useHistory } from "react-router-dom";



const TripPlan = () => {

  const planId = usePlanId();
  const history = useHistory();

  useEffect(async () => {
    if (planId && planId !== null) {
      if (history.location.pathname === `/trips/${planId}`)
        history.push(`/trips/${planId}/plan`);
    }
  }, [planId])

  return (
    <Nav>
      <LocationInput />
    </Nav>
  )
}

export default TripPlan;