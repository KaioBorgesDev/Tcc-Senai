import axios from 'axios';
import { router, useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';

// Interfaces para definir a estrutura dos dados
interface ProcessoSeletivo {
  id: number;
  semestre: string;
  description: string;
  name: string;
  perguntas: Perguntas[];
}

interface Perguntas {
  id_processo: number;
  descricao: string;
  id: number;
  alternativas_list: Alternativas[];
}

interface Alternativas {
  id_pergunta: number;
  correta: number;
  descricao: string;
  id: number;
}

// Componente para exibir os detalhes do processo seletivo
const Processo = () => {
  // Estado para armazenar o processo seletivo
  const [processoSeletivo, setProcessosSeletivos] = useState<ProcessoSeletivo>();
  // Parâmetro da URL para identificar o processo seletivo
  const { processo_nb } = useLocalSearchParams();

  useEffect(() => {
    // Função assíncrona para buscar o processo seletivo
    const buscarProcesso = async () => {
      try {
        const response = await axios.get(`http://192.168.1.206:5000/${processo_nb}`);
        const processo: ProcessoSeletivo = response.data;
        setProcessosSeletivos(processo);
      } catch (error) {
        console.log(error);
      }
    };

    buscarProcesso();
  }, [processo_nb]);

  return (
    <View style={styles.container}>
      <View style={styles.fundo}>
        <Image
          source={require('@/assets/images/prova.jpg')}
          style={styles.fundoImage}
        />
        <View style={styles.cardTitulo}>
          <Text style={styles.titulo}>Processo Seletivo - {processoSeletivo?.name}</Text>
          <Text style={styles.subtitulo}>{processoSeletivo?.description}</Text>
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: '/Prova',
                params: { processo_nb: processo_nb, questao_nb: 1} // Passando parâmetros para a próxima tela, e deixando como primeira questão a questao 1
              })
            }
            style={styles.button}
          >
            <Text style={styles.buttonText}>Iniciar Prova</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 15,
    backgroundColor: 'green',
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    top: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Sans-Serif',
    fontSize: 14,
  },
  cardTitulo: {
    
    justifyContent: 'center',
  },
  subtitulo: {
    marginTop: 15,
    fontSize: 15,
    width: 300,
  },
  titulo: {
    marginTop: 5,
    fontSize: 20,
    fontWeight: 'bold',
    width: 200,
  },
  container: {
    margin: 8,
    top: 100,
    height: 600,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  fundo: {
    alignItems: 'center',
    justifyContent: 'center',
    top: 25,
    borderRadius: 8,
  },
  fundoImage: {
    height: 250,
    width: 300,
  },
});

export default Processo;
