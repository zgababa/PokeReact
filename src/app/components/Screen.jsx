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
  }
};


function Screen(props) {
  return (
    <div>
      { props.isLoading ?
        <img role="presentation" style={styles.loading} src="img/loading.gif" /> :
        <img role="presentation" style={styles.image} src={get(props, 'pokemon.img')} />
      }
    </div>
  );
}

Screen.propTypes = {
  isLoading : PropTypes.boolean
};

export default new Radium(Screen);
