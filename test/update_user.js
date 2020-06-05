const assert = require('assert');
const User = require('../models/User');

describe('Update a user', () => {
    it("updates a user's name", async () => {
        const user = new User({ name: 'Joe', email: 'j@j.j', password: 'Radiohead' });
        await user.save();
        user.set('name', 'John');
        await user.save();
        const users = await User.find();
        assert(users.length === 1 && users[0].name === 'John');
    });
})