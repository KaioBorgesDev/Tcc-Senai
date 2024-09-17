import React, { useContext, useState } from 'react';
import { View, TextInput, StyleSheet, Text, Image} from 'react-native';
import {Link } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { AuthContext } from '@/context/AuthContext';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {AuthUser} = useContext(AuthContext);

  const HandleSignIn = () => {
    AuthUser(email, password);
  };

  return (
    <View>
          <View style={styles.logo}>
              <Image source={require('../assets/images/logo 1.svg')} style={styles.image}></Image>
              <Image source={require('../assets/images/Game 1.svg')} style={styles.image}></Image>

          </View>
          <View style={styles.FormSingUp}>
          <Text style={styles.TituloInput}> EMAIL:</Text>
              <TextInput placeholder="example@.com" style={styles.inputText} onChangeText={setEmail}/>
              <Text style={styles.TituloInput}> PASSWORD:</Text>
                      <TextInput secureTextEntry={true} placeholder="*****" style={styles.inputText} onChangeText={setPassword}/>
                          <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10}}>
                          <Link style={{top:15, textDecorationLine: "underline",color:'#65558F'}} href={'/SignUp'}><Text style={styles.TituloInput}>Crie uma conta</Text></Link>
                          <Link style={{top:15, textDecorationLine: "underline",color:'#65558F'}} href={'/'}><Text style={styles.TituloInput}>Esqueceu sua senha?</Text></Link>
                          <Link style={{top:15, textDecorationLine: "underline",color:'#65558F'}} href={'/processo'}><Text style={styles.TituloInput}>ABNT</Text></Link>
                          </View>
              </View>
              
               <TouchableOpacity style={styles.ButtonCad} onPress={() => HandleSignIn()} >
                  <Text style={{color: 'white', textAlign: 'center',}}>Enviar</Text>
              </TouchableOpacity>

      </View>

  )
}

const styles = StyleSheet.create({
  image: {
      alignSelf: 'center',
  }
  ,logo: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 180,
  }, 
  inputText: {
      width: 350,
      height: 40,
      backgroundColor: 'white',
      borderRadius: 10,
      left: 60,
      paddingLeft: 20,
  },
  TituloInput: {
      marginTop: 20,
      
  },
  FormSingUp: {
      marginTop: 50,
      alignSelf: 'center',
  },
  ButtonCad: {
      marginTop: 85,
      alignSelf: 'center',
      width: 150,
      borderRadius: 10,
      padding: 10,
      backgroundColor: 'black',
  },
})
export default SignIn;