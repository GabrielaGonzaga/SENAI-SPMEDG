import React, { Component } from 'react';
import { Image,ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import api from './api';

export default class Login extends Component{
  constructor(props){
    super(props);
    this.state = {
      email : '',
      senha : ''
    };
  }

  buscarConsultas = async () =>{
    const resposta = await api.get('/consultas')

    const dadosDaApi = resposta.data;
    this.setState({listaConsultas : dadosDaApi});
  };

  componentDidMount(){
    this.buscarConsultas();
  }

render(){
    return(
      <View style={styles.container}>
        <Image 
            source={require('./assets/img/logo.png')}/>

      <Text style={styles.bigBlue}>Login</Text>

      <TextInput 
            style={styles.inputs}
            placeholder='email'
            keyboardType='email-address'
            onChangeText={email => this.setState({ email })}/>
      
      <TextInput 
              style={styles.inputs}
              placeholder='senha'
              secureTextEntry={true}
              onChangeText={senha => this.setState({ senha })}/>

      <Text style={[styles.bigBlue, styles.red]}>bigBlue, then red</Text>
      <Text style={[styles.red, styles.bigBlue]}>red, then bigBlue</Text>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  bigBlue: {
    color: '#1A3E5A',
    fontWeight: 'bold',
    fontSize: 30,
    fontFamily:''
  },
  red: {
    color: 'red',
  },

  inputs:{
    justifyContent: "center",
    alignItems: "stretch",
    color: '#f1f1f1f',
    textDecorationStyle:'none',
    borderBottomWidth: 'hairlineWidth',
  }
});
