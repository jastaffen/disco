const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    title: {
        type: String,
        required: [true, 'Category needs a title.']
    },
    isSubCategory: {
        type: Boolean,
        default: false
    },
    children: [this],
    videos: [{
        type: Schema.Types.ObjectId,
        ref: 'video'
    }]
});

module.exports = CategorySchema;