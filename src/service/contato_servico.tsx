/*
* @bainloko
* DDM I, DDM II
* 20/11/2021, 25/01/2022
*/

import { Contato } from "../model/Contato";
import { Conexao } from "../database/conexao";
import { Alert } from 'react-native';

const table = "contato";
const db = Conexao.getConnection();

export default class ContatoServico {
    static addData(param : Contato){
        return new Promise((resolve, reject) => db.transaction(
            tx => {
                tx.executeSql(`insert into ${table} (nome, email, cidadeNatural, idade, corOlhos)
                values(?, ?, ?, ?, ?)`,
                [param.nome, param.email, param.cidadeNatural, param.idade, param.corOlhos],
                (_, { insertId, rows }) => {
                    console.log("ID insert " + insertId);
                    resolve(insertId);
                }), (sqlError) => {
                    console.log(sqlError);
                }, (txError) => {
                    console.log(txError);
                }
            }
        )).catch(() => {
            Alert.alert("Não foi possível inserir o contato no Banco de Dados...");
            console.log("Não foi possível inserir o contato no Banco de Dados...");
        });
    }

    static deleteById(id : number){
        db.transaction(
            tx => {
                tx.executeSql(`delete from ${table} where id = ?;`,
                [id], (_, { rows }) => {
                }), (sqlError) => {
                    console.log(sqlError);
                }, (txError) => {
                    console.log(txError);
                }
            }
        );
    }

    static updateByObjeto(param : Contato){
        return new Promise((resolve, reject) => db.transaction(
            tx => {
                tx.executeSql(`update ${table} set nome = ? , email = ? , cidadeNatural = ? , idade = ? , corOlhos = ? where id = ?;`,
                [param.nome, param.email, param.cidadeNatural, param.idade, param.corOlhos, param.id], () => {
                }), (sqlError) => {
                    console.log(sqlError);
                }, (txError) => {
                    console.log(txError);
                }
            }
        )).catch(() => {
            Alert.alert("Não foi possível atualizar o contato no Banco de Dados...");
            console.log("Não foi possível atualizar o contato no Banco de Dados...");
        });
    }

    static findById(id : number){
        return new Promise((resolve, reject) => db.transaction(
            tx => {
                tx.executeSql(`select * from ${table} where id = ?;`,
                [id], (_, { rows }) => {
                    resolve(rows);
                }), (sqlError) => {
                    console.log(sqlError);
                }, (txError) => {
                    console.log(txError);
                }
            }
        )).catch(() => {
            Alert.alert("Não foi possível encontrar o contato no Banco de Dados...");
            console.log("Não foi possível encontrar o contato no Banco de Dados...");
        });
    }

    static findAll(){        
        return new Promise((resolve, reject) => db.transaction(
            tx => {
                tx.executeSql(`select * from ${table}`, [], (_, { rows }) => {
                    resolve(rows);
                }), (sqlError) => {
                    console.log(sqlError);
                }, (txError) => {
                    console.log(txError);
                }
            }
        )).catch(() => {
            Alert.alert("Não foi possível encontrar os contatos no Banco de Dados...");
            console.log("Não foi possível encontrar os contatos no Banco de Dados...");
        });
    }
}