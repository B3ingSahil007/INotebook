const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchUser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

//^ ROUTE - 1 : Get all the notes using : GET " /api/notes/createuser ", Login Required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    /*
    * obj = {
    *     Name: 'Rizwana',
    *     Gender: 'Female',
    *     Status: 'Engaged',
    *     ENum: null,
    *     Age: 18,
    *     Course: 'B.Com',
    *     College: 'FD Girls College'
    * }
    * res.json(obj);
    * console.log(req.body);
    * res.send('Hello Sahil.');
    */
    try {

        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})
//^ ROUTE - 2 : Add a new Note using : POST " /api/notes/addnote ", Login Required
router.post('/addnote', [
    body('title', 'Enter a valid title.').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters.').isLength({ min: 5 }),
], fetchuser, async (req, res) => {
    try {

        const { title, description, tag } = req.body;
        //^ If there are errors, return Bad Request and the errors.
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})
//^ ROUTE - 3 : Update an existing Note using : PUT " /api/notes/updatenote ", Login Required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        //^ Create a newNote object
        const newNote = {};
        if (title) {
            newNote.title = title;
        }
        if (description) {
            newNote.description = description;
        }
        if (tag) {
            newNote.tag = tag;
        }

        //^ Find the Note to be Updated and Update-It
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send('Note Not Found !!');
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('User Not Allowed');
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        // res.json({ "Success": "Note Updated Successfully", note: note });
        res.json({ note });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//^ ROUTE - 4 : Delete an existing Note using : DELETE " /api/notes/deletenote ", Login Required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        //^ Find the Note to be Deleted and Delete-It
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send({ "Error": "Note Not Found !!" });
        }
        //^ Allow deletion only if the user owns the note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send({ "Error": "User Not Allowed !!" });
        }
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note Deleted Successfully", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router;