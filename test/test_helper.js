const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

mongoose.Promise = global.Promise;

before(async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true,
            useFindAndModify: false
        })
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
})

beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
        done();
    });
});