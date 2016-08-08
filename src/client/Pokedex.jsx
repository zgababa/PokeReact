import React from 'react';
import Radium from 'radium';
import request from 'superagent';
import get from 'lodash.get';
import {render} from 'react-dom';

import Screen from './components/Screen.jsx';
import Paddle from './components/Paddle.jsx';
import ScreenInfo from './components/ScreenInfo.jsx';
import DetailInfo from './components/DetailInfo.jsx';

import client from './client';

@Radium
class Pokedex extends React.Component {
  constructor() {
    super();
    this.state = {i : 1, isLoading : true};
    this.arrowRight = this.arrowRight.bind(this);
    this.arrowLeft = this.arrowLeft.bind(this);
  }
  getQuery(index) {
    return `
      {
        pokemon(id: ${index}) {
          name
          orderFormatted
          img
        }
      }
    `
  }
  requestOp(index) {
    this.setState({
      isLoading : true,
    });
    const uri = 'http://localhost:8080?graphqlQuery=' + encodeURIComponent(this.getQuery(index));
    return client.request
      .get(uri)
      .end((err, res) => {
        return this.setState({
          pokemon : res.body.pokemon,
          i : index,
          isLoading : false
        });
      });
  }
  arrowRight() {
    this.requestOp(this.state.i + 1);
  }
  arrowLeft() {
    this.requestOp(this.state.i - 1);
  }
  componentDidMount() {
    this.requestOp(this.state.i);
  }
  render() {
    return (
      <div style={styles.background}>
        <Screen isLoading={this.state.isLoading} pokemon={this.state.pokemon} />
        <Paddle arrowRight={this.arrowRight} arrowLeft={this.arrowLeft}/>
        <ScreenInfo pokemon={this.state.pokemon} />
        <DetailInfo pokemon={this.state.pokemon} />
      </div>
    );
  };
}

const styles = {
  background : {
    backgroundImage: 'url(img/pokedex.png)',
    backgroundRepeat: 'no-repeat',
    height: '600px',
    position: 'relative'
  }
};

render(<Pokedex/>, document.getElementById('app'));
