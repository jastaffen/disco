const assert = require('assert');
const Video = require('../models/Video');

describe('updates video', () => {
    let video;

    beforeEach(async () => {
        video = new Video({ 
            title: 'Best Salmon', 
            videoUrl: "https://www.youtube.com/watch?v=txKUTx5fNbg" });
        await video.save();
    });

    it.only('Updates a video', async () => {
        video.set('title', 'Good Salmon Recipe');
        await video.save();
        assert( video.title === 'Good Salmon Recipe' );
    });

    it.only('Ensures an update is valid', async () => {
        video.set('title', undefined);
        try {
            await video.save();
        } catch (validationRes) {
            const { message } = validationRes.errors.title;
            assert( message === 'Title required.' );
        }
    });

})