const assert = require('assert');
const Category = require('../models/Category');
const User = require('../models/User');

describe('Create a category', () => {
    let joe;
    beforeEach(async () => {
        joe = new User({ name: 'Joe', email: 'j@j.j', password: 'Radiohead' });
        await joe.save()
    });

    it('Saves a category', async () => {
        const category = new Category({ title: 'Recipes' });
        category.user = joe;
        await category.save();
        joe.categories.push(category);
        assert(
            !category.isNew && 
            joe.categories[0]._id.toString() === category._id.toString()
        );
    });

    it('ensures title is given', async () => {
        const category = new Category({ title: undefined });
        const validationRes = category.validateSync();
        const { message } = validationRes.errors.title;
        assert(message === 'Category needs a title.');
    });

    it('disallows invalid records from getting saved', async () => {
        const category = new Category({ title: undefined });
        try {
            await category.save();
        } catch (validationRes) {
            const { message } = validationRes.errors.title;
            assert(message === 'Category needs a title.');
        }
    });

});