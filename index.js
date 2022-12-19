const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })

  // ITERATION 2
  .then(() => Recipe.create({
      title: 'Tequeños',
      level: 'Easy Peasy',
      ingredients: ['wheat flour', 'eggs', 'white cheese', 'oil'],
      cuisine: 'venezuelan',
      dishType: 'snack',
      duration: 60,
      creator: 'Josefina Hernández',
      created: 1920-01-01,
    }))
  .then((recipe) => console.log(recipe.title))

  // ITERATION 3
  .then(() => Recipe.insertMany(data)
    .then((recipes) => {
      for (recipe of recipes) {
        console.log(recipe.title);
      }
    }))

  // ITERATION 4
  .then(() => Recipe.findOneAndUpdate(
      { title: 'Rigatoni alla Genovese' },
      { duration: 100 }
    ))
  .then(() => console.log('-Updated recipe-'))

  // ITERATION 5
  .then(() => Recipe.deleteOne(
    { title: 'Carrot Cake' },
  ))
  .then(() => console.log('-Removed recipe-'))

  // ITERATION 6
    .then(() => {
      mongoose.disconnect();
    })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });