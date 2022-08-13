/*
* @bainloko
* DDM I, DDM II
* 20/11/2021, 25/01/2022
*/

import { Conexao } from "./conexao";

var db = null;
var atualizar = 1

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
                    idade integer,
                    corOlhos text
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
                    idade integer,
                    corOlhos text
                );`,
            ];
        }

        db.transaction(
            (tx: { executeSql: (arg0: string) => void; }) => {
                for (var i = 0; i < sql.length; i++){
                    console.log("SQL executed: " + sql[i]);
                    tx.executeSql(sql[i]);
                }
            }, (error: any) => {
                console.log("Um erro aconteceu na execução do SQL: " + JSON.stringify(error));
                console.log("\n", error);
            }, () => {
                console.log("Transação concluída com sucesso!");
            }
        );
    }
};