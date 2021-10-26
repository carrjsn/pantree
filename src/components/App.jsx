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
      ingredients: [],
      recipes: [],
      favorites: []
    }
  }

  componentDidMount() {
    this.getFavorites();
  }

  getFavorites() {
    axios.get('/favorites')
    .then((results) => {
      this.setState({
        favorites: results.data
      });
    })
    .catch((err) => {
      throw err;
    })
  }

  addToFavorites(recipe) {
    let options = {
      title: recipe.title,
      imageUrl: recipe.image,
      spoonId: recipe.id
    }

    axios.post('/favorites', options)
      .then(() => {
        console.log('client got db save success message')
        setTimeout(this.getFavorites.bind(this), 10);
      })
      .catch((err) => {
        throw err;
        console.log('client: error saving fav to db')
      });
  }

  removeFromFavorites(id) {
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
     this.setState({
       ingredients: this.state.ingredients.concat(item)
     });
  }

  goToRecipePage(id) {
    console.log('id', id);
    axios.post('/recipe', {spoonId: id})
    .then(() => {
      console.log('success')
    })
    .catch(() => {
      console.log('error redirecting to new page')
    });
  }

  searchRecipes () {
    if (!this.state.ingredients.length) {
      alert('please add ingredients to your pantry');
      return;
    }

    axios.post('/searchrecipes', {ingredients: this.state.ingredients})
      .then((results) => {
        this.setState({
          recipes: []
        });
        return results;
      })
      .then((results) => {
        this.setState({
          recipes: results.data,
          ingredients: []
        });
      })
      .catch((err) => {
        console.log('react axios err', err);
      })
      .then(() => {
        console.log(this.state);
      })
  }


  render() {
    return (
      <div id='main'>
        <div class='header'>
          <h1>Pantry</h1>
        </div>
        <Pantry ingredients={this.state.ingredients} addPantryItem={this.addPantryItem.bind(this)}/>
        <Search searchRecipes={this.searchRecipes.bind(this)}/>
        <div className='bottom-content'>
          <RecipeList recipes={this.state.recipes} addFavorite={this.addToFavorites.bind(this)} recipeLink={this.goToRecipePage}/>
          {/* <Favorites favorites={this.state.favorites} removeFavorite={this.removeFromFavorites.bind(this)}/> */}
        </div>
      </div>
    )
  }
}

export default App;
