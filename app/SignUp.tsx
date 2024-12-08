
import { View, Text, Image, StyleSheet, TouchableOpacity, Button} from "react-native"
import { TextInput } from "react-native";
import { useState, useEffect, useContext} from "react";
import axios from "axios";
import { Link, router } from "expo-router";



const SignUp = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [username, setUsername] = useState<string>('');

    
    const handleSignUp = async () => {
        if(email === '' || password === '' || username === ''){
            return alert('Preencha todos os campos!');
        }
        if(password.length < 6){
            return alert('A senha deve ter no mínimo 6 caracteres e no maximo 15');
        }
        if(username.length < 6){
            return alert('O nome de usuário deve ter no mínimo 6 caracteres, e no máximo 45');
        }
        if(email.length < 5){
            return alert('O email no mínimo 5 caracteres');
        }
        try{
          const response =  await axios.post('http://192.168.1.206:5000/create',
        {
            email,
            username,
            password,
            status: " ",
            rules: " "
        })
        if(response.data !== 'Usuário inserido com sucesso')
            alert(response.data);
        else    
            router.navigate('/Login');
        
        }catch (ex){
            alert(ex);
        }
    }
    return (
      <View>
            <View style={styles.logo}>
                <Image source={require('../assets/images/logo 1.png')} style={styles.image} />
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
                <Text style={styles.TituloInput}> USERNAME</Text>
                <TextInput placeholder="luffy" style={styles.inputText} onChangeText={setUsername}></TextInput>

                <View style={styles.linksContainer}>
                    <Link style={{top:15, textDecorationLine:"underline", color: '#65558F'}} href={'/'}><Text style={styles.TituloInput}>Já tenho uma conta?</Text></Link>
                </View>
            </View>               
            <TouchableOpacity style={styles.ButtonCad} onPress={() => handleSignUp()} >
                <Text style={{color: 'white', textAlign: 'center'}}>Enviar</Text>
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
export default SignUp;