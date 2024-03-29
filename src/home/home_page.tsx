/*
* código de aula por @diegonevesdafontoura, adaptação pra function e diversas limpezas no projeto por @bainloko
* DDM I, DDM II
* 20/11/2021, 25/01/2022, 21/02/2022
*/

import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, StyleSheet, Alert, TouchableOpacity, StatusBar, FlatList } from 'react-native';
import ContatoServico from '../service/contato_servico';
import Icon from 'react-native-vector-icons/Ionicons';
import { Contato } from '../model/Contato';

var achou = false;

export default function App(){
    const [arrayContato, setArrayContato] = useState([]);
    const [Id_pesquisar, setId_pesquisar] = useState(null);
    const [formularioId, setFormularioId] = useState(null);
    const [formularioNome, setFormularioNome] = useState(null);
    const [formularioEmail, setFormularioEmail] = useState(null);
    const [formularioNatural, setFormularioNatural] = useState(null);
    const [formularioIdade, setFormularioIdade] = useState(null);
    const [formularioOlhos, setFormularioOlhos] = useState(null);
        
    //acionado quando o componente é montado
    useEffect(() => {
        instanciarContato();
        findAllContatos();
    }, []);
    
    //escuta atualizações na lista
    useEffect(() => {
        findAllContatos();
    });
    
    const instanciarContato = () => {
        let contato : Contato = new Contato();
        return contato;
    }

    const findAllContatos = () => {
        ContatoServico.findAll().then((response: any) => {
            setArrayContato(response._array);
        }), (error: any) => {
            console.log(error);
        }
    }
    
    function insertContato (item1: string, item2: string, item3: string, item4: number, item5: string){
        let contato = new Contato();

        contato.nome = item1; //seta o atributo nome do objeto 
        contato.email = item2; //seta o atributo email do objeto 
        contato.cidadeNatural = item3; //seta o atributo cidade natural do objeto
        contato.idade = item4; //seta o atributo idade do objeto
        contato.corOlhos = item5; //seta o atributo corOlhos do objeto
        //com o valor(state) do item

        //testa pra ver se deu certo a criação do id
        if (ContatoServico.addData(contato)) {
            Alert.alert("Novo contato inserido!");
            console.log("Novo contato inserido!");
        } else {
            Alert.alert("Não foi possível inserir o novo contato...");
            console.log("Não foi possível inserir o novo contato...");
        }

        return contato;
    }

    function localizaContato (id: number){ //erros inexplicáveis. o que tá acontecendo aqui?
        ContatoServico.findById(id).then((response: any) => {
            if (response._array.length > 0 && response != null && response != undefined) {
                achou = true;

                let contato = new Contato();
                const contatoretorno = () => response._array.map((item: { id: number; nome: string; email: string; cidadeNatural: string; idade: number; corOlhos: string; }, key: any) => {
                    contato.id = item.id;
                    contato.nome = item.nome;
                    contato.email = item.email;
                    contato.cidadeNatural = item.cidadeNatural;
                    contato.idade = item.idade;
                    contato.corOlhos = item.corOlhos;
                });
                
                //retorna pro usuário os dados localizados no banco (state)
                setArrayContato(contatoretorno);
                setFormularioId(contato.id);
                setFormularioNome(contato.nome);
                setFormularioEmail(contato.email);
                setFormularioNatural(contato.cidadeNatural);
                setFormularioIdade(contato.idade);
                setFormularioOlhos(contato.corOlhos);

                return contatoretorno;
            } else {
                achou = false;
            }
        }), (error: any) => {
            console.log(error);
        }

        if (achou){
            Alert.alert("Contato localizado!");
            console.log("Contato localizado!");
        } else {
            Alert.alert("Não foi possível encontrar este contato...");
            console.log("Não foi possível encontrar este contato...");
        }
    }

    function atualizaContato (item0: number, item1: string, item2: string, item3: string, item4: number, item5: string){
        let contato = new Contato(); //cria objeto na memória
        contato.id = item0; //seta o atributo id do objeto 
        contato.nome = item1; //seta o atributo nome do objeto 
        contato.email = item2; //seta o atributo email do objeto 
        contato.cidadeNatural = item3; //seta o atributo cidade natural do objeto
        contato.idade = item4; //seta o atributo idade do objeto
        contato.corOlhos = item5; //seta o atributo corOlhos do objeto
        //com o valor(state) do item

        if (achou == true && formularioId != (0 && null && undefined)) {
            ContatoServico.updateByObjeto(contato);

            Alert.alert("Contato atualizado!");
            console.log("Contato atualizado!");
        } else {
            Alert.alert("Contato não encontrado...");
            console.log("Contato não encontrado...");
        }
    }

    function deleteContato (id: number){
        if (achou == true && formularioId != (0 && null && undefined)) {
            ContatoServico.deleteById(id);

            Alert.alert("Contato excluído com sucesso!\nPesquise outro contato...");
            console.log("Contato excluído com sucesso!\nPesquise outro contato...");
        } else {
            Alert.alert("ID não encontrado...");
            console.log("ID não encontrado...");
        }
    }
        
    const contatoList = arrayContato.map((item: { id: number; nome: string; email: string; cidadeNatural: string; idade: number; corOlhos: string; }, key) => { //FlatList...
        return (
            <>
                <Text style={styles.titleList}>ID: {item.id}, Nome: {item.nome}, E-mail: {item.email}, Natural: {item.cidadeNatural}, Idade: {item.idade}, Cor dos olhos: {item.corOlhos}</Text>
            </>
        );
    });

    //agora é necessário passar os parâmetros para a visão através de renderização da tela (visão)
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 20, paddingBottom: 20 }}>CRUD de Contatos</Text>
            <TextInput
                style={styles.textInput}
                placeholder="Digite o ID que deseja pesquisar"
                onChangeText={Id_pesquisar => { setId_pesquisar(Id_pesquisar); }}
                value={Id_pesquisar}
                keyboardType="numeric"
            />

            <Text>{formularioId}</Text>

            <TextInput
                style={styles.textInput}
                placeholder="Digite o nome do novo contato"
                onChangeText={formularioNome => { setFormularioNome(formularioNome); }}
                value={formularioNome}
            />

            <TextInput
                style={styles.textInput}
                placeholder="Digite o e-mail..."
                onChangeText={formularioEmail => { setFormularioEmail(formularioEmail); }}
                value={formularioEmail}
                keyboardType="email-address"
            />

            <TextInput
                style={styles.textInput}
                placeholder="Digite a cidade natal..."
                onChangeText={formularioNatural => { setFormularioNatural(formularioNatural); }}
                value={formularioNatural}
            />
            
            <TextInput
                style={styles.textInput}
                placeholder="Digite a idade..."
                onChangeText={formularioIdade => { setFormularioIdade(formularioIdade); }}
                value={formularioIdade}
                keyboardType="numeric"
            />

            <TextInput
                style={styles.textInput}
                placeholder="Digite a cor dos olhos..."
                onChangeText={formularioOlhos => { setFormularioOlhos(formularioOlhos); }}
                value={formularioOlhos}
            />

            <View style={styles.containerTouch}>
                <TouchableOpacity onPress={() => { ((formularioNome && formularioEmail && formularioNatural && formularioIdade && formularioOlhos) != null) ? insertContato(formularioNome, formularioEmail, formularioNatural, formularioIdade, formularioOlhos) : Alert.alert("Preencha todos os campos do formulário!") }} style = {{ alignItems: "center", backgroundColor: 'green' }}>
                    <Icon name="md-add" size={30} color="white" />
                </TouchableOpacity>
            </View>

            <View style={styles.containerTouch}>
                <TouchableOpacity onPress={() => { (Id_pesquisar != (0 && null && undefined)) ? localizaContato(Id_pesquisar) : Alert.alert("O campo ID não pode ser vazio!") }} style = {{ alignItems: "center", backgroundColor: 'green' }}>
                    <Icon name="md-search" size={30} color="white" />
                </TouchableOpacity>
            </View>

            <View style={styles.containerTouch}>
                <TouchableOpacity onPress={() => { ((Id_pesquisar && formularioId) != (0 && null && undefined)) ? atualizaContato(formularioId, formularioNome, formularioEmail, formularioNatural, formularioIdade, formularioOlhos) : Alert.alert("Não há objetos para atualizar, faça uma pesquisa...") }} style = {{ alignItems: "center", backgroundColor: 'green' }}>
                    <Icon name="md-refresh" size={30} color="white" />
                </TouchableOpacity>
            </View>

            <View style={styles.containerTouch}>
                <TouchableOpacity onPress={() => { ((Id_pesquisar && formularioId) != (0 && null && undefined)) ? deleteContato(Id_pesquisar) : Alert.alert("O campo ID não pode ser vazio!") }} style = {{ alignItems: "center", backgroundColor: 'green' }}>
                    <Icon name="md-remove" size={30} color="white" />
                </TouchableOpacity>
            </View>

            {contatoList}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    textInput: {
        alignItems: "center", 
        width: 220, 
        height: 40,
        margin: 5,
        borderColor: "gray", 
        borderWidth: 1,
    },

    containerTouch: {
        width: 200,
        padding: 10,
    },
    
    containerList: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },

    itemList: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },

    titleList: {
        fontSize: 12,
    },
});
