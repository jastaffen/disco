const assert = require('assert');
const User = require('../models/User');

describe('Delete a user', () => {
    it('deletes user by id', async () => {
        joe = new User({ name: 'Joe', email: 'j@j.j', password: 'Radiohead' });
        await joe.save()
        await User.findByIdAndRemove({ _id: joe._id });
        const user = await User.findOne({ name: 'Joe' });
        assert(user === null);
    })
});