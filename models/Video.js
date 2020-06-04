const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VideoSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title required.']
    },
    videoUrl: {
        type: String,
        required: [true, 'URL required.']
    },
    category: {
        type: Types.Schema.ObjectId
    }
})