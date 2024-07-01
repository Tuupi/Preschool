const express = require('express');
const path = require('path');
const { collection,  getDocs, addDoc, Timestamp, doc, updateDoc, getDoc, deleteDoc } = require('firebase/firestore');
const db = require('./connection.js');
const { getPackedSettings } = require('http2');

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
    try {
        // Validate the incoming data
        if (!req.body.name || !req.body.gender || !req.body.dateofbirth || !req.body.address || !req.body.phone || !req.body.parent || !req.body.parentnum) {
            return res.status(400).json({ error: 'Missing required fields', fieldval: req.body });
        }

        // Add the new applicant to the collection
        await addDoc(colRef, {
            name: req.body.name,
            gender: req.body.gender,
            dateofbirth: req.body.dateofbirth,
            address: req.body.address,
            phone: req.body.phone,
            parent: req.body.parent,
            parentnum: req.body.parentnum
        });

        // Return a success response
        res.status(201).json({ message: 'Added to applicants collection' });
    } catch (err) {
        // Handle errors
        console.error('Error adding applicant:', err);
        res.status(500).json({ error: 'Error adding applicant' });
    }
});
// applicantRoute.get('/delete/:id', async (req, res, next) => {
//     try {
//       applicantRoute.delete({url: `/${req.params.id}`}).then(res.json({"message" : "Routed"}))
//     } catch (error) {
//       res.json({"message": error})
//     }
//   });

applicantRoute.get('/:id', async (req, res) => {
    const {id} = req.params;
    const ref = doc(db, "applicants", id)
    const data = await getDoc(ref)
    if(data.exists){
        res.render('applicant', {'applicant' : data.data(), 'id' : data.id})
    } else {
        res.json({"message" : "applicant not found"})
    }
    
})

applicantRoute.put('/:id', async (req, res, next) => {
    try {
        // Get the applicant ID from the request parameters
        const { id } = req.params;

        // Validate the incoming data
        if (JSON.stringify(req.body) === '{}') {
            return res.status(400).json({ error: 'No data provided to update' });
        }

        // Get a reference to the applicant document
        const ref = doc(db, "applicants", id);

        // Check if the document exists
        const docSnapshot = await getDoc(ref);
        if (!docSnapshot.exists()) {
            return res.status(404).json({ error: 'Applicant not found' });
        }

        // Update the applicant document
        await updateDoc(ref, req.body);

        // Return a success response
        res.json({ message: `Updated applicant with ID ${id}` });
    } catch (err) {
        // Handle errors
        console.error('Error updating applicant:', err);

        // Check the error code and provide a more specific error response
        if (err.code === 'permission-denied') {
            return res.status(403).json({ error: 'You do not have permission to update this applicant' });
        } else if (err.code === 'not-found') {
            return res.status(404).json({ error: 'Applicant not found' });
        } else if (err.code === 'internal') {
            return res.status(500).json({ error: 'Internal server error' });
        } else {
            return res.status(500).json({ error: 'Error updating applicant' });
        }
    }
});

applicantRoute.delete('/:id', async (req, res, next) => {
    try {
        // Get the applicant ID from the request parameters
        const { id } = req.params;

        // Get a reference to the applicant document
        const ref = doc(db, 'applicants', id);

        // Check if the document exists
        const docSnapshot = await getDoc(ref);
        if (!docSnapshot.exists()) {
            return res.status(404).json({ error: 'Applicant not found' });
        }

        // Delete the applicant document
        await deleteDoc(ref);

        // Return a success response
        res.json({ message: 'Applicant deleted' });
    } catch (error) {
        // Handle errors
        console.error('Error deleting applicant:', error);
        if (errpr.code === 'permission-denied') {
            return res.status(403).json({ error: 'You do not have permission to delete this applicant' });
        } else {
            return res.status(500).json({ error: 'Error deleting applicant' });
        }
    }
});

module.exports = applicantRoute;