import React from 'react';

const PantryItem = (props) => (
  <div className='ingredient'>{props.ingredient}</div>
)

// make stateful class because the pantry ingredients will need to be updated

export default PantryItem;