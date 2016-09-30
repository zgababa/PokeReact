'use strict';

import React, { PropTypes } from 'react';
import Radium from 'radium';
import get from 'lodash.get';

const styles = {
  image : {
    position : 'absolute',
    top : '200px',
    left : '144px'
  },
  loading : {
    position : 'absolute',
    top : '200px',
    left : '39px',
    width : '300px'
  },
  starting : {
    position : 'absolute',
    top : '146px',
    left : '36px',
    width : '300px'
  }
};


class Screen extends React.Component {
  constructor() {
    super();
    this.state = { isStarting : true };
  }

  componentDidMount() {
    return setTimeout(() => this.setState({ isStarting : false }), 1900);
  }

  render() {
    return (
      <div>
        { this.state.isStarting ?
          <img role="presentation" style={styles.starting} src="img/init.gif" /> :
          <img role="presentation" style={styles.image} src={get(this.props, 'pokemon.img')} />
        }
      </div>
    );
  }
}

Screen.propTypes = {
  isLoading : PropTypes.bool,
  isStarting : PropTypes.bool,
  pokemon : PropTypes.object
};

export default new Radium(Screen);
