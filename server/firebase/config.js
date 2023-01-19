const firebase = require('firebase-admin');

const serviceAccount = require('../firebase/jenfra-671c9-firebase-adminsdk-9zhi0-2c5d1b14f3.json');

// Initialize Firebase
firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://jenfra-671c9-default-rtdb.firebaseio.com"
});
const database = firebase.database();

module.exports = database;