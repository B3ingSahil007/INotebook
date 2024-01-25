const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchUser');

const JWT_SECRET = 'sahillovesrizzuverymuch';

//^ ROUTE - 1 : Create a User using : POST " /api/auth/createuser ", Doesn't require Auth / No Login Required
router.post('/createuser', [
    body('name', 'Enter a valid Name.').isLength({ min: 3 }),
    body('email', 'Enter a valid E-Mail.').isEmail(),
    body('password', 'Enter a valid Password.').isLength({ min: 5 }),
], async (req, res) => {
    let success = false;
    /*
    * obj = {
        * Name: 'Sahil',
        * Gender: 'Male',
        * Status: 'Engaged',
        * ENum: 6524,
        * Age: 21,
        * Course: 'Information Technology',
        * College: 'SAL College Of Engineering'
    * }
    * res.json(obj);
    * res.send('Hello Sahil Miyawala.');
    * console.log(req.body);
    * const user = User(req.body);
    * user.save();
    */
    //^ If there are errors, return Bad Request and the errors.
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ success, error: error.array() });
    }
    try {
        //^ Check whether the user with the same email exist already.
        let user = await User.findOne({ email: req.body.email });
        //* console.log(user);
        if (user) {
            return res.status(400).json({ success, error: "Sorry, User with this E-Mail already exists." });
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        //^ Create a New-User
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
            plaintextpassword: req.body.password
        })
        //* .then(user => res.json(user))
        //*     .catch(err => {
        //*         console.log(err)
        //*         res.json({ error: 'Please Enter A Unique Value For E-Mail.', message: err.message })
        //*     })
        //* res.send(req.body);
        const data = {
            user: {
                id: user.id,
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        //* console.log(authToken);
        success = true;
        res.json({ success, authToken });
        //* res.json(user);
        //* res.json({ "System": "Details are Verified, Congrats!" });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//^ ROUTE - 2 : Authenticate a User using : POST " /api/auth/login ", Doesn't require Auth / No Login Required
router.post('/login', [
    body('email', 'Enter a valid E-Mail.').isEmail(),
    body('password', 'Password cannot be blank.').exists()
], async (req, res) => {
    let success = false;
    //^ If there are errors, return Bad Request and the errors.
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success = false
            return res.status(404).json({ error: "Please try to login with correct credentials." });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false
            return res.status(404).json({ success, error: "Please try to login with correct credentials." });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//^ ROUTE - 3 : Get     Loggedin User Details using : POST " /api/auth/getuser ", Login Required
router.post('/getuser', fetchuser, async (req, res) => {

    try {
        userID = req.user.id;
        const user = await User.findById(userID).select("-password")
        res.send(user)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router;