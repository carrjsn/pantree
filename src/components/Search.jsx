import React from 'react';

const Search = (props) => (
  <div className='search'>
    <p>Once you've selected all your ingredients click below!</p>
    <button class='searchbutton' onClick={props.searchRecipes}>Search Recipes</button>
  </div>
)

export default Search;