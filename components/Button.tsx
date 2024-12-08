import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';

interface ButtonProps {
  resposta: string;
  correta: boolean;
  firstTry: boolean;
  onPress: () => void;
}

const Button: React.FC<ButtonProps> = ({ resposta, correta, onPress, firstTry }) => {
  const [buttonColor, setButtonColor] = useState('white');

  // Função para alterar a cor do botão
  const handlePress = () => {
    // Arrumar o bug de color reset
    setButtonColor(firstTry ? (correta ? 'green' : 'red') : 'gray');
    onPress();
  };

  return (
    <TouchableOpacity onPress={handlePress} style={[styles.button, { backgroundColor: buttonColor }]}>
      <Text style={styles.buttonText}>{resposta}</Text>
    </TouchableOpacity>
  );
};

const { width } = Dimensions.get('window'); // Pegando a largura da tela

const styles = StyleSheet.create({
  button: {
    margin: 10,
    paddingVertical: 15,
    paddingHorizontal: width * 0.1, // A largura do botão é 80% da tela
    alignSelf: 'center',
    borderRadius: 8,
    borderWidth: 1,
    minWidth: 200, // Garantindo que o botão tenha uma largura mínima
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: width * 0.04, // Ajustando o tamanho da fonte com base na largura da tela
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

export default Button;
