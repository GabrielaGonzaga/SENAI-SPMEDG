import React, { Component } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from './api';


const bottomTab = createBottomTabNavigator();

export default class Eventos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listaConsultas : []
    }
  }

  buscarEventos = async () => {
    const resposta = await api.get('/consultas');
    // const dadosDaApi = resposta.data;
    this.setState({ listaConsultas : resposta.data })
    console.log(this.state.listaConsultas)
  };

  componentDidMount() {
    // Realiza a chamada para a API trazendo todos os eventos
    this.buscarEventos();
  };

  // inscrever = async (item) => {
  //   console.warn(item);

  //   try {
      
  //     const valorToken = await AsyncStorage.getItem('userToken');

  //     await api.post('/presencas/inscricao/' + item.idEvento, {}, {
  //       headers : {
  //         'Authorization' : 'Bearer ' + valorToken
  //       }
  //     });

  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  render(){
    return (
     <View style={{flex: 1,   justifyContent:'center'}}>
       <View  style={styles.container}>
          <Image source={require('./assets/img/calendario.png')}style={styles.calen} />
          <Text style={styles.texts}>20/11/2020</Text>
       </View>
     </View>
    );
  }

//   renderItem = ({ item }) => (
//     // <Text style={{ fontSize: 20, color: 'red' }}>{item.nomeEvento}</Text>

//     <View style={styles.flatItemRow}>
//       <View style={styles.flatItemContainer}>
//         <Text style={styles.flatItemTitle}>{item.nomeEvento}</Text>
//         <Text style={styles.flatItemInfo}>{item.descricao}</Text>
//         <Text style={styles.flatItemInfo}>{Intl.DateTimeFormat('pt-BR').format(new Date(item.dataEvento))}</Text>
//       </View>

//       <TouchableOpacity
//         onPress={ () => this.inscrever(item) }
//         style={styles.flatItemImg}
//       >
//         <View>
//           <Image 
//             source={require('../../assets/img/view.png')}
//             style={styles.flatItemImgIcon}
//           />
//         </View>
//       </TouchableOpacity>
      
//     </View>
//   )

// }
}
const styles = StyleSheet.create({

 container:{
  
 },

  calen:{
  width: 22,
  height: 22,
  tintColor: '#1a3e5a',
  marginRight: -5,
  marginTop: -12
},

});