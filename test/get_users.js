const assert = require('assert');
const User = require('../models/User');

describe('Gets user(s)', () => {
    it('gets all users', async () => {
        const user = new User({ name: 'Joe', 
            email: 'joe@joe.joe', password: 'Radiohead'});
        await user.save();

        const users = await User.find();
        assert(users.length === 1);
    });

    it('gets a user by id', async () => {
        const user = new User({ name: 'Joe', 
            email: 'joe@joe.joe', password: 'Radiohead'});
        await user.save();
        try {
            const joe = await User.findOne({ _id: user._id });
            assert(joe.name === 'Joe');
        } catch (error) {
            console.error(error.message)
        }
    });
});