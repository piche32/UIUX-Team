
import React from 'react';
import Garden from './src/screens/garden'

const isMafia = false;

export default class extends React.Component{
  render(){
    return isMafia ?  null : <Garden/>;}
  }