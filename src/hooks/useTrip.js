import { useState } from 'react';
import firebase from 'firebase';
import useUser from 'contexts/user';

const firestore = firebase.firestore();

const useFirebaseTrip = () => {
  const [trip, setTrip] = useState(null);
  const [trips, setTrips] = useState([]);
  const [ctx] = useUser();

  const getTrips = async () => {
    try {
      const subscribe = firestore.collection("trips").onSnapshot(s => {
        setTrips(s.docs.filter(doc => {
          if (doc.data().owner === ctx.user.uid ) {
            return doc
          }
        }).map(doc => {
          return { uid: doc.id, ...doc.data() }
        }));
      })
      return subscribe;
    } catch (e) {
      return false
    }
  }

  const getTrip = async (planId) => {
    try {
      const trip = await firestore.collection("trips").doc(planId).get()
      setTrip(trip)
      return trip;
    } catch (e) {
      return false
    }
  }

  const addTrip = async (tripTitle, ctx, tripPublic) => {
    try {
      await firestore.collection("trips").add({
        title: tripTitle,
        createdAt: new Date(),
        updatedAt: new Date(),
        owner: ctx.user.uid,
        public: tripPublic
      })
      return true;
    } catch (e) {
      return false
    }
  }

  const updateTrip  = async (tripTitle, tripPublic, planId) => {
    try {
      await firestore.collection("trips").doc(planId).update({
        title: tripTitle,
        public: tripPublic,
        updatedAt: new Date()
      });
      return true;
    } catch (e) {
      return false;
    }
  }

  const deleteTrip = async (planId) => {
    try {
      await firestore.collection("trips").doc(planId).delete();
      return true;
    } catch (e) {
      return false;
    }
  }

  return {getTrip, getTrips, addTrip, updateTrip, deleteTrip, trip, trips};
}

export default useFirebaseTrip;