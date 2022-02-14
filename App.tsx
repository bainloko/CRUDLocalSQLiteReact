/*
* @bainloko
* DDM I
* 19/11/2021
*/

import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './src/home/home_page';
import DatabaseInit from './src/database/inicializacao';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    new DatabaseInit;
    console.log("Banco de Dados inicializado!");
    console.log("Sistema inicializado!");
  }

  render(){
    return (
      <Home />
    );
  }
};