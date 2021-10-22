import React from 'react';
import FavoriteEntry from './FavoriteEntry.jsx';

const Favorites = (props) => {
  let recipeUpdate = <p className='recipeUpdate'></p>;
  if (!props.favorites.length) {
    recipeUpdate = <p className='recipeUpdate'>You currently have no favorite recipes</p>
  }
  return (
    <div className='favorites'>
      <h3>Your Favorites</h3>
      {props.favorites.map(fav => <FavoriteEntry recipe={fav} removeFavorite={props.removeFavorite}/>)}
      {recipeUpdate}
    </div>
  )
}


export default Favorites;