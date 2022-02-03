/*
* @bainloko
* DDM I, DDM II
* 20/11/2021, 25/01/2022
*/

export class Contato {
    constructor(corOlhosOpcao){
        if (corOlhosOpcao == 0){
            this.corOlhos = "Castanho";
        } else if (corOlhosOpcao == 1){
            this.corOlhos = "Azul";
        } else if (corOlhosOpcao == 2){
            this.corOlhos = "Verde";
        } else {
            this.corOlhos = "Outro, ou não especificado";
        }
    }

    public id : number;
    public nome : string;
    public email : string;
    public cidadeNatural : string;
    public idade : number;
    public corOlhos : string;

    toString(){
        return this.id + '' + this.nome + '' + this.email + '' + this.cidadeNatural + '' + this.idade + '' + this.corOlhos;
    }
};