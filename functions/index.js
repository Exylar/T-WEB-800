const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);
admin.firestore().settings({ignoreUndefinedProperties: true});

const axios = require('axios');
const key = "AIzaSyBRI2B04d_nxpi8TWHmQUI_KjrUj1_X9_Q";

exports.searchPlaceFromId = functions.https.onCall(async (data) => {
  try {
    let adresses = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${data.search}&key=${key}`)
    return adresses.data.results;
  } catch (e) {
    console.error(e);
    return (e);
  }
})