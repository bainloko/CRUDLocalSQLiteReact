/*
* @bainloko
* DDM I, DDM II
* 20/11/2021, 25/01/2022
*/

import { Conexao } from "./conexao";

var db = null;
var atualizar = 0 //variavel do professor? // use 1 para apagar e refazer a tabela ou 0 para manter os dados

export default class DatabaseInit {
    constructor(){
        db = Conexao.getConnection();
        db.exec([{ sql: 'PRAGMA foreign_keys=ON;', args: [] }], false, () => console.log("Chaves Estrangeiras Ligadas"));
        this.InitDB();
    }

    private InitDB(){
        if (atualizar == 1){
            var sql = [
                `DROP TABLE IF EXISTS contato`,
                `create table if not exists contato (
                    id integer primary key autoincrement,
                    nome text,
                    email text,
                    cidadeNatural text,
                    idade integer
                );`,
            ];
        } else {
            var sql = [
                //`DROP TABLE IF EXISTS contato`,
                `create table if not exists contato (
                    id integer primary key autoincrement,
                    nome text,
                    email text,
                    cidadeNatural text,
                    idade integer
                );`,
            ];
        }

        db.transaction(
            tx => {
                for (var i = 0; i < sql.length; i++){
                    console.log("SQL executed: " + sql[i]);
                    tx.executeSql(sql[i]);
                }
            }, (error) => {
                console.log("Um erro aconteceu na execução do SQL: " + JSON.stringify(error));
                console.log("\n", error);
            }, () => {
                console.log("Transação concluída com sucesso!");
            }
        );
    }
};