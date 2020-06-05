const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../../models/User');

// @route     POST/LOGIN
// @desc      Authenticate user & get token
// @access    Public
router.post('/', async (req, res) => {
    const { email, password } = req.body;
    try {
        // see if user exists
        const user = await User.findOne({ email });
        
        if (!user) return res.status(400).json({ error: 'invalid credentials.' });
        
        // compare password
        const isMatch = await bcrypt.compare(password, user.password);
    
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
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
                res.json({ token });
            }
        );


    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;