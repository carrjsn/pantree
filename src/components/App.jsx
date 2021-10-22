import React from 'react';
import Search from './Search.jsx';
import Pantry from './Pantry.jsx';
import Favorites from './Favorites.jsx';
import RecipeList from './RecipeList.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // should all be empty, remove contents after testing
      ingredients: [],
      recipes: [],
      favorites: []
    }
  }

  // METHODS / HANDLERS

  componentDidMount() {
    console.log('app mounted');
    // fetch favorite recipes from database...
    this.getFavorites();
  }

  // --- USER FAVORITES -----------------------------------

  getFavorites() {
    // axios get request to server
    axios.get('/favorites')
    .then((results) => {
      console.log('success fetching favorites', results)
      this.setState({
        favorites: results.data
      });
    })
    .catch(() => {
      console.log('error fetching favorites on client')
    })
  }

  addToFavorites(recipe) {
    // add selected recipe to database
    // maybe options isn't needed - just make sure recipe param is in the correct format and pass that into axios
    let options = {
      title: recipe.title,
      imageUrl: recipe.image,
      spoonId: recipe.id
    }

    axios.post('/favorites', options)
      .then(() => {
        console.log('client got db save success message')
        // auto render
        setTimeout(this.getFavorites.bind(this), 10);
      })
      .catch(() => {
        console.log('client: error saving fav to db')
      });
  }

  removeFromFavorites(id) {
    // should take in spoonacular id
    axios.delete('/favorites', {params: {spoonId: id}})
     .then(() => {
       console.log('deleted successfully');
       setTimeout(this.getFavorites.bind(this), 10);
     })
     .catch(() => {
       console.log('error deleting recipe');
     })
  }

  // PANTRY INGREDIENTS
  addPantryItem(item) {
    //  console.log('item', item)
     this.setState({
       ingredients: this.state.ingredients.concat(item)
     });
  }

  // REDIRECT TO RECIPE URL for instructions
  goToRecipePage(id) {
    console.log('id', id);
    axios.post('/recipe', {spoonId: id})
    .then(() => {
      // nothing?
      console.log('success!!!!!')
    })
    .catch(() => {
      console.log('error redirecting to new page')
    });
  }


  // HANDLE RECIPE SEARCH - API call
  searchRecipes () {
    // check for zero ingredients
    if (!this.state.ingredients.length) {
      alert('please add ingredients to your pantry');
      return;
    }

    // send search ingredients to server
    axios.post('/searchrecipes', {ingredients: this.state.ingredients})
      .then((results) => {
        // reset the recipe array to reset all checkboxes on rerender
        this.setState({
          recipes: []
        });
        return results;
      })
      .then((results) => {
        // save previous query ingredients here in a var?
        // pass to RecipeList somehow so the ingredients are shown with results

        // set state and update recipes with the incoming results
        this.setState({
          recipes: results.data,
          // then erase ingredients in this.state here
          ingredients: []
        });
      })
      .catch((err) => {
        console.log('react axios err', err);
      })
      .then(() => {
        // just for testing, erase this .then() block eventually
        console.log(this.state);
      })
  }


  render() {
    return (
      <div id='main'>
        <h2>Pantree</h2>
        <Pantry ingredients={this.state.ingredients} addPantryItem={this.addPantryItem.bind(this)}/>
        <Search searchRecipes={this.searchRecipes.bind(this)}/>
        <RecipeList recipes={this.state.recipes} addFavorite={this.addToFavorites.bind(this)} recipeLink={this.goToRecipePage}/>
        <Favorites favorites={this.state.favorites} removeFavorite={this.removeFromFavorites.bind(this)}/>
      </div>
    )
  }
}

export default App;
