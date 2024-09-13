import { useState } from 'react';
import {StyleSheet, Text} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

interface ButtonProps{
    resposta: string,
    correta: boolean,
    firstTry: boolean,
    onPress: () => void
}
const Button : React.FC<ButtonProps> = ({resposta, correta, onPress, firstTry}) => {
    const [buttonColor, setButtonColor] = useState('white');
  // Função para alterar a cor do botão
    const handlePress = () => {
      //Esta com um bug, se a pessoa aperta duas vezes, volta pro branco, arrumar isto
    setButtonColor(firstTry ? correta ? 'green' : 'red' : 'gray');
    onPress();
  };

  return (
    <TouchableOpacity onPress={handlePress} style={[styles.button, { backgroundColor: buttonColor }]}>
        <Text style={styles.buttonText}>{resposta}</Text>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  button: {
    margin: 10,
    padding: 15,
    alignSelf: 'center',
    borderRadius: 8,
    borderWidth: 1,

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


export default Button