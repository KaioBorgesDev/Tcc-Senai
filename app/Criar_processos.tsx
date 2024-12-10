import ButtonGreen from '@/components/ButtonGreen'
import CustomRadioButton from '@/components/CustomRadioButton'
import axios from 'axios'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { View ,Text,StyleSheet} from 'react-native'
import { TextInput } from 'react-native'




const processos = () => {
  const [nome, setNome] = useState<string>('');
  const [descricao, setDescricao] = useState<string>('');
  const [semestre, setSemestre] = useState<string>('1');


  const handleValueChanged = (value: string) =>{
      setSemestre(value);
  }

  const enviarProcesso = async () =>{
      if(nome === '' || descricao === ''){
          return alert('Preencha todos os campos!');
      }
      try{
          const response = await axios.post('http://localhost:5000/insert', {
            semestre: semestre,
            description: descricao,
            name: nome,
            perguntas: []
          })

          if(response.status == 200){
              alert('Processo criado com sucesso!');

              const responseNumero = await axios.post('http://localhost:5000/getIdByProcesso', {
                semestre: semestre,
                description: descricao,
                name: nome,
                perguntas: []
              });
              const numeroInserido: number = responseNumero.data;
              if(numeroInserido != -1){
                return router.push({pathname: '/Criar_Perguntas', params:{id_processo: numeroInserido}});
              }
              alert("Deu errado, sinto muito.");
          }else{
            alert('Não foi possivel inserir o processo ' .concat(response.data));
        }
      }catch(ex){
        console.log(ex)
      }
  }
    
  
  return (
    <View>  
      <Text style={styles.Titulo}>Crie seus processos agora</Text>
      <View style={styles.FormSingUp}>
        <Text style={styles.TituloInput}>Titulo {semestre}</Text>
        <TextInput placeholder="Nome do processo" style={styles.inputText} onChangeText={setNome}/>
      </View>
      <View style={styles.FormSingUp}>
        <Text style={styles.TituloInput}>Descrição</Text>
        <TextInput placeholder="Descricao do Projeto" style={styles.inputText} onChangeText={setDescricao}/>
      </View>
      <View>
      <CustomRadioButton onValueChanged={handleValueChanged}/>
      

      <ButtonGreen text='Enviar' onPress={()=> enviarProcesso()}></ButtonGreen>
        
      </View>
    </View>


   
    
  )
}

export default processos

const styles = StyleSheet.create({
TituloInput: {
    marginTop: 35,
    marginBottom: 20,
    opacity: 0.5,
    
},
inputText: {
  width: 350,
  height: 40,
  backgroundColor: '#D9D9D9',
  borderRadius: 10,
  left: 60,
  paddingLeft: 20,
},
FormSingUp: {
    marginBottom: 30,
    alignSelf: 'center',
},
 Titulo:{
    marginTop: 50,
    textAlign: 'center',
    fontSize: 20,
 },


})