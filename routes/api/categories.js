const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Category = require('../../models/Category');
const User = require('../../models/User');
const Video = require('../../models/Video');

// @action          GET
// desc             GETS ALL CATEGORIES BY A USER
// access           PRIVATE
router.get('/', auth, async (req,res) => {
    try {
        const categoriesByUser = await Category.find({ user: req.user.id, isSubCategory: false }).select('title videos children');
        res.json(categoriesByUser);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

// @action          PATCH
// desc             EDIT A CATEGORY
// access           PRIVATE
router.patch('/:category_id', auth, async (req, res) => {
    const { title } = req.body;
    const category = await Category.findById(req.params.category_id);
    try {
        category.set('title', title);
        await category.save();
        res.json(category);
    } catch (err) {
        console.error(err.message);
        if (err.path === '_id') {
            return res.status(400).json({ msg: 'Category Not Found' });
        }
        const validationRes = category.validateSync();
        if (validationRes) return res.status(400).json(validationRes);
        res.status(500).send('Server Error');
    }
});

// @action          DELETE
// desc             DELETES A CATEGORY
// access           PRIVATE
router.delete('/:category_id', auth, async (req, res) => {
    
    try {
        const category = await Category.findByIdAndRemove(req.params.category_id);
        const user = await User.findById(req.user.id);

        // delete category from current user's categories
        const categories = user.categories
            .filter(cat => cat._id.toString() !== category._id.toString());
        user.categories = categories;

        await user.save();

        // delete that category's videos
        for (let video of category.videos) {
            await video.remove();
        }
        

        res.json(category);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @action          POST
// desc             CREATES A SUBCATEGORY
// access           PRIVATE
router.post('/sub-categories/:category_id', auth, async (req, res) => {
    const { title } = req.body;
    const category_id = req.params.category_id;
    try {
        const subCategory = new Category({ title, isSubCategory: true, parent: category_id });
        const category = await Category.findById(category_id);
        subCategory.user = req.user.id;
        await subCategory.save();
        category.children.push(subCategory);
        await category.save();
        res.json(subCategory);
    } catch (err) {
        console.error(err.message);
        if (err.path === '_id') {
            return res.status(400).json({ msg: 'Category Not Found' });
        }
        const validationRes = category.validateSync();
        if (validationRes) return res.status(400).json(validationRes);
        res.status(500).send('Server Error');
    }
});

// @action          GET
// desc             RETRIEVES A CATEGORY'S SUBCATEGORIES
// access           PRIVATE
router.get('/sub-categories/:category_id', auth, async (req,res) => {
    const category_id = req.params.category_id;
    try {
        const category = await Category.findById(category_id).populate({
            path: 'children',
            model: 'category'
           });

        res.json(category.children);
    } catch (err) {
        console.error(err.message);
        if (err.path === '_id') {
            return res.status(400).json({ msg: 'Category Not Found' });
        }
        res.status(500).send('Server Error')
    }
});

module.exports = router;