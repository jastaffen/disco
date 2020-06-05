const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../../models/User');

// @action          POST/CREATE
// desc             SIGN UP/CREATE A USER
// access           Public
router.post('/', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = new User({ name, email, password });
        
        // check for errors
        const validationRes = user.validateSync();
        if (validationRes) return res.status(400).json(validationRes);

        // salt and hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        
        await user.save();
        
        const payload = { user: { id: user.id } };

        jwt.sign(
            payload, 
            config.get('jwtSecret'),
            { expiresIn: 360000 }, 
            (err, token) => {
                if (err) throw err;
                // send token
                return res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @action          GET/INDEX
// desc             Get all users
// access           Public
router.get('/', (req, res) => {
    res.send('users route')
});

router.get('/:user_id', (req,res) => {
    res.send('user route')
})

// @action          PATCH/EDIT
// desc             EDIT A USER
// access           PRIVATE
router.get('/edit/:user_id', (req, res) => {
    res.send('edit user route')
});

module.exports = router;

