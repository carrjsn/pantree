import React from 'react';
import RecipeListEntry from './RecipeListEntry.jsx';

const RecipeList = (props) => (
  <div className='recipes'>
    <h3>Recipes</h3>
    {props.recipes.map(recipe => <RecipeListEntry recipe={recipe} addFavorite={props.addFavorite} recipeLink={props.recipeLink}/>)}
  </div>
)

export default RecipeList;