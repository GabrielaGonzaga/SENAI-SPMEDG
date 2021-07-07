import React, { Component } from 'react';
import { LinearGradient } from "expo-linear-gradient";
import { Image,ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import api from '../services/api';

import login from './login';


export default class Login extends Component{
  constructor(props){
    super(props);
    this.state = {
      email : '',
      senha : ''
    };
  }

  realizarLogin = async () => {
    console.warn( this.state.email + ' ' + this.state.senha );

    const resposta = await api.post('/logins', {
        email : this.state.email,
        senha : this.state.senha
    });

    const token = resposta.data.token;
    console.warn(token);

    await AsyncStorage.setItem('userToken', token);

    this.props.navigation.navigate('Consultas');
};


render(){
    return(
      <ScrollView>
        <LinearGradient  colors={['#091C2C','#0262ac']}>
          <View style={{flex: 1,  alignItems: 'center', justifyContent:'center',  marginTop:'30rem', marginTop:90}}>
            
            <View  style={styles.container}>
              <View style={styles.containerL}>

              <View style={{flex: 1,  alignItems: 'center', justifyContent:'center'}}> 
                <Image source={require('./assets/img/logo.jpeg')} style={styles.logo}/>
              </View>
               

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
                    style={{width:'100%', height:30, borderRadius: 30, textAlign: 'center', marginTop:'2rem', }}>

                      <Text style={styles.btntx}>Entrar</Text>

                    </LinearGradient>
              </TouchableOpacity>

              {/* <View style={{flex: 1,  alignItems: 'center'}}>
                <Text style={styles.outx}>ou</Text>
              </View> */}

              {/* <TouchableOpacity
                    style={{flex: 1,  alignItems: 'center'}}
                    onPress={this.realizarLogin}
                    >
                    <LinearGradient colors={['#091C2C','#00508d']}  
                    style={{width:'100%', height:'2rem', borderRadius: 30, textAlign: 'center', marginTop:'1rem', }}>

                      <Text style={styles.btntx}>Cadastre-se</Text>

                    </LinearGradient>
              </TouchableOpacity> */}

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
    height:1000,
    backgroundColor: '#F1F1F1',
    marginTop: '20rem',
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
    marginBottom:20
  },

  logo:{ 
    width: 200,
    height: 70,
    marginBottom:10,
  },

  txlogin: {
    color: '#1A3E5A',
    fontWeight: 'normal',
    fontSize: 38,
  },
  red: {
    color: 'red',
  },

  inputs:{
    marginTop:20,
    flex:1,
    fontSize: 15,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: "stretch",
    color: 'gray',
  },

  line:{
    width:'100%',
    flex: 1, 
    height: 2, 
    backgroundColor: '#1A3E5A'
  },

  linelo:{
    marginTop:-20,
    width:'15%',
    height: 2, 
   // backgroundColor: '#E59500'
   //lineargradient
  },

  imgLogin:{
    width:'30px',
  },

  btntx: {
    marginTop: 6,
    color: '#FFF',
    alignItems: 'center', 
  },

  outx: {
    fontSize: 15,
    marginTop:'1rem',
    color: 'grey',
    alignItems: 'center', 
  },

});
