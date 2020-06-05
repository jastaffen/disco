const assert = require('assert');
const User = require('../models/User');
const Video = require('../models/Video');
const Category = require('../models/Category');

describe("Ensures Associations Work Properly", () => {
    let joe, category, video;

    beforeEach(async () => {
        joe = new User({ name: 'Joe', email: 'j@j.j', password: 'Radiohead' });
        category = new Category({ title: 'Recipes' });
        video = new Video({ title: 'Chicken', videoUrl: 'https://www.youtube.com/watch?v=txKUTx5fNbg' });

        joe.categories.push(category);
        category.user = joe;
        category.videos.push(video);
        video.category = category;
        video.user = joe;

        await joe.save();
        await category.save();
        await video.save();
    });

    it('User has many Categories', async () => {
        const user = await User.findOne({ name: 'Joe' });
        assert(user.categories.length === 1);
    });

    it('Category has many Videos', async () => {
        const category = await Category.findOne({ title: 'Recipes' });
        assert(category.videos.length === 1);
    });

    it('Category Belongs to a User', async () => {
        const category = await Category.findOne({ title: 'Recipes' });
        assert(joe.categories[0]._id.toString() === category._id.toString());
    });

    it('Video belongs to a Category', async () => {
        const video = await Video.findOne({ title: 'Chicken' });
        assert(category.videos[0]._id.toString() === video._id.toString());
    });

    it('Video belongs to a User', async () => {
        const user = await User.findOne({ name: 'Joe' });
        assert(video.user._id.toString() === user._id.toString());
    });
});