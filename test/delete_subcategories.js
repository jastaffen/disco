const assert = require('assert');
const Category = require('../models/Category');

describe('deletes a subcategory and deletes it from dependencies', () => {
    let category, subCategory;
    beforeEach(async () => {
        category = new Category({ title: 'Recipes '});
        await category.save();
        subCategory = new Category({ title: 'Barbeque', isSubCategory: true, parent: category._id });
        await subCategory.save();
        category.children.push(subCategory);
        await category.save();
    });

    it.only('deletes a subcategory', async () => {
        // array of category's children without the subcategory to be deleted
        const deletedChild = category.children
            .filter(subCat => subCat._id.toString() !== subCategory._id.toString());
        category.children = deletedChild;
        await category.save();
        await Category.findByIdAndRemove(subCategory._id);
        // number of subcategories in the database should now be 0
        const subCategories = await Category.find({ isSubCategory: true });
        assert(category.children.length === 0 && subCategories.length === 0)
    });
})