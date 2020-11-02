
import React from 'react';
import{createDrawerNavigator} from '@react-navigation/drawer';
import Loading from './app2';


const Drawer = createDrawerNavigator();

export default class extends React.Component{
  render(){
    return <Loading/>;}
}

