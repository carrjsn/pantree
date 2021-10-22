const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/recipes', {useNewUrlParser: true, useUnifiedTopology: true}, (err, connect) => {
  if (err) {
    console.log('error connecting to database');
  } else {
    console.log('successfully connected to mongo database');
  }
});

const schema = mongoose.Schema({
  title: String,
  imageUrl: String,
  spoonId: Number
});

const Recipe = mongoose.model('Recipe', schema);

module.exports = Recipe;

