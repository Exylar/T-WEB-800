import usePlanId from "hooks/usePlanId";
import React, { useState, useEffect } from "react";
import { ArrowLeft, Map, CheckSquare, DollarSign, Share, Edit3 } from "react-feather";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "components/Form/Button";
import SidebarModal from "components/SidebarModal";
import TextInput from "components/Form/TextInput";
import CheckboxInput from "components/Form/CheckboxInput";
import useFirebaseTrip from "hooks/useTrip";
import useUser from "contexts/user";

const Nav = (props) => {
  const { children, className } = props;
  const history = useHistory();
  const [ctx] = useUser();
  const [page, setPage] = useState(null);
  const planId = usePlanId();
  const [modal, setModal] = useState(false);
  const [tripTitle, setTripTitle] = useState("");
  const [tripPublic, setTripPublic] = useState(false);

  const { getTrip, updateTrip, deleteTrip, trip} = useFirebaseTrip();

  useEffect(() => {
    const page = history.location.pathname.split("/")[3];
    setPage(page);
  }, [history.location.pathname]);

  const inactiveClassName = "text-white p-2 rounded-t cursor-pointer font-semibold text-sm flex items-center";
  const inactiveStyle = { backgroundColor: "rgba(0, 0, 0, 0.2)" };

  const activeClassName = "text-blue-600 p-2 rounded-t cursor-pointer font-semibold text-sm flex items-center";
  const activeStyle = { backgroundColor: "rgba(255, 255, 255, 1)" };

  const _onShare = () => {
    navigator.clipboard.writeText("http://localhost:3000/trips/" + planId)
    toast.info("L'id du plan a été copié dans le presse-papier");
  }

  const _onSubmit = () => {
    updateTrip(tripTitle, tripPublic, trip.id);
    setModal(false)
  }

  useEffect(async () => {
   if (planId) {
    let res = await getTrip(planId);
    setTripTitle(res.data().title);
    setTripPublic(res.data().public);
   }
  }, [planId])

  return (
    <div className="bg-gray-200" style={{ minHeight: "calc(100vh - 64px)" }}>
      <div className="bg-gray-200" style={{ minHeight: "calc(100vh - 64px)" }}>
        <div className="h-60 z-0 bg-gradient-to-r to-green-400 from-blue-500 w-full"></div>
        {/* header */}
        <div className="absolute top-3 flex justify-between items-center w-full">
          <div className="flex items-center px-3 w-full">
            <ArrowLeft color="white" size={32} className="cursor-pointer" onClick={() => history.push("/trips")} />
            <span className="ml-2 text-xl text-white">
              {/* display the title of the page */}
              {(trip && trip.data() ? trip.data().title : "")}
            </span>

            <span className="text-xl text-white ml-auto flex">
                {(trip && trip.data() && trip.data().owner == ctx.user.uid) && (
                  <Edit3 size={22} color="white" className="cursor-pointer mr-3" onClick={() => setModal(true)}  />
                )}
                
                {(trip && trip.data() && trip.data().public == true) && (
                <Share size={22} color="white" className="cursor-pointer" onClick={_onShare}  />
                )}
            </span>
          </div>
        </div>
        {/* body */}
        <div className="absolute top-20 w-full px-3" style={{height: "calc(100vh - 200px)"}}>
          <div className="flex" style={{ columnGap: 5 }}>
            <span className={page === "plan" ? activeClassName : inactiveClassName} style={page === "plan" ? activeStyle : inactiveStyle}
              onClick={() => history.push(`/trips/${planId}/plan`)}>
              <Map size={18} className="mr-1" />
              Plan
            </span>
            <span className={page === "todo" ? activeClassName : inactiveClassName} style={page === "todo" ? activeStyle : inactiveStyle}
              onClick={() => history.push(`/trips/${planId}/todo`)}>
              <CheckSquare size={18} className="mr-1" />
              Todos
            </span>
            <span className={page === "expense" ? activeClassName : inactiveClassName} style={page === "expense" ? activeStyle : inactiveStyle}
              onClick={() => history.push(`/trips/${planId}/expense`)}>
              <DollarSign size={18} className="mr-1" />
              Expenses
            </span>
          </div>
          {/* content */}
          <div className={`h-full bg-white rounded rounded-tl-none p-3 ${className ?? ""}`} style={{ minHeight: "16rem" }}>
            {children}
          </div>
        </div>
      </div>
      <SidebarModal  title="Modifier votre voyage " isOpen={modal} toggle={() => setModal(false)}>
        <TextInput onChange={setTripTitle} value={tripTitle} placeholder="Rando vers le Mordor" label="Nom du voyage" />
        <CheckboxInput onChange={setTripPublic} value={tripPublic} sublabel="Permet à d'autes personnes éditer le voyage" label="Disponible au public" className="mt-6" />

        <div className="flex items-center justify-center mt-10 mb-2">
          <div className="mr-3">
            <Button color="danger" onClick={() => {deleteTrip(planId); history.push("/trips")}}>Supprimer</Button>
            </div>
          <div>
            <Button color="success" onClick={_onSubmit}>Modifier</Button>
          </div>
        </div>
      </SidebarModal>
    </div>
  )
}

export default Nav;