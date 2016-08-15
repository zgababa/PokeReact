'use strict';

import React from 'react';
import Radium from 'radium';
import get from 'lodash.get';

const ScreenInfo = (props) => {
  return (
    <div style={styles.idPokemon}>{get(props, 'pokemon.orderFormatted')}</div>
  );
};

export default Radium(ScreenInfo);

const styles = {
  idPokemon : {
    position: 'absolute',
    top: '467px',
    left: '621px',
    color: 'whitesmoke',
    fontWeight : 'normal',
  }
};
