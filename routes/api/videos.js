const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const config = require('config');
const API_KEY = config.get('APIKEY')
const axios = require('axios');
const Video = require('../../models/Video');

const URL = (id) => {
    return `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails&id=${id}&key=${API_KEY}`;
}

const fetchVideoData = async id => {
    const res = await axios.get(URL(id));
    const { url, width, height } = res.data.items[0].snippet.thumbnails.maxres;
    const { duration } = res.data.items[0].contentDetails;
    const arr = duration.split('M');
    const videoLength = (parseInt(arr[0].slice(2)) * 60) + parseInt(arr[1].slice(0,1));
    return { url, width, height, videoLength };

}

// @action          POST
// desc             CREATE VIDEO AND ADD TO CATEGORY
// access           PRIVATE
router.post('/:category_id', auth, async (req, res) => {
    const { title, videoUrl } = req.body;
    const category = await Category.findById(req.params.category_id);
    if (!category) return res.status(400).send('Could not find category.');
    try {
        
        const video = new Video({ title, videoUrl });
        const validationRes = video.validateSync();
        if (validationRes) return res.json(validationRes);
        const [ meta, vidId ] = videoUrl.split('=');
        
        // add belongs to associations to video
        video.user = req.user.id;
        video.category = category._id;
        const { url, width, height, videoLength } = await fetchVideoData(vidId);
        video.thumbnail = { url, width, height };
        video.videoLength = videoLength;
        await video.save();

        // add has many associations to category
        category.videos.push(video);
        await category.save();

        res.status(200).json(video);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @action          GET
// desc             GETS ALL VIDEOS BY CURRENT USER
// access           PRIVATE
router.get('/', auth, async (req, res) => {
    try {
        const videos = await Video.find({ user: req.user.id });
        res.json(videos);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

// @action          GET/SHOW
// desc             GETS A VIDEO BY IDEA
// access           PRIVATE
router.get('/:video_id', auth, async (req, res) => {
    try {
        const video = await Video.findById(req.params.video_id);
        if (!video) return res.status(400).send('Video not found.');
        res.json(video);
    } catch (err) {
        console.error(err.message);
        if (err.path === '_id') return res.status(400).send('Video not found.');
        res.status(500).send('Server Error');
    }
});

// @action          PATCH/EDIT VIDEO
// desc             EDITS A VIDEOS TITLE OR URL
// access           PRIVATE
router.patch('/:video_id', auth, async (req, res) => {
    const { title, videoUrl } = req.body;
    let video;
    try {
        video = await Video.findById(req.params.video_id);
        if (!video) return res.status(400).send('Video not found.');
        video.set('title', title);
        video.set('videoUrl', videoUrl);
        if (videoUrl !== video.videoUrl) {
            const { url, width, height, videoLength } = await fetchVideoData(vidId);
            video.thumbnail = { url, width, height };
            video.videoLength = videoLength; 
        }
        await video.save();
        res.json(video)
    } catch (err) {
        console.error(err.message);
        if (err.path === '_id') return res.status(400).send('Video not found.');
        const validationRes = video.validateSync();
        if (validationRes) {
            return res.status(400).json(validationRes);
        }
        res.status(500).send('Server Error')
    }
});

// @action          DELETE
// desc             DELETES A VIDEO AND REMOVES ITS EXISTENCE FROM DEPENDENCIES
// access           PRIVATE
router.delete('/:video_id', auth, async (req, res) => {
    try {
        const video = await Video.findById(req.params.video_id);
        const category = await Category.findById(video.category);
        const categoryWithoutVideo = category.videos.filter(vid => vid.toString() !== video._id.toString());
        category.videos = categoryWithoutVideo;
        await category.save();
        await video.remove();
        res.json('Video Deleted')
    } catch (err) {
        console.error(err.message);
        if (err.path === '_id') return res.status(400).send('Video not found.');
        res.status(500).send('Server Error');
    }
});

module.exports = router;