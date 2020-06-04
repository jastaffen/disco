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
        type: Schema.Types.ObjectId,
        ref: 'category'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
});

module.exports = Video = mongoose.model('video', VideoSchema);