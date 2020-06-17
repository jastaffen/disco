const assert = require('assert');
const Category = require('../models/Category');

describe('creates subcategories', () => {
    let category;
    beforeEach(async () => {
        category = new Category({ title: 'Recipes' });
        await category.save();
    });

    it.only('creates a subcategory', async () => {
        const subCategory = new Category({ 
            title: 'Vegetarian', isSubCategory: true, parent: category._id });
        await subCategory.save();
        category.children.push(subCategory);
        await category.save();
        const subCategories = await Category.find({ isSubCategory: true });
        assert(subCategories.length === 1 && category.children.length === 1 && 
            subCategory.parent.toString() === category._id.toString() && !subCategory.isNew)
    })
});