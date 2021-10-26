import React from 'react';

const RecipeListEntry = (props) => (
  <div className='recipe'>
    <img className='recipe-image' src={props.recipe.image} />
    <div className='recipe-info'>
      <div className='recipe-title'>{props.recipe.title}</div>
      <div className='missed-ingredients'>Ingredients missing: {props.recipe.missedIngredientCount}</div>
      <div className='likes'>Likes: {props.recipe.likes}</div>
      <div><a className='recipe-link' href='#' onClick={() => props.recipeLink(props.recipe.id)}>Get Recipe</a></div>
      <div className='favorite-button'>
        <input name='add-favorite' type='checkbox' onClick={() => props.addFavorite({
          title: props.recipe.title,
          image: props.recipe.image,
          id: props.recipe.id
          })}>
        </input>
        <label for='add-favorite'>Add to favorites</label>
      </div>
    </div>
  </div>
)

// will need to pass in spoon_id as props here eventually so it can be added to DB along with other recipe info
// will need that id to retreive the up to date recipe info upon rendering of the page

export default RecipeListEntry;