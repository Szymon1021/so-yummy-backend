// script.js

require('dotenv').config(); // Wczytujemy konfigurację z pliku .env

const mongoose = require('mongoose');
const request = require('request-promise-native'); // Używamy request-promise-native do prostszych żądań HTTP
const { User } = require('./models/user'); // Zaimportuj model użytkownika
const { Recipe } = require('./models/recipe'); // Przykładowy model przepisu (jeśli używasz)

async function main() {
  try {
    // Połączenie z bazą danych MongoDB
    await mongoose.connect(process.env.DB_HOST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'db-contacts', // Możesz zmienić dbName na nazwę swojej bazy danych
    });

    // Rejestracja nowego użytkownika
    const signupResponse = await request({
      method: 'POST',
      uri: 'http://localhost:3000/api/auth/signup', // Zmień na odpowiednią ścieżkę URL
      body: {
        name: 'Nadinka',
        
        email: 'nadia@example.com',
        password: 'Password123!'
      },
      json: true
    });

    console.log('Signup response:', signupResponse);

    // Logowanie zarejestrowanego użytkownika
    const loginResponse = await request({
      method: 'POST',
      uri: 'http://localhost:3000/api/auth/login', // Zmień na odpowiednią ścieżkę URL
      body: {
        email: 'nadia@example.com',
        password: 'Password123!'
      },
      json: true
    });

    console.log('Login response:', loginResponse.data.token);

    // Pobranie zasobu chronionego (przykład: pobranie profilu użytkownika)
    const profileResponse = await request({
      method: 'GET',
      uri: 'http://localhost:3000/api/auth/current', // Zmień na odpowiednią ścieżkę URL
      headers: {
        Authorization: `Bearer ${loginResponse.data.token}`
      },
      json: true
    });

    console.log('Profile response:', profileResponse);

    // Zamykanie połączenia z bazą danych
    await mongoose.connection.close();

  } catch (error) {
    console.error('Error:', error);
    process.exit(1); // Zakończ proces z kodem błędu
  }
}

// Wywołanie funkcji głównej
main();
