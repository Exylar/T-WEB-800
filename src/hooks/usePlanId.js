import React, {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";

const usePlanId = () => {
  const history = useHistory();
  const [planId, setPlanId] = useState(null);
  
  useEffect(() => {
    setPlanId(history.location.pathname.split("/")[2]);
  }, [history.location.pathname])

  return (planId);
}

export default usePlanId;