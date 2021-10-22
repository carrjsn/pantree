import React from 'react';

const PantryItem = (props) => (
  <li>{props.ingredient}</li>
)

// make stateful class because the pantry ingredients will need to be updated

export default PantryItem;