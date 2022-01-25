/*
* @bainloko
* DDM I, DDM II
* 20/11/2021, 25/01/2022
*/

export class Contato {
    constructor(){
    }

    public id : number;
    public nome : string;
    public email : string;
    public cidadeNatural : string;
    public idade : number;

    toString(){
        return this.id + '' + this.nome + '' + this.email + '' + this.cidadeNatural + '' + this.idade;
    }
};