import React from 'react';
import Radium from 'radium';
import get from 'lodash.get';

import Screen from './Screen.jsx';
import Paddle from './Paddle.jsx';
import ScreenInfo from './ScreenInfo.jsx';
import DetailInfo from './DetailInfo.jsx';
import client from '../client';

const styles = {
  background : {
    backgroundImage : 'url(pokedex.png)',
    backgroundRepeat : 'no-repeat',
    height : '600px',
    position : 'relative'
  }
};

@Radium
class Pokedex extends React.Component {
  constructor() {
    super();
    this.state = { i : 1, isLoading : true };
    this.arrowRight = this.arrowRight.bind(this);
    this.arrowLeft = this.arrowLeft.bind(this);
  }
  componentDidMount() {
    this.makeRequest(this.state.i);
  }
  makeRequest(index) {
    this.setState({
      isLoading : true
    });
    return client.getPokemon(index).then((res) => {
      return this.setState({
        pokemon : get(res, 'body.pokemon'),
        i : index,
        isLoading : false
      });
    });
  }
  arrowRight() {
    return this.makeRequest(this.state.i + 1);
  }
  arrowLeft() {
    if (this.state.i - 1) {
      return this.makeRequest(this.state.i - 1);
    }
  }
  render() {
    return (
      <div style={styles.background}>
        <Screen pokemon={this.state.pokemon} />
        <Paddle arrowRight={this.arrowRight} arrowLeft={this.arrowLeft} />
        <ScreenInfo pokemon={this.state.pokemon} />
        <DetailInfo pokemon={this.state.pokemon} />
      </div>
    );
  }
}

export default Pokedex;
