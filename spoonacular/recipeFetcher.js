require('dotenv').config();
const axios = require('axios');
const API_KEY = process.env.API_KEY;

exports.getRecipes = (ingredients, callback) => {
  let params = `?apiKey=${API_KEY}&ingredients=${ingredients.join(',')}&ranking=2`;

  axios.get(`https://api.spoonacular.com/recipes/findByIngredients${params}`)
  .then(results => {
    callback(null, results.data);
  })
  .catch((err) => {
    console.log('error fetching recipes from API');
    callback(err, null);
  })

}

exports.getRecipeUrl = (id, callback) => {
  let params = `?apiKey=${API_KEY}&includeNutrition=false`;

  axios.get(`https://api.spoonacular.com/recipes/${id}/information${params}`)
  .then((result) => {
    callback(null, result.data.sourceUrl);
  })
  .catch((err) => {
    console.log('failed to retreive recipe data');
    callback(err, null);
  });
}