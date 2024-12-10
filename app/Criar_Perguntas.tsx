import ButtonGreen from '@/components/ButtonGreen'
import React, { useState } from 'react'
import { View, StyleSheet, Text, TextInput } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import axios from 'axios'
import { RadioButton } from 'react-native-paper'

type Alternativa = {
  descricao: string,
  correta: number, // Mudamos para 0 ou 1
  id_pergunta: number,
  
}

const Criar_Perguntas = () => {
  const { id_processo } = useLocalSearchParams();
  const [alternativas, setAlternativas] = useState<Alternativa[]>(Array(5).fill({ descricbao: '', correta: 0, id_pergunta: 0 }));
  const [pergunta, setPergunta] = useState('');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleChange = (index: number, text: string) => {
    const newAlternativas = [...alternativas];
    newAlternativas[index] = { ...newAlternativas[index], descricao: text };
    setAlternativas(newAlternativas);
  };

  const handleRadioChange = (index: number) => {
    setSelectedIndex(index);
    const newAlternativas = alternativas.map((alt, idx) => ({
      ...alt,
      correta: idx === index ? 1 : 0, // Define 1 para a alternativa correta, 0 para as demais
    }));
    setAlternativas(newAlternativas);
  };

  const enviarPergunta = async () => {
    if (pergunta === '' || alternativas.every(a => a.descricao === '')) {
      return alert('Preencha todos os campos!');
    }
    try {
      const response = await axios.post('http://localhost:5000/insertPergunta', {
        descricao: pergunta,
        id_processo: id_processo,
        alternativas_list: alternativas,
      });
      if (response.status === 200) {
        alert('Criado com sucesso!');
      } else {
        console.log(response.data);
      }
      router.push({pathname: '/Criar_Perguntas', params:{id_processo: id_processo}} );
    } catch (ex) {
      console.log(ex);
    }
  };
  

  return (
    <View>
      <Text style={styles.Titulo}>Hora de Você Fazer as Perguntas:  </Text>
      <View>
        <View style={styles.FormSingUp}>
          <TextInput 
            placeholder="Crie Sua Pergunta" 
            style={styles.inputText} 
            onChangeText={setPergunta} 
          />
          <View style={styles.container}>
            <View style={styles.radioGroup}>
              {Array.from({ length: 5 }, (_, index) => (
                <View key={index} style={styles.radioButton}>
                  <RadioButton.Android
                    value={index.toString()}
                    status={selectedIndex === index ? 'checked' : 'unchecked'}
                    onPress={() => handleRadioChange(index)}
                    color="#007BFF"
                  />
                  <TextInput 
                    placeholder='Crie Sua Resposta' 
                    style={styles.textInput} 
                    onChangeText={(text) => handleChange(index, text)} 
                  />
                </View>
              ))}
            </View>
          </View>
        </View>
        <ButtonGreen text='Enviar' onPress={enviarPergunta} />
      </View>
    </View>
  );
}

export default Criar_Perguntas;

const styles = StyleSheet.create({
  Titulo: {
    marginTop: 100,
    textAlign: 'center',
    fontSize: 20,
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  
  },
  radioGroup: {
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 20,
    borderRadius: 8,
    padding: 16,
    elevation: 4,
    shadowColor: '#000',
  },
  radioButton: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    fontSize: 16,
    color: '#333',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,    
    width: 300,
    height: 30,
  }
});
