const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../../models/User');
const Category = require('../../models/Category');
const auth = require('../../middleware/auth');


const USER_NOT_FOUND = { msg: 'user not found.' };

const checkForUser = user => {
    return !user && res.status(400).json({ msg: USER_NOT_FOUND });
}

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


// @action          GET/SHOW
// desc             get a user by id
// access           Private
router.get('/:user_id', auth, async (req,res) => {
    try {
        const user = await User.findOne({ _id: req.params.user_id }).select('-password');

        checkForUser(user);

        res.json(user);

    } catch (err) {
        console.error(err.message);
        if (err.path === '_id') {
            return res.status(400).json(USER_NOT_FOUND);
        }
        res.status(500).send('Server Error');
    }  
});

// @action          PATCH/EDIT
// desc             EDIT A USER
// access           PRIVATE
router.patch('/:user_id', auth, async (req, res) => {

    const { name, email, password } = req.body;
    let user = await User.findOne({ _id: req.params.user_id });

    checkForUser(user);

    const userFields = {};
    if (name) userFields.name = name;
    if (email) userFields.email = email;
    if (password) userFields.password = password;

    try {

        user = await User.findOneAndUpdate(
            { _id: req.params.user_id }, 
            { $set: userFields }, 
            { new: true }
        ).catch(err => res.status(400).json({ msg: err }));
        await user.save();
        return res.json(user);

    } catch (err) {
        console.error(err.message);

        if (err.path === '_id') {
            return res.status(400).json({ msg: 'User Not Found' });
        }

        // ensure incoming updates follow database validations
        const validationRes = user.validateSync();

        if (validationRes) {
            return res.json(validationRes.errors)
        }

        res.status(500).send('Server Error');
    }

});

// @action          POST
// desc             ADD A CATEGORY
// access           PRIVATE
router.post('/category/:user_id', auth, async (req, res) => {
    const { title } = req.body;
    const user = await User.findById(req.params.user_id);
    const category = await new Category({ title });
    try {
        for (let cat of user.categories) {
            if (cat.title === category.title) {
                res.status(400).json({ msg: 'Category by that name already exists' });
            }
        }
        category.user = user._id;
        await category.save();
        user.categories.push(category);
        await user.save();
        res.json(category);
    } catch (err) {
        console.error(err.message);
        const validationRes = category.validateSync();
        if (validationRes) {
            res.status(400).json(validationRes.errors);
        }
        res.status(500).send('Server Error');
    }
});

// @action          DELETE
// desc             DELETES A USER
// access           PRIVATE
router.delete('/:user_id', auth, async (req, res) => {
    try {
        const deletedChef = await User.findOneAndRemove({ _id: req.params.user_id });
        return res.json(deletedChef);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;

