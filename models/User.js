const mongoose = require('mongoose');
const CategorySchema = require('./Category');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required.']
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        validate: {
            validator: (password) => {
                const re = /\S+@\S+\.\S+/;
                return re.test(password)
            },
            message: "Invalid email."
        },
        unique: [true, 'Email already in use']
    },
    password: {
        type: String,
        required: [true, 'Password is required.'],
        validate: {
            validator: (password) => password.length >= 6 && password.length < 16,
            message: "Password must be between 6 and 16 characters long."
        }
    },
    categories: [CategorySchema]
});

module.exports = User = mongoose.model('user', UserSchema);