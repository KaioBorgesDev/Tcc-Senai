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
            <Image source={require('../assets/images/logo 1.png')} style={styles.image}></Image>
            <Image source={require('../assets/images/Game 1.png')} style={styles.image}></Image>
        </View>
        <View style={styles.formSignUp}>
            <Text style={styles.titleInput}>EMAIL:</Text>
            <TextInput
                placeholder="example@.com"
                style={styles.inputText}
                onChangeText={setEmail}
            />
            <Text style={styles.titleInput}>PASSWORD:</Text>
            <TextInput
                secureTextEntry={true}
                placeholder="*****"
                style={styles.inputText}
                onChangeText={setPassword}
            />
            <View style={styles.linksContainer}>
                <Link href={'/SignUp'} style={styles.link}>
                    Crie uma conta
                </Link>
                
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
      marginTop: 100,
  }, 
  inputText: {
    width: '100%', // Usa a largura total do contêiner
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingLeft: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
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
      backgroundColor: '#4a4a4a',
      marginBottom: 500,
  },
  formSignUp: {
    maxWidth: 500,
    width: '90%', // Adapta ao tamanho da tela
    alignSelf: 'center',
    marginTop: 20,
  },
  titleInput: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    marginLeft: '5%',
  },
  
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: '5%',
  },
  link: {
    fontSize: 14,
    color: '#65558F',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
})
export default SignIn;