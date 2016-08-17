'use strict';

import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Pokedex from './Pokedex.jsx';
import Screen from './components/Screen.jsx';
import Paddle from './components/Paddle.jsx';
import ScreenInfo from './components/ScreenInfo.jsx';
import DetailInfo from './components/DetailInfo.jsx';

describe('Pokedex', () => {
  it('Should have a Screen', () => {
    const component = shallow(<Pokedex />);
    expect(component.find(Screen)).to.have.length(1);
  });
  it('Should have a Paddle', () => {
    const component = shallow(<Pokedex />);
    expect(component.find(Paddle)).to.have.length(1);
  });
  it('Should have a ScreenInfo', () => {
    const component = shallow(<Pokedex />);
    expect(component.find(ScreenInfo)).to.have.length(1);
  });
  it('Should have a DetailInfo', () => {
    const component = shallow(<Pokedex />);
    expect(component.find(DetailInfo)).to.have.length(1);
  });
  it('Should have a Screen', () => {
    const component = shallow(<Pokedex />);
    expect(component.find(Screen)).to.have.length(1);
  });
});
