const mongoose = require('mongoose');
require('dotenv').config();
const { Recipe } = require('./models/recipe');
mongoose.connect(process.env.DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'db-contacts',
});



Recipe.find({}, (err, recipes) => {
  if (err) {
    console.error('Error retrieving recipes:', err);
  } else {
    console.log('Recipes:', recipes);
  }
  // Zamknij połączenie z bazą danych, jeśli to konieczne
  mongoose.connection.close();
});

  
