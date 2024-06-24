const express = require('express');
const path = require('path');
const { collection,  getDocs, addDoc, Timestamp, doc, updateDoc } = require('firebase/firestore');
const db = require('./connection.js');

const applicantRoute = express.Router();
const colRef = collection(db, 'applicants')
applicantRoute.get('/', (req, res) => {
    getDocs(colRef).then((snapshot) => {
        let applicants = []
        snapshot.docs.forEach((doc) => {
            applicants.push({ ...doc.data(), id: doc.id })
        })
        res.json(applicants);
    })
})
applicantRoute.post("/", async (req, res, next) => {
    addDoc(colRef, {
        name: req.body.name,
        gender: req.body.gender,
        dateofbirth: req.body.dateofbirth,
        address: req.body.address,
        phone: req.body.phone,
        parent: req.body.parent,
        parentphone: req.body.parentphone
    })
    res.json({
        "message" : "Added to messages collection"
    })
})
applicantRoute.put('/:id', async (req, res) => {
    const {id} = req.params;
    const ref = doc(db, "applicants", id)
    await updateDoc(ref, req.body)
    res.json({"message" : "Updated at id " + id})
})
applicantRoute.delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      await deleteDoc(doc(db, 'applicants', id))
      res.json({ "message": 'applicants Deleted' });
    } catch (error) {
      res.json({"message": error})
    }
  });
module.exports = applicantRoute;