/*
* @bainloko
* DDM I
* 20/11/2021
*/

import * as SQLite from 'expo-sqlite';
export const Conexao = {
    getConnection: () => SQLite.openDatabase("database.db"),
};