const API_KEY = require('../config/config.js');
const axios = require('axios');

// takes ingredients as array
exports.getRecipes = (ingredients, callback) => {
  let params = `?apiKey=${API_KEY.key}&ingredients=${ingredients.join(',')}&ranking=2`;

  // TODO ajax request to spoonacular API goes here
  axios.get(`https://api.spoonacular.com/recipes/findByIngredients${params}`)
  .then(results => {
    // console.log('API fetch recipe results', results.data);
    callback(null, results.data);
    // the callback will take results.data and send it back to the server for it to respond back to client
  })
  .catch((err) => {
    console.log('error fetching recipes from API');
    callback(err, null);
  })

  // using test DATA -- put some code here

}

// add new method here for getting the recipe source URL getRecipeUrl on click
exports.getRecipeUrl = (id, callback) => {

  let params = `?apiKey=${API_KEY.key}&includeNutrition=false`;

  axios.get(`https://api.spoonacular.com/recipes/${id}/information${params}`)
  .then((result) => {
    callback(null, result.data.sourceUrl);
  })
  .catch((err) => {
    console.log('failed to retreive recipe data');
    callback(err, null);
  });
}