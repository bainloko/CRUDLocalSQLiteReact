/*
* código de aula por @diegonevesdafontoura, adaptação pra function e diversas limpezas no projeto por @bainloko
* DDM I, DDM II
* 19/11/2021, 25/01/2022, 21/02/2022
*/

import * as React from 'react';
import Home from './src/home/home_page';
import DatabaseInit from './src/database/inicializacao';

export default function App(props){
  React.useEffect(() => {
    new DatabaseInit();
    console.log("Banco de Dados inicializado!");
    console.log("Sistema inicializado!");
  }, []);

  return (
    <Home />
  );
};