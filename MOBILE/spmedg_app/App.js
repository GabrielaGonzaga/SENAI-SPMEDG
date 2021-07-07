import React, { Component } from 'react';
import { LinearGradient } from "expo-linear-gradient";
import { Image,ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
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
      <ScrollView scrollEnabled={false} nestedScrollEnabled={false}>
        <LinearGradient  colors={['#091C2C','#0262ac']}>
          <View style={{flex: 1,  alignItems: 'center', marginTop:'3rem'}}>
            
            <View  style={styles.container}>
              <View style={styles.containerL}>
                <Image 
                    source={require('./assets/img/logo.jpeg')} style={styles.imgLogin}/>

                <Text style={styles.txlogin}>Login</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>

                <LinearGradient colors={['#e59500','#a76c00']} style={styles.linelo}>
                  <View  style={styles.linelo}  />
                </LinearGradient>
                </View>
                
                <TextInput 
                      style={styles.inputs}
                      placeholder='Digite seu email'
                      keyboardType='email-address'
                      onChangeText={email => this.setState({ email })}/>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={styles.line} />
                </View>
              
                <TextInput 
                        style={styles.inputs}
                        placeholder='Digite sua senha'
                        secureTextEntry={true}
                        onChangeText={senha => this.setState({ senha })}/>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={styles.line} />        
              </View>

              <TouchableOpacity
                    style={{flex: 1,  alignItems: 'center'}}
                    onPress={this.realizarLogin}
                    >
                    <LinearGradient colors={['#091C2C','#00508d']}  
                    style={{width:'100%', height:'2rem', borderRadius: 30, textAlign: 'center', marginTop:'2rem', }}>

                      <Text style={styles.btntx}>Entrar</Text>

                    </LinearGradient>
              </TouchableOpacity>

              <View style={{flex: 1,  alignItems: 'center'}}>
                <Text style={styles.outx}>ou</Text>
              </View>

              <TouchableOpacity
                    style={{flex: 1,  alignItems: 'center'}}
                    onPress={this.realizarLogin}
                    >
                    <LinearGradient colors={['#091C2C','#00508d']}  
                    style={{width:'100%', height:'2rem', borderRadius: 30, textAlign: 'center', marginTop:'1rem', }}>

                      <Text style={styles.btntx}>Entrar</Text>

                    </LinearGradient>
              </TouchableOpacity>

            </View>
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    width:'90%',
    backgroundColor: '#F1F1F1',
    marginTop: 10,
    marginBottom:'110%',
    flex: 1,  
    alignItems: 'center', 
    marginTop:'3rem'
  },

  containerL: {
    borderRadius: 30,
    width:'70%',
    backgroundColor: '#F1F1F1',
    marginTop: 50,
    marginBottom:'25%'
  },

  txlogin: {
    color: '#1A3E5A',
    fontWeight: 'bold',
    fontSize: '2rem',
    fontfamily: 'Poppins-Meddium',
  },
  red: {
    color: 'red',
  },

  inputs:{
    marginTop:'2rem',
    flex:1,
    fontSize: '1rem',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: "stretch",
    color: '#f1f1f1f',
    textDecorationStyle:'none',
    borderBottomWidth: 'hairlineWidth',
  },

  line:{
    width:'100%',
    flex: 1, 
    height: 2, 
    backgroundColor: '#1A3E5A'
  },

  linelo:{
    marginTop:'-0.2rem',
    width:'15%',
    height: 2, 
   // backgroundColor: '#E59500'
   //lineargradient
  },

  imgLogin:{
    width:'30px',
  },

  btntx: {
    marginTop:'0.4rem',
    color: '#FFF',
    alignItems: 'center', 
  },

  outx: {
    fontSize: '1.1rem',
    marginTop:'1rem',
    color: 'grey',
    alignItems: 'center', 
  },

});
