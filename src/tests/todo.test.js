
import { useState } from "react";
import firebase from "firebase";

import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMiMu8kt3ZI-bl59y68HVDw2XkRgXy-FA",
  authDomain: "tweb800-58175.firebaseapp.com",
  projectId: "tweb800-58175",
  storageBucket: "tweb800-58175.appspot.com",
  messagingSenderId: "43543176675",
  appId: "1:43543176675:web:f30d811f34374f27126cd6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firestore = firebase.firestore;

let id = "";
let todoid = "";

test('Create Trip', async () => {

        
    let res = await firestore().collection("trips").add({
        title: "Trip Todo",
        createdAt: new Date(),
        updatedAt: new Date(),
        owner: "User",
        public: true
    })

    expect(res.id).toBeDefined();
    id = res.id;

});

test('Add Toto to Trip', async () => {

    try {
        let res = await firestore().collection("trips").doc(id).collection("todos").add({
            title: "Todo Test",
            status: "todo",
            createdAt: new Date(),
            updatedAt: new Date()
          });
        expect(true)
        todoid = res.id;
    } catch (e) {
        expect(false)
    }
});


test('Check todo', async () => {

    try {
        firestore().collection("trips").doc(id).collection("todos").doc(todoid).update({
            status: "done",
            updatedAt: new Date()
        });
        expect(true)
    } catch (e) {
        expect(false)
    }
});

test('Delete Toto', async () => {

    try {
        firestore().collection("trips").doc(id).collection("todos").doc(todoid).delete();
        expect(true)
    } catch (e) {
        expect(false)
    }
});


test('Delete Trip', async () => {

    try {
        firestore().collection("trips").doc(id).delete();
        expect(true)
    } catch (e) {
        expect(false)
    }
});
