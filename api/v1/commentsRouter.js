const express = require('express');
const db = require('./connection.js');
const cmntsRoute = express.Router();

const { collection,  getDocs, addDoc, Timestamp } = require('firebase/firestore');
const colRef = collection(db, 'comments')
cmntsRoute.use(express.urlencoded({extended: true}))
cmntsRoute.get("/", (req, res) => {
    getDocs(colRef).then((snapshot) => {
        let comments = []
        snapshot.docs.forEach((doc) => {
            comments.push({ ...doc.data(), id: doc.id })
        })
        res.json(comments);
    })
})

cmntsRoute.post("/", (req, res) => {
    try {
        // Validate the incoming data
        if (!req.body.name || !req.body.email || !req.body.comment) {
            return res.status(400).json({ error: 'Missing required fields', fieldsValue: req.body.name + ' ' + req.body.email + ' ' + req.body.comment });
        }

        // Add the new comment to the collection
        addDoc(colRef, {
            name: req.body.name,
            email: req.body.email,
            comment: req.body.comment,
            date: Timestamp.now()
        });

        // Return a success response
        res.status(201).json({ message: 'Added to Comments collection' });
    } catch (err) {
        // Handle errors
        console.error('Error adding comment:', err);
        res.status(500).json({ error: 'Error adding comment' });
    }
})

cmntsRoute.put('/:id', async (req, res) => {
    const {id} = req.params;
    const ref = doc(db, "comments", id)
    await updateDoc(ref, req.body)
    res.json({"message" : "Updated at id " + id})
})
cmntsRoute.delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      await deleteDoc(doc(db, 'comments', id))
      res.json({ "message": 'comments Deleted' });
    } catch (error) {
      res.json({"message": error})
    }
  });
module.exports = cmntsRoute;