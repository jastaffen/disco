const assert = require('assert');
const Video = require('../models/Video');
const Category = require('../models/Category');

describe('Delete Videos', async () => {
    let video, category;

    beforeEach(async () => {
        video = new Video({ title: 'Best Chicken', videoUrl: 'https://www.youtube.com/watch?v=txKUTx5fNbg' });
        category = new Category({ title: 'Recipe' });
        category.videos.push(video);
        await video.save();
        await category.save();
    });

    it('deletes a video and deletes it from its dependencies', async () => {
        const videosWithoutVid = category.videos
            .filter(vid => vid._id.toString() !== video._id.toString() );
        category.videos = videosWithoutVid;
        await category.save();
        await video.remove();
        const vid = await Video.findOne({ title: 'Best Chicken' });
        assert( vid === null && category.videos.length === 0 );
    });
})