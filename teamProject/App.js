
import React from 'react';
import FlowerMain from './flower';

const isMafia = false;

export default class extends React.Component{
  render(){
    return isMafia ?  null : <FlowerMain/>;}
  }