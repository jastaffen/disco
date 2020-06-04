const assert = require('assert');
const Category = require('../models/Category');

describe('Updates a category', async () => {
    const category = new Category({ title: 'Recipes' });
    await category.save();

    it("Updates a category's title", async () => {
        const cat = await Category.findOne({ title: 'Recipes' });
        cat.set('title', 'History');
        await cat.save();
        assert(cat.title === 'History');
    });
    
});