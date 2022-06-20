import React, { useState, useEffect } from 'react';
import useUser from 'contexts/user';
import firebase from 'firebase';

const auth = firebase.auth();
const firestore = firebase.firestore();

const useFirebaseAuth = () => {
  const [ctx, setCtx] = useUser();

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(async user => {
      if (firebase.auth().currentUser) {
        let res = await firestore.collection("users").doc(user.uid).get();
        if (res.exists) {
          setCtx({
            user: {
              ...user,
              ...res.data(),
            },
            loading: false
          });
        } else {
          await firestore.collection("users").doc(user.uid).set({
            createdAt: new Date(),
          });
          setCtx({
            user: {
              ...res.data()
            },
            loading: false,
          })
        }
      } else {
        setCtx({
          user: null,
          loading: false
        });
      }
    });
    return subscriber;
  }, [])

  return {user: ctx.user, loading: ctx.loading};
}

export default useFirebaseAuth;