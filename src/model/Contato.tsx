/*
* @bainloko
* DDM I
* 20/11/2021
*/

export class Contato {
    constructor(){

    }

    public id : number;
    public nome : string;
    public email : string;
    public cidadeNatural : string;

    toString(){
        return this.id + '' + this.nome + '' + this.email + '' + this.cidadeNatural;
    }
};