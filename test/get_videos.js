const assert = require('assert');
const Video = require('../models/Video');
const Category = require('../models/Category');

describe('Retrieves Videos', () => {
    let video, category;

    beforeEach(async () => {
        category = new Category({ title: 'Recipes' });
        video = new Video({ title: 'Best Salmon', videoUrl: 'https://www.youtube.com/watch?v=txKUTx5fNbg' });
        await video.save();
        category.videos.push(video);
        await category.save();
    });

    it('gets all Videos', async () => {
        const videos = await Video.find({});
        assert(videos.length === 1);
    });

    it('gets a video by id', async () => {
        const vid = await Video.findOne({ _id: video._id });
        assert( vid.title === video.title )
    });

    it('gets all videos by category id', async () => {
        const vid = new Video({ title: 'Chicken', videoUrl: "https://www.youtube.com/watch?v=txKUTx5fNbg" });
        await vid.save();
        category.videos.push(vid);
        await category.save();
        assert( category.videos.length === 2 )
    });

})