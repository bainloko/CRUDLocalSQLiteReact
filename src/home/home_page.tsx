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

//métodos da home
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.findAllContato(); 
    }
    
    state = {
        contato: Contato,
        lista_array_dados_contato: [],
        value: null, 
        Id_pesquisar: null, 
        onChangeText: null,
        formularioId: null,
        formularioNome: null,
        formularioEmail: null,
        formularioNatural: null,
        formularioIdade: null,
    }
    
    //acionado quando o componente é montado
    componentDidMount(){
        this.instanciarContato();
        this.findAllContato();
    }
    
    //escuta atualizações na lista
    componentDidUpdate (prevProps, prevState) {
        if (prevState.lista_array_dados_contato !== this.state.lista_array_dados_contato) {
            this.findAllContato();
        }
    }
    
    instanciarContato = () => {
        let contato : Contato = new Contato(); //cria objeto na memória
        return contato;
    }

    findAllContato = () => {
        ContatoServico.findAll().then((response: any) => {
            this.setState({
                lista_array_dados_contato: response._array,
                isLoading: false,
            });
        }), (error) => {
            console.log(error);
        }
    }
    
    insertContato = (item1, item2, item3, item4) => {
        let contato = new Contato(); //cria objeto na memória
        contato.nome = item1; //seta o atributo nome do objeto 
        contato.email = item2; //seta o atributo email do objeto 
        contato.cidadeNatural = item3; //seta o atributo cidade natural do objeto
        contato.idade = item4; //seta o atributo idade do objeto
        //com o valor(state) do item

        //cria um id no banco para persistir o objeto
        const insertId = ContatoServico.addData(contato);

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
                let contatopesquisa : Contato = new Contato(); //cria objeto na memória
                const contatoretorno = response._array.map((item, key) => {
                    contatopesquisa.id = item.id;
                    contatopesquisa.nome = item.nome;
                    contatopesquisa.email = item.email;
                    contatopesquisa.cidadeNatural = item.cidadeNatural;
                    contatopesquisa.idade = item.idade;
                });

                //o SetState abaixo mostra para o usuário o objeto recuperado do banco, e atualmente somente em memória
                this.setState({
                    contato: contatopesquisa,
                    formularioId: contatopesquisa.id,
                    formularioNome: contatopesquisa.nome,
                    formularioEmail: contatopesquisa.email,
                    formularioNatural: contatopesquisa.cidadeNatural,
                    formularioIdade: contatopesquisa.idade,
                });
                
                Alert.alert("Contato atualizado!");
                console.log("Contato atualizado!");
            } else {
                Alert.alert("Não foi possível encontrar este contato...");
                console.log("Não foi possível encontrar este contato...");
            }
        }), (error) => {
            console.log(error);
        }
    }

    atualizaContato = (item0, item1, item2, item3, item4) => {
        let contato = new Contato(); //cria objeto na memória
        contato.id = item0; //seta o atributo id do objeto 
        contato.nome = item1; //seta o atributo nome do objeto 
        contato.email = item2; //seta o atributo email do objeto 
        contato.cidadeNatural = item3; //seta o atributo cidade natural do objeto
        contato.idade = item4; //seta o atributo idade do objeto
        //com o valor(state) do item

        ContatoServico.updateByObjeto(contato).then((response: any) => {
            if (response._array.length > 0 && response != null && response != undefined) {
                Alert.alert("Objeto atualizado!");
            } else {
                Alert.alert("Nome não encontrado...");
            }
        }), (error) => {
            console.log(error);
        }
    }
    
    findContatoById = (id) => {
        ContatoServico.findById(id).then((response: any) => {
            if (response._array.length > 0 && response != null && response != undefined) {
                console.log("ID encontrado!");
            } else {
                Alert.alert("ID não encontrado...");
                console.log("ID não encontrado...");
            }
        }), (error) => {
            console.log(error);
        }
    }

    deleteContato = (id) => {
        this.findContatoById(id);
        if (this.state.formularioId != null || this.state.formularioId != undefined) {
            ContatoServico.deleteById(id);
            Alert.alert("Contato excluído com sucesso!");
            console.log("Contato excluído com sucesso!");

            //limpar os campos da visão
        }
    }

    //fim da parte de funções
    //agora é necessário passar os parâmetros para a visão através de renderização
    
    //aqui temos a renderização da tela (visão)
    render() {
        //extrai as propriedades entre chaves
        const {contato, lista_array_dados_contato, value, Id_pesquisar, formularioId, formularioNome, formularioEmail, formularioNatural, formularioIdade} = this.state;
        //se tivermos, por exemplo, animais listados oriundos do banco
        //a lista é mostrada na visão
        //const { animal } = animal;
        
        const contatoList = lista_array_dados_contato.map((item, key) => {
            key++;
            return (
                <> 
                    <Text>ID: {item.id}, Nome: {item.nome}, E-mail: {item.email}, Natural: {item.cidadeNatural}, Idade: {item.idade}</Text>
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
                    value={Id_pesquisar}
                    keyboardType="numeric"
                />

                <Text>{formularioId}</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Digite o nome do novo contato"
                    //a cada letra digitada (change) ajusta o state
                    onChangeText={formularioNome => { this.setState({ formularioNome: formularioNome }) }}
                    value={formularioNome}
                />

                <TextInput
                    style={styles.textInput}
                    placeholder="Digite o e-mail..."
                    //a cada letra digitada (change) ajusta o state
                    onChangeText={formularioEmail => { this.setState({ formularioEmail: formularioEmail }) }}
                    value={formularioEmail}
                />

                <TextInput
                    style={styles.textInput}
                    placeholder="Digite a cidade natal..."
                    // a cada letra digitada (change) ajusta o state
                    onChangeText={formularioNatural => { this.setState({ formularioNatural: formularioNatural }) }}
                    value={formularioNatural}
                />

                <TextInput
                    style={styles.textInput}
                    placeholder="Digite a idade..."
                    onChangeText={formularioIdade => { this.setState({ formularioIdade: formularioIdade }) }}
                    value={formularioIdade}
                    keyboardType="numeric"
                />

                <View style={styles.containerTouch}>
                    <TouchableOpacity onPress={() => { formularioNome == null || formularioEmail == null || formularioNatural == null ? Alert.alert("Preencha todos os campos do formulário!") : this.insertContato(formularioNome, formularioEmail, formularioNatural, formularioIdade)}} style = {{ alignItems: "center", backgroundColor: 'green' }}>
                        <Icon name="md-add" size={30} color="white" />
                    </TouchableOpacity>
                </View>

                <View style={styles.containerTouch}>
                    <TouchableOpacity onPress={() => { Id_pesquisar == null ? Alert.alert("O campo ID não pode ser vazio!") : this.localizaContato(Id_pesquisar) }} style = {{ alignItems: "center", backgroundColor: 'green' }}>
                        <Icon name="md-search" size={30} color="white" />
                    </TouchableOpacity>
                </View>

                <View style={styles.containerTouch}>
                    <TouchableOpacity onPress={() => { formularioId == null ? Alert.alert("Não há objetos para atualizar, faça uma pesquisa...") : this.atualizaContato(formularioId, formularioNome, formularioEmail, formularioNatural, formularioIdade)}} style = {{ alignItems: "center", backgroundColor: 'green' }}>
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