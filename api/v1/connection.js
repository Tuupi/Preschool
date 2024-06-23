const { initializeApp } = require('firebase/app')
const { getFirestore, collection, getDocs,
    addDoc,
    Timestamp
} = require('firebase/firestore')

const firebaseConfig = {
    apiKey: "AIzaSyDFnkeNCEUse2BLRAcKvJuKyjpmFicLcdQ",
    authDomain: "preschool-node.firebaseapp.com",
    projectId: "preschool-node",
    storageBucket: "preschool-node.appspot.com",
    messagingSenderId: "452557222180",
    appId: "1:452557222180:web:9e0f02ece79e0d86f803b1",
    measurementId: "G-QDRN2DFZVB"
};

initializeApp(firebaseConfig)

const db = getFirestore()

module.exports = db;