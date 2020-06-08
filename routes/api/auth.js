const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../../models/User');
const auth = require('../../middleware/auth');

// @route     POST/LOGIN
// @desc      Authenticate user & get token
// @access    Public
router.get('/', auth, async (req,res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route     POST/LOGIN
// @desc      Authenticate user & get token
// @access    Public
router.post('/', async (req, res) => {
    const { email, password } = req.body;
    try {
        // see if user exists
        const user = await User.findOne({ email });
        
        if (!user) return res.json('Invalid credentials.');
        
        // compare password
        const isMatch = await bcrypt.compare(password, user.password);
    
        if (!isMatch) {
            return res.json('Invalid credentials.');
        }

        const payload = {
            user: {
                id: user.id,
            }
        }

        jwt.sign(
            payload, 
            config.get('jwtSecret'),
            { expiresIn: 360000 }, 
            (err, token) => {
                if (err) throw err;
                res.json({ token, id: user._id });
            }
        );


    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;