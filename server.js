const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();

app.use(cors());

connectDB();

app.get('/', (req, res) => res.send('api running'));

app.use(express.json({ extended: false }));

// route definitions
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/categories', require('./routes/api/categories'));
app.use('/api/videos', require('./routes/api/videos'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));