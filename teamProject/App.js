
import React from 'react';
import Garden from './src/screens/garden';
import MiniGame from './src/screens/MiniGame';

const isMafia = false;

export default class extends React.Component{
  render(){
    return isMafia ?  <MiniGame/> : <Garden/>;}
  }