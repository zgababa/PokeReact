'use strict';

import React from 'react';
import { shallow, mount } from 'enzyme';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import Promise from 'bluebird';

import Pokedex from './Pokedex.jsx';
import Screen from './Screen.jsx';
import Paddle from './Paddle.jsx';
import ScreenInfo from './ScreenInfo.jsx';
import DetailInfo from './DetailInfo.jsx';
import client from '../client';

const expect = chai.expect;
const sandbox = sinon.sandbox.create();
chai.use(sinonChai);


describe('Pokedex', () => {
  beforeEach(() => sandbox.stub(client, 'getPokemon'));
  afterEach(() => sandbox.restore());

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

  it('Should getPokemon when initialization', () => {
    client.getPokemon.returns(Promise.resolve());
    mount(<Pokedex />);

    expect(client.getPokemon).to.have.been.calledOnce;
    expect(client.getPokemon).to.have.been.calledWith(1);
  });

  it('Should getPokemon with id + 1 when click on right arrow', () => {
    client.getPokemon.returns(Promise.resolve());
    const component = mount(<Pokedex />);
    component.setState({
      i : 3
    });

    component.find('.Paddle-right').simulate('click');
    expect(client.getPokemon).to.have.been.calledTwice;
    expect(client.getPokemon).to.have.been.calledWith(4);
  });

  it('Should getPokemon with id + 1 when click on left arrow', () => {
    client.getPokemon.returns(Promise.resolve());
    const component = mount(<Pokedex />);
    component.setState({
      i : 3
    });

    component.find('.Paddle-left').simulate('click');

    expect(client.getPokemon).to.have.been.calledTwice;
    expect(client.getPokemon).to.have.been.calledWith(2);
  });
});
