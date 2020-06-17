const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    title: {
        type: String,
        required: [true, 'Category needs a title.'],
        unique: [true, 'Category with this name already exists.']
    },
    isSubCategory: {
        type: Boolean,
        default: false
    },
    children: [{
        type: Schema.Types.ObjectId,
        ref: 'category'
    }],
    parent: {
        type: Schema.Types.ObjectId,
        default: null
    },
    videos: [{
        type: Schema.Types.ObjectId,
        ref: 'video'
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
});

module.exports = Category = mongoose.model('category', CategorySchema);