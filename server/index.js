const express = require('express');
const bodyParser = require('body-parser')
const recipeFetcher = require('../spoonacular/recipeFetcher.js');
// import database model
const Recipe = require('../db/connect.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('./dist'));

// SEARCH RECIPES from API
app.post('/searchrecipes', (req, res) => {
  recipeFetcher.getRecipes(req.body.ingredients, (err, recipes) => {
    if (err) {
      console.log('error getting recipes')
      res.sendStatus(400);
    } else {
      res.status(200);
      res.send(recipes);
    }
  });

});

// GET RECIPE URL from API for individual recipe on click
app.post('/recipe', (req, res) => {
  console.log('req.body', req.body);
  recipeFetcher.getRecipeUrl(req.body.spoonId, (err, recipeUrl) => {
    if (err) {
      console.log('error getting url server');
      res.sendStatus(400);
    } else {
      res.status(200);
      res.send(recipeUrl);
      // res.redirect() to url page of recipe? not working CORS... :(
    }
  })
});

// FAVORITES - database interaction ------------------
app.get('/favorites', (req, res) => {
  console.log('favorites from DB');
  Recipe.find({}, (err, results) => {
    if (err) {
      console.log('error fetching favs server side');
      res.status(400);
      res.send();
    } else {
      console.log('successful fetch favs from database')
      res.status(200);
      res.json(results);
    }
  });
  // res.send('favs');
});


app.post('/favorites', (req, res) => {
  console.log('favorite recipe coming into server', req.body);
  // save recipe to database
  let doc = new Recipe({
    // add title
    title: req.body.title,
    // image url
    imageUrl: req.body.imageUrl,
    // spponacular Id
    spoonId: req.body.spoonId
  });

  // save current recipe to db collection
  doc.save((err) => {
    if (err) {
      console.log('error saving recipe to db');
      res.status(400);
      res.send();
    } else {
      console.log('successfully saved recipe to database');
      res.status(200);
      res.send('success');
    }
  });

})

app.delete('/favorites', (req, res) => {
  // use req.url for delete requests - separate id from url string
  let id = req.url.split('=')[1];
  Recipe.remove({spoonId: id}, (err) => {
    if (err) {
      console.log('error deleting fav server');
      res.status(400);
      res.send();
    } else {
      console.log('successfully remove fav server');
      res.status(200);
      res.send();
    }
  })
});



const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
})