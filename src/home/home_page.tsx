/*
* código de aula por @diegonevesdafontoura, adaptado quase que completamente (só faltou organizar a ordem dos blocos de código) por @bainloko
* DDM I, DDM II
* 20/11/2021, 25/01/2022
*/

import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import ContatoServico from '../service/contato_servico';
import Icon from 'react-native-vector-icons/Ionicons';
import { Contato } from '../model/Contato';

var keyValue = 0, achou = 0;

//métodos da home
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.findAllContatos(); 
    }
    
    state = {
        contato: Contato,
        lista_array_dados_contato: [],
        value: null, 
        Id_pesquisar: 0, 
        onChangeText: null,
        formularioId: 0,
        formularioNome: null,
        formularioEmail: null,
        formularioNatural: null,
        formularioIdade: 0,
        formularioOlhos: null
    }
    
    //acionado quando o componente é montado
    componentDidMount(){
        this.instanciarContato();
        this.findAllContatos();
    }
    
    //escuta atualizações na lista
    componentDidUpdate (_prevProps, prevState) {
        if (prevState.lista_array_dados_contato !== this.state.lista_array_dados_contato) {
            this.findAllContatos();
        }
    }
    
    instanciarContato = () => {
        let contato : Contato = new Contato();
        return contato;
    }

    findAllContatos = () => {
        ContatoServico.findAll().then((response: any) => {
            this.setState({
                lista_array_dados_contato: response._array,
                isLoading: false,
            });
        }), (error) => {
            console.log(error);
        }
    }
    
    insertContato = (item1, item2, item3, item4, item5) => {
        let contato = new Contato();

        //cria um id no banco para persistir o objeto
        const insertId = ContatoServico.addData(contato);

        contato.nome = item1; //seta o atributo nome do objeto 
        contato.email = item2; //seta o atributo email do objeto 
        contato.cidadeNatural = item3; //seta o atributo cidade natural do objeto ...
        contato.idade = item4;
        contato.corOlhos = item5;
        //com o valor(state) do item

        //testa pra ver se deu certo a criação do id
        if (insertId != null || insertId != undefined) {
            Alert.alert("Novo contato inserido!");
        } else {
            Alert.alert("Não foi possível inserir o novo contato...");
            console.log("Não foi possível inserir o novo contato...");
        }

        return contato;
    }
    
    localizaContato = (id) => {
        ContatoServico.findById(id).then((response: any) => {
            if (response._array.length > 0 && response != null && response != undefined) {
                let contatopesquisa : Contato = new Contato();
                response._array.map((item, key) => {
                    keyValue++;
                    key = keyValue;
                    contatopesquisa.id = item.id;
                    contatopesquisa.nome = item.nome;
                    contatopesquisa.email = item.email;
                    contatopesquisa.cidadeNatural = item.cidadeNatural;
                    contatopesquisa.idade = item.idade.toString();
                    contatopesquisa.corOlhos = item.corOlhos;
                });

                //o SetState abaixo mostra para o usuário o objeto recuperado do banco, e atualmente somente em memória
                this.setState({
                    formularioId: contatopesquisa.id,
                    formularioNome: contatopesquisa.nome,
                    formularioEmail: contatopesquisa.email,
                    formularioNatural: contatopesquisa.cidadeNatural,
                    formularioIdade: contatopesquisa.idade.toString(),
                    formularioOlhos: contatopesquisa.corOlhos
                });
            } else {
                Alert.alert("Não foi possível encontrar este contato...");
                console.log("Não foi possível encontrar este contato...");
            }

        Alert.alert("Contato localizado!");
        console.log("Contato localizado!");
        }), (error) => {
            console.log(error);
        }
    }

    atualizaContato = (item0, item1, item2, item3, item4, item5) => {
        let contato = new Contato(); //cria objeto na memória
        contato.id = item0; //seta o atributo id do objeto 
        contato.nome = item1; //seta o atributo nome do objeto 
        contato.email = item2; //seta o atributo email do objeto 
        contato.cidadeNatural = item3; //seta o atributo cidade natural do objeto ...
        contato.idade = item4;
        contato.corOlhos = item5;
        //com o valor(state) do item

        ContatoServico.updateByObjeto(contato).then((response: any) => {
            if (response._array.length > 0 && response != null && response != undefined) {
                Alert.alert("Contato atualizado!");
                console.log("Contato atualizado!");
            } else {
                Alert.alert("Nome não encontrado...");
                console.log("Nome não encontrado...");
            }
        }), (error) => {
            console.log(error);
        }
    }

    findContatoById = (id) => {
        ContatoServico.findById(id).then((response: any) => {
            if (response._array.length > 0 && response != null && response != undefined) {
                Alert.alert("ID encontrado!");
                console.log("ID encontrado!");
                achou = 1;
            } else {
                Alert.alert("ID não encontrado...");
                console.log("ID não encontrado...");
                achou = 0;
            }
        }), (error) => {
            console.log(error);
        }
    }

    deleteContato = (id) => {
        if (achou == 0){
            if (this.state.formularioId != null || this.state.formularioId != undefined) {
                ContatoServico.deleteById(id);
                Alert.alert("Contato excluído com sucesso!");
                console.log("Contato excluído com sucesso!");
    
                //limpar os campos da visão
            }
        } else {
            Alert.alert("ID não encontrado...");
            console.log("ID não encontrado...");
        }
    }

    //fim da parte de funções
    //agora é necessário passar os parâmetros para a visão através de renderização
    
    //aqui temos a renderização da tela (visão)
    render() {
        //extrai as propriedades entre chaves
        const {contato, value, lista_array_dados_contato, Id_pesquisar, formularioId, formularioNome, formularioEmail, formularioNatural, formularioIdade, formularioOlhos} = this.state;
        //se tivermos, por exemplo, animais listados oriundos do banco
        //a lista é mostrada na visão
        //const { animal } = animal;
        
        const contatoList = lista_array_dados_contato.map((item, key) => {
            keyValue++;
            key = keyValue;
            return (
                <> 
                    <Text key={keyValue.toString()}>ID: {item.id}, Nome: {item.nome}, E-mail: {item.email}, Natural: {item.cidadeNatural}, Idade: {item.idade}, Cor dos olhos: {item.corOlhos}</Text>
                </>
            );
        });

        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 20, paddingBottom: 20 }}>CRUD de Contatos</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Digite o ID que deseja pesquisar"
                    onChangeText={Id_pesquisar => { this.setState({ Id_pesquisar: Id_pesquisar }) }}
                    value={Id_pesquisar.toString()}
                    keyboardType="numeric"
                />

                <Text>{formularioId}</Text>

                <TextInput
                    style={styles.textInput}
                    placeholder="Digite o nome do novo contato"
                    onChangeText={formularioNome => { this.setState({ formularioNome: formularioNome }) }}
                    value={formularioNome}
                />

                <TextInput
                    style={styles.textInput}
                    placeholder="Digite o e-mail..."
                    onChangeText={formularioEmail => { this.setState({ formularioEmail: formularioEmail }) }}
                    value={formularioEmail}
                    keyboardType="email-address"
                />

                <TextInput
                    style={styles.textInput}
                    placeholder="Digite a cidade natal..."
                    onChangeText={formularioNatural => { this.setState({ formularioNatural: formularioNatural }) }}
                    value={formularioNatural}
                />
                
                <TextInput
                    style={styles.textInput}
                    placeholder="Digite a idade..."
                    onChangeText={formularioIdade => { this.setState({ formularioIdade: formularioIdade }) }}
                    value={formularioIdade.toString()} //mencionar em aula: erros child in a list e error checking, UI
                    keyboardType="numeric"
                />

                <TextInput
                    style={styles.textInput}
                    placeholder="Digite a cor dos olhos..."
                    onChangeText={formularioOlhos => { this.setState({ formularioOlhos: formularioOlhos }) }}
                    value={formularioOlhos}
                />

                <View style={styles.containerTouch}>
                    <TouchableOpacity onPress={() => { (formularioNome || formularioEmail || formularioNatural || formularioIdade || formularioOlhos) == null ? Alert.alert("Preencha todos os campos do formulário!") : this.insertContato(formularioNome, formularioEmail, formularioNatural, formularioIdade, formularioOlhos)}} style = {{ alignItems: "center", backgroundColor: 'green' }}>
                        <Icon name="md-add" size={30} color="white" />
                    </TouchableOpacity>
                </View>

                <View style={styles.containerTouch}>
                    <TouchableOpacity onPress={() => { Id_pesquisar == null ? Alert.alert("O campo ID não pode ser vazio!") : this.localizaContato(Id_pesquisar) }} style = {{ alignItems: "center", backgroundColor: 'green' }}>
                        <Icon name="md-search" size={30} color="white" />
                    </TouchableOpacity>
                </View>

                <View style={styles.containerTouch}>
                    <TouchableOpacity onPress={() => { Id_pesquisar == null ? Alert.alert("Não há objetos para atualizar, faça uma pesquisa...") : this.atualizaContato(Id_pesquisar, formularioNome, formularioEmail, formularioNatural, formularioIdade, formularioOlhos)} } style = {{ alignItems: "center", backgroundColor: 'green' }}>
                        <Icon name="md-refresh" size={30} color="white" />
                    </TouchableOpacity>
                </View>

                <View style={styles.containerTouch}>
                    <TouchableOpacity onPress={() => { formularioId == null ? Alert.alert("O campo ID não pode ser vazio!") : this.deleteContato(Id_pesquisar) }} style = {{ alignItems: "center", backgroundColor: 'green' }}>
                        <Icon name="md-remove" size={30} color="white" />
                    </TouchableOpacity>
                </View>

                {contatoList}

            </View>
        );
    }
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
    }
});