'use strict';

import React from 'react';
import Radium from 'radium';
import get from 'lodash.get';

const Screen = (props) => {
  return (
    <div>
      { props.isLoading ?
        <img style={styles.loading} src='img/loading.gif'/> :
        <img style={styles.image} src={get(props, 'pokemon.img')}/>
      }
    </div>
  );
};

export default Radium(Screen);

const styles = {
  image : {
    position: 'absolute',
    top: '200px',
    left: '144px',
  },
  loading : {
    position: 'absolute',
    top: '200px',
    left: '39px',
    width: '300px',
  }
};
