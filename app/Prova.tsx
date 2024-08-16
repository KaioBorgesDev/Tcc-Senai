import Button from '@/components/Button';
import { useState } from 'react';
import  { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';


const Selecao = () => {
  // Estado para gerenciar a cor do botão
  const [nextQuestion, setNextQuestion] = useState(false);
  //parametro, que é a questão que sera realizada
  const {param1} = useLocalSearchParams();
  //numero da questao para ser adicionado
  const [number, setNumber] = useState<number>(Number(param1));
  
  const [firstTry, setFirstTry] = useState(true);

  
  const handlePress = () => {
    //aparece o button da proxima questao
    setNextQuestion(true);
    setFirstTry(false)
    setNumber(prev => prev + 1); //adiciona mais um, para a proxima questão ser a seguinte.
  }

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
        <Text style={styles.titulo}>{param1}. Leia a seguinte oração</Text>
        <ScrollView style={styles.Pergunta}>
          <Text>{param1} “A vida é um soco no estômago.” Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe magnam quibusdam accusantium! Omnis incidunt provident, asperiores sit quos at similique exercitationem impedit facilis minima veritatis ab dolor eligendi nihil ipsam? Lorem ipsum, dolor sit amet consectetur adipisicing elit. A odio aperiam eius impedit et, qui dolorum amet doloribus ipsam asperiores quaerat tempora ab tenetur? Enim sit vitae officia dolore cumque.</Text>
        </ScrollView>
        <View style={styles.ListOpcao}>
          {
            data.map(item => (
              <Button
                key={item.id}
                resposta={item.resposta}
                correta={item.correta}
                firstTry={firstTry}
                onPress={()=>{
                  if(firstTry){
                  handlePress();
                }
              } }
              />
            ))
          }
        </View>
        {
          nextQuestion && 
          (
            <TouchableOpacity
              onPress={() => 
                router.push({
                  pathname: '/Prova',
                  params: { param1: number, param2: '1231' } // Passando o valor numérico correto
                })
              }
              style={styles.button}
            >
              <Text style={styles.buttonText}>Próxima Pergunta!</Text>
            </TouchableOpacity>
          )
        }
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
    backgroundColor: 'green',
    justifyContent: 'center',
    top: 30,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
  },
  ListOpcao: {
    top: 10,
  },
  Pergunta: {
    paddingHorizontal: 75,
    paddingVertical: 10,
    backgroundColor: 'white',
    maxWidth: 1000,
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
