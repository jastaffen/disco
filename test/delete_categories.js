const assert = require('assert');
const Category = require('../models/Category');
const User = require('../models/User');
const Video = require('../models/Video');

describe('Deletes a Category', () => {
    let joe, category, video;

    beforeEach(async () => {
        joe = await new User({ name: 'Joe', email: 'j@j.j', password: 'Radiohead' });
        category = await new Category({ title: 'Recipes' });
        video = await new Video({ title: 'Chicken', videoUrl: 'https://www.youtube.com/watch?v=txKUTx5fNbg' });
        joe.categories.push(category);
        category.user = joe;
        category.videos.push(video);
        video.user = joe;

        await joe.save();
        await category.save();
        await video.save();
    });

    it('Removes a category and deletes it from dependencies', async () => {
        const categoriesWithoutDeleted = joe.categories
            .filter(cat => 
                cat._id.toString() !== category._id.toString() );
        
        joe.categories = categoriesWithoutDeleted;
        const catVideos = category.videos;
        for (let video of catVideos) {
            await video.remove();
        }
        
        const videos = await Video.find({});
        await joe.save();
        await Category.findByIdAndRemove({ _id: category._id });
        const cat = await Category.findOne({ title: 'Recipes' });
        
        assert(cat === null && joe.categories.length === 0 && videos.length === 0);
    });

});