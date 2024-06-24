const mongoose = require('mongoose');
require('dotenv').config();

const { Recipe } = require('./models/recipe');

// Łączenie się z bazą danych
mongoose.connect(process.env.DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
  // Pobieranie wszystkich przepisów
  return Recipe.find({});
})
.then(recipes => {
  console.log('Recipes:', recipes);
  mongoose.connection.close();
})
.catch(err => {
  console.error('Error retrieving recipes:', err);
  mongoose.connection.close();
});
