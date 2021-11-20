/*
* @bainloko
* DDM I
* 20/11/2021
*/

export class Contato {
    constructor(id?: number, nome?: string, email?: string, cidadeNatural?: string){
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.cidadeNatural = cidadeNatural;
    }

    public id : number;
    public nome : string;
    public email : string;
    public cidadeNatural : string;

    toString(){
        return this.id + '' + this.nome + '' + this.email + '' + this.cidadeNatural;
    }
};