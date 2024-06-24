const mongoose = require('mongoose');
const app = require('./app');
const { DB_HOST, PORT } = process.env;

mongoose.set('strictQuery', false);

mongoose
  .connect(DB_HOST, {
    dbName: 'db-contacts',
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection error:', err.message);
    process.exit(1);
  });
