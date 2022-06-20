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

test('Create Trip', async () => {

        
    let res = await firestore().collection("trips").add({
        title: "Test Trip",
        createdAt: new Date(),
        updatedAt: new Date(),
        owner: "User Test",
        public: true
    })

    expect(res.id).toBeDefined();
    id = res.id;

});

test('Modify Trip', async () => {

    try {
        firestore().collection("trips").doc(id).update({
            title: "Test Trip Modified"
        })
        expect(true)
    } catch (e) {
        expect(false)
    }
});


test('Get Trip', async () => {

    try {
        firestore().collection("trips").doc(id).get();
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


