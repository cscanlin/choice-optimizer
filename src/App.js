import React, { Component } from 'react';
import './App.css';

import Row from './components/Row.jsx';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // orderedChoices: [],
      orderedChoices: ['a'],
      // name_choices: {},
      name_choices: {'x': {'a':1}, 'y': {'a':3}, 'z': {'a':2}},
    }
  }

  handleCellChange(e) {
    console.log(e);
  }

  render() {
    return (
      <div className="App">
        <Row
          key={`choice-row`}
          name={'Choices:'}
          orderedChoices={this.state.orderedChoices}
          handleCellChange={this.handleCellChange}
        />
        {Object.keys(this.state.name_choices).map(name =>
          <Row
            key={`row-${name}`}
            name={name}
            orderedChoices={this.state.orderedChoices}
            rowData={this.state.name_choices[name]}
            handleCellChange={this.handleCellChange}
          />
        )}
      </div>
    );
  }
}

export default App;
