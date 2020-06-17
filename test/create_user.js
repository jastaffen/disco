const assert = require('assert');
const User = require('../models/User');

describe('Creates User', () => {
    it('saves a user', async () => {
        const body = {
            name: 'Joe',
            email: 'joe@joe.joe',
            password: 'Radiohead'
        }
        const joe = new User(body);
        await joe.save();
        assert(!joe.isNew);
    })

    it('ensures each item in user form is given', async () => {
        const body = {
            name: undefined,
            email: undefined,
            password: undefined
        }
        const user = new User(body);
        const validationRes = user.validateSync();
        const { name, email, password } = validationRes.errors;
        
        assert(
            name.message === 'Name is required.' && 
            email.message === 'Email is required.' &&
            password.message === 'Password is required.'
        );
    });
    
    it ('ensures password is between 6 and 16 characters', async () => {
        const body = {
            name: 'Joe',
            email: 'joe@joe.joe',
            password: 'Ra'
        }
        const user = new User(body);
        const validationRes = user.validateSync();
        const { message } = validationRes.errors.password;
        assert(message === 'Password must be at least 6 characters long.');
    });

    it('disallows invalid records from getting saved and that email is invalid', async () => {
        const user = new User({ name: 'Joe', email: 'joe', password: 'Radiohead'})
        try {
            await user.save()
        } catch (validationRes) {
            const { message } = validationRes.errors.email;
            assert(message === 'Invalid email.');
        }
    });

    it('***ensures email is unique***', async() => {
        // not sure how to test this yet unique is not working
    })
})