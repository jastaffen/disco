const mongoose = require('mongoose');
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
            validator: (email) => {
                const re = /\S+@\S+\.\S+/;
                return re.test(email)
            },
            message: "Invalid email."
        },
        unique: [true, 'Email already in use']
    },
    password: {
        type: String,
        required: [true, 'Password is required.'],
        validate: {
            validator: (password) => password.length >= 6,
            message: "Password must be at least 6 characters long."
        }
    },
    categories: [{
        type: Schema.Types.ObjectId,
        ref: 'category'
    }]
});

module.exports = User = mongoose.model('user', UserSchema);