import React from 'react';
import PantryItem from './PantryItem.jsx';

class Pantry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };

  }

  changeValue(e) {
    this.setState({
      value: e.target.value
    });
  }

  addItem() {
    // invoke this.props.addPantryItem in here and reset state to be value: ''
    if (this.state.value) {
      this.props.addPantryItem(this.state.value);
    } else {
      alert('please enter an ingredient')
    }
    this.setState({
      value: ''
    });
  }

  render() {
    // grammar check for 1 item
    let ingredientUpdate = <p id='pantrycount'>There are {this.props.ingredients.length} items in your pantry</p>
    if (this.props.ingredients.length === 1) {
      ingredientUpdate = <p id='pantrycount'>There is 1 item in your pantry</p>
    }
    return (
      <div className='pantry'>
        <h3>Your Pantry</h3>
        {ingredientUpdate}
        <ul id='ingredients'>
          {this.props.ingredients.map(item => <PantryItem ingredient={item} />)}
        </ul>
        <input id='ingredient' type='text' autocomplete='off' value={this.state.value} onChange={this.changeValue.bind(this)}></input>
        <button id='add-item' onClick={this.addItem.bind(this)}>Add Ingredients</button>
      </div>
    )
  }
}

export default Pantry;