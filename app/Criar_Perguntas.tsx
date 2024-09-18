import ButtonGreen from '@/components/ButtonGreen'
import React from 'react'
import { View ,StyleSheet,Text} from 'react-native'
import { TextInput } from 'react-native'
import { router } from 'expo-router'
import CustomInputButton from '@/components/CustomInputButton'

const Criar_Perguntas = () => {
  return (
    <View>
      <Text style={styles.Titulo}>Hora de Você Fazer as Perguntas: </Text>
      <View>
        <View style={styles.FormSingUp}></View>
          <TextInput placeholder="Crie Sua Pergunta" style={styles.inputText}/>
          <CustomInputButton></CustomInputButton> 
        </View> 
        <ButtonGreen text='Enviar' onPress={()=> router.push('/Criar_Perguntas')}></ButtonGreen>
        
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

