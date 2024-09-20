import ButtonGreen from '@/components/ButtonGreen'
import React, { useState } from 'react'
import { View ,StyleSheet,Text} from 'react-native'
import { TextInput } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import CustomInputButton from '@/components/CustomInputButton'
import axios from 'axios'



type Alternativa = {
  descricao: string,
  correta: number,
  id_pergunta: number,
}
const Criar_Perguntas = () => {
  const {id_processo} = useLocalSearchParams();
  const [alternativas, setAlternativas] = useState<Alternativa[]>();
  const [pergunta, setPergunta] = useState('');

  const enviarProcesso = async () =>{
    if(pergunta === '' || !(alternativas)){
        return alert('Preencha todos os campos!');
    }
    try{
      console.log('entrou')
        const response = await axios.post('http://localhost:5000/insertPerguntas', {
          descricao: pergunta,
          id_processo: id_processo,
        })
        alert('Processo criado com sucesso!');
        router.push('/Criar_Perguntas');
    }catch(ex){
      console.log(ex)
    }
}
  return (
    <View>
      <Text style={styles.Titulo}>Hora de Você Fazer as Perguntas: </Text>
      <View>
        <View style={styles.FormSingUp}>
          <TextInput placeholder="Crie Sua Pergunta" style={styles.inputText} onChangeText={setPergunta}/>
          <CustomInputButton ></CustomInputButton> 
        </View> 
        <ButtonGreen text='Enviar' onPress={()=> router.navigate('/Criar_Perguntas')}></ButtonGreen>
        </View>
    </View>
  )
}

export default Criar_Perguntas

const styles = StyleSheet.create({
  Titulo:{
    marginTop: 100,
    textAlign: 'center',
    fontSize: 20,
  },
  TituloInput: {
    marginTop: 35,
    marginBottom: 20,
    opacity: 0.5,
  },

  inputText: {
  borderWidth: 1,
  width: 350,
  height: 40,
  backgroundColor: '#D9D9D9',
  borderRadius: 10,
  paddingLeft: 10,
  alignSelf: 'center',
  opacity: 0.5,
  },
  FormSingUp: {
    marginBottom: 30,
    alignSelf: 'center',
  },
 
})

