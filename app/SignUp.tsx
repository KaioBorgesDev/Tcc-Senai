
import { View, Text, Image, StyleSheet, TouchableOpacity, Button} from "react-native"
import { TextInput } from "react-native";
import { useState, useEffect} from "react";
import axios from "axios";
import { Link, router } from "expo-router";
import { Link } from "expo-router";

interface Usuario{
    email: string;
    password: string;
    username: string;
}

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
            const resposta = await axios.post('http://localhost:5000/create', {
            email: email,
            password: password,
            username: username,
        }
        )
        router.push("/SignIn");
        }catch (ex){
            alert(ex);
        }
        
        
    }
    return (
      <View>
            <View style={styles.logo}>
                <Image source={require('../assets/images/logo 1.svg')} style={styles.image} />
                <Image source={require('../assets/images/Game 1.svg')} style={styles.image}></Image>

            </View>
            <View style={styles.FormSingUp}>
            <Text style={styles.TituloInput}> EMAIL:</Text>
                <TextInput placeholder="example@.com" style={styles.inputText} onChangeText={setEmail}/>
                <Text style={styles.TituloInput}> PASSWORD:</Text>
                        <TextInput placeholder="*****" style={styles.inputText} onChangeText={setPassword}/>
                        <Text style={styles.TituloInput}> USERNAME</Text>
                        <TextInput placeholder="luffy" style={styles.inputText} onChangeText={setUsername}></TextInput>
                        <Link style={{top:15, textDecorationLine:"underline", color: '#65558F'}} href={'/SignIn'}><Text style={styles.TituloInput}>Já tenho uma conta?</Text></Link>
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
        marginTop: 40,
        alignSelf: 'center',
        width: 150,
        borderRadius: 10,
        padding: 10,
        backgroundColor: 'black',
    },
})
export default SignUp;