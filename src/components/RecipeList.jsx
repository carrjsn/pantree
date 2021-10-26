import React from 'react';
import RecipeListEntry from './RecipeListEntry.jsx';

const RecipeList = (props) => (
    <div className='recipes'>
      {props.recipes.length ? <h3>Recipe Results</h3> : null}
      {props.recipes.map(recipe => <RecipeListEntry recipe={recipe} addFavorite={props.addFavorite} recipeLink={props.recipeLink}/>)}
    </div>
)

export default RecipeList;