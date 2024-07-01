const express = require('express');
const path = require('path');
const { collection,  getDocs, addDoc, Timestamp, deleteDoc, doc, updateDoc } = require('firebase/firestore');
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
msgRoute.post('/', (req, res, next) => {
    try {
        // Validate the incoming data
        if (!req.body.email || !req.body.name || !req.body.subject || !req.body.message) {
            return res.status(400).json({ error: 'Missing required fields', fieldsValue: req.body.name + ' ' + req.body.email + ' ' + req.body.message + ' ' + req.body.subject });
        }

        // Add the new message to the collection
        addDoc(colRef, {
            email: req.body.email,
            name: req.body.name,
            subject: req.body.subject,
            message: req.body.message
        });

        // Return a success response
        res.status(201).json({ message: 'Added to messages collection' });
    } catch (err) {
        // Handle errors
        console.error('Error adding message:', err);
        res.status(500).json({ error: 'Error adding message' });
    }
})

msgRoute.put('/:id', async (req, res) => {
    const {id} = req.params;
    const ref = doc(db, "messages", id)
    await updateDoc(ref, req.body)
    res.json({"message" : "Updated at id " + id})
})

msgRoute.delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      await deleteDoc(doc(db, 'messages', id))
      res.json({ "message": 'Messages Deleted' });
    } catch (error) {
      res.json({"message": error})
    }
  });



module.exports = msgRoute;