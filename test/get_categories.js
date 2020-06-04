const assert = require('assert');
const Category = require('../models/Category');
const User = require('../models/User');

describe('Gets Categories', () => {
    let joe, category;

    beforeEach(async () => {
        joe = new User({ name: 'Joe', email: 'j@j.j', password: 'Radiohead' });
        category = new Category({ title: 'Recipes' });
        joe.categories.push(category);
        category.user = joe;
        await joe.save();
        await category.save();
    });

    it('gets all categories', async () => {
        const categories = await Category.find({});
        assert(categories.length === 1);
    });

    it('gets all categories by user', async () => {
        const user = await User.findOne({ name: 'Joe' });
        assert(user.categories[0]._id.toString() === category._id.toString());
    });

    it('gets category by id', async () => {
        const cat = await Category.findOne({ _id: category._id });
        assert(cat._id.toString() === category._id.toString());
    });
    
});