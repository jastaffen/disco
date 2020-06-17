const mongoose = require('mongoose');
const config = require('config');
const db = config.get('testURI');

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
    const { users, categories, videos } = mongoose.connection.collections;
    users.drop(() => {
        categories.drop(() => {
            videos.drop(() => {
                done();
            });
        });
    });
});