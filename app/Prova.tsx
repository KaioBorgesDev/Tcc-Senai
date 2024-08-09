import Button from '@/components/Button';
import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';

const Selecao = () => {
  // Estado para gerenciar a cor do botão
  const [buttonColor, setButtonColor] = useState('white');

  

  const data = [
    {id: 1, resposta: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', correta: false},
    {id: 2, resposta: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', correta: false},
    {id: 3, resposta: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', correta: false},
    {id: 4, resposta: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', correta: false},
    {id: 5, resposta: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', correta: true},  
  ]

  return (
    <ScrollView style={styles.container}>
      <View style={styles.cardProva}>
        <Text style={styles.titulo}>1. Leia a seguinte oração</Text>
        <ScrollView style={styles.Pergunta}>
          “A vida é um soco no estômago.” Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe magnam quibusdam accusantium! Omnis incidunt provident, asperiores sit quos at similique exercitationem impedit facilis minima veritatis ab dolor eligendi nihil ipsam? Lorem ipsum, dolor sit amet consectetur adipisicing elit. A odio aperiam eius impedit et, qui dolorum amet doloribus ipsam asperiores quaerat tempora ab tenetur? Enim sit vitae officia dolore cumque.
        </ScrollView>
        <View style={styles.ListOpcao}>
          {
            data.map(item => (
              <Button
              key={item.id}
              resposta={item.resposta}
              correta= {item.correta}
            />
            ))
          }
        </View>
      </View>
    </ScrollView>
  );
};

export default Selecao;

const styles = StyleSheet.create({
  button: {
    margin: 10,
    padding: 15,
    alignSelf: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Sans-Serif',
  },
  ListOpcao: {
    top: 10,
  },
  Pergunta: {
    paddingHorizontal: 75,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  container: {
    flex: 1,
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  cardProva: {
    top: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
