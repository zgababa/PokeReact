"use strict";

import React from 'react';
import Radium from 'radium';

const Paddle = (props) => {
  return (
    <div>
      <button style={styles.rightArrow} onClick={props.arrowRight}/>
      <button style={styles.leftArrow} onClick={props.arrowLeft}/>
    </div>
  );
};

export default Radium(Paddle);

const styles = {
  rightArrow : {
    height: '31px',
    width: '32px',
    backgroundColor: 'red',
    position: 'absolute',
    top: '423px',
    left: '299px',
    opacity: 0,
    cursor : 'pointer',
  },
  leftArrow : {
    height: '31px',
    width: '35px',
    backgroundColor: 'blue',
    position: 'absolute',
    top: '423px',
    left: '240px',
    opacity: 0,
    cursor : 'pointer',
  }
};
