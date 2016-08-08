"use strict";

import React from 'react';
import Radium from 'radium';
import get from 'lodash.get';

const ScreenInfo = (props) => {
  return (
    <div style={styles.info}>{get(props, 'pokemon.name')}</div>
  );
};

export default Radium(ScreenInfo);

const styles = {
  info : {
    position: 'absolute',
    top: '215px',
    left: '515px',
    color: 'whitesmoke',
    fontWeight : 'normal',
    textTransform : 'uppercase'
  }
};
