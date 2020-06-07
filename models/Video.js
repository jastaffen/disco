const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VideoSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title required.']
    },
    videoUrl: {
        type: String,
        required: [true, 'URL required.'],
        validate: {
            validator: (videoUrl) => {
                const re = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
                return re.test(videoUrl)
            },
            message: 'Invalid URL.'
        }
    },
    thumbnail: {
        url: {
            type: String
        },
        width: {
            type: Number
        },
        height: {
            type: Number
        }
    },
    videoLength: {
        type: Number,
    },
    pausedAt: {
        type: Number,
        default: 0
    },
    watched: {
        type: Boolean,
        default: false
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