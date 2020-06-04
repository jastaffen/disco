const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// @action          POST/CREATE
// desc             SIGN UP/CREATE A USER
// access           Public
router.post('/', (req, res) => {
    const { username, email, password } = req.body;
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

