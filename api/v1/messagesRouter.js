const express = require('express');
const path = require('path');
const { collection,  getDocs, addDoc, Timestamp } = require('firebase/firestore');
const db = require('./connection.js');

const msgRoute = express.Router();
const colRef = collection(db, 'messages')
msgRoute.get('/', (req, res) => {
    getDocs(colRef).then((snapshot) => {
        let msg = []
        snapshot.docs.forEach((doc) => {
            msg.push({ ...doc.data(), id: doc.id })
        })
        res.json(msg);
    })
})
msgRoute.post("/", async (req, res, next) => {
    addDoc(colRef, {
        email: req.body.email,
        name: req.body.name,
        subject: req.body.subject,
        messages: req.body.messages
    })
    res.json({
        "message" : "Added to messages collection"
    })
})
module.exports = msgRoute;