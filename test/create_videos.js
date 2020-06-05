const assert = require('assert');
const Video = require('../models/Video');
const Category = require('../models/Category');
const User = require('../models/User');

describe('Creates a Video', () => {
    let joe, category, video;

    beforeEach(async () => {
        joe = new User({ name: 'Joe', email: 'j@j.j', password: 'Radiohead' });
        category = new Category({ title: 'Recipes' });
        await category.save();
        joe.categories.push(category);
        await joe.save();  
    });

    it('creates a video and associates it', async () => {
        const video = new Video({ title: 'Roast Chicken', videoUrl: 'https://www.youtube.com/watch?v=txKUTx5fNbg' });
        await video.save();
        category.videos.push(video);
        await category.save();
        assert(!video.isNew && category.videos.length === 1);
    });

    it('ensures video params passed in', async () => {
        const video = new Video({ title: undefined, videoUrl: undefined });
        const validationRes = video.validateSync();
        const { title, videoUrl } = validationRes.errors;
        assert(
            title.message === 'Title required.',
            videoUrl.message === 'URL required.'
        );
    });

    it('ensures valid url', async () => {
        const video = new Video({ title: 'Best Salmon', videoUrl: "htt://www.yo"});
        const validationRes = video.validateSync();
        const { message } = validationRes.errors.videoUrl;
        assert( message === 'Invalid URL.' );
    })

    it('disallows invalid records form getting saved', async () => {
        const video = new Video({ title: undefined, videoUrl: 'https://www.youtube.com/watch?v=txKUTx5fNbg' });
        try {
            await video.save();
        } catch (validationRes) {
            const { message } = validationRes.errors.title;
            assert(message === 'Title required.') 
        }
    })
});