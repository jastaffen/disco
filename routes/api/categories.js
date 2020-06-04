const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', (req,res) => {
    res.send('categories route')
});


module.exports = router;