import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDMiMu8kt3ZI-bl59y68HVDw2XkRgXy-FA",
  authDomain: "tweb800-58175.firebaseapp.com",
  projectId: "tweb800-58175",
  storageBucket: "tweb800-58175.appspot.com",
  messagingSenderId: "43543176675",
  appId: "1:43543176675:web:f30d811f34374f27126cd6"
}

firebase.initializeApp(firebaseConfig);

firebase.firestore().settings({ timestampsInSnapshots: true });
firebase.firestore().settings({ignoreUndefinedProperties: true});