import Button from '@/components/Button';
import { useState, useEffect, useContext } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import { AuthContext } from '@/context/AuthContext';

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

// Componente para selecionar questões
const Selecao = () => {
  const [processosSeletivos, setProcessosSeletivos] = useState<ProcessoSeletivo>();
  const [nextQuestion, setNextQuestion] = useState(false);
  const { processo_nb, questao_nb } = useLocalSearchParams();
  const [number, setNumber] = useState<number>(Number(questao_nb));
  const [firstTry, setFirstTry] = useState(true);
  const { email } = useContext(AuthContext);

  useEffect(() => {
    const buscarProcesso = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/${processo_nb}`);
        const processo: ProcessoSeletivo = response.data;
        setProcessosSeletivos(processo);
      } catch (error) {
        console.log(error);
      }
    };

    buscarProcesso();
  }, [processo_nb]);
  
  const enviarAcerto = async () => {
    try {
      await axios.post(`http://localhost:5000/ControllerScore/InsertAcByEmail/${email}`);
    } catch (err) {
      console.error(err);
    } 
  };

  const enviarErro = async () => {
    try {
      await axios.post(`http://localhost:5000/ControllerScore/InsertErByEmail/${email}`);
    } catch (err) {
      console.error(err);
    } 
  };

  const handlePress = (palpite: boolean) => { 
    setNextQuestion(true);
    setFirstTry(false);
    setNumber(prev => prev + 1);
    if (palpite) {
      enviarAcerto();
    } else {
      enviarErro();
    }
  };

  const currentQuestion = processosSeletivos?.perguntas[Number(questao_nb) - 1];

  if (!currentQuestion) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Acabaram as perguntas!</Text>
        <TouchableOpacity  style={styles.button} onPress={() => router.push("/explore")}>
          <Text style={styles.buttonText}>Voltar para Explore!</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>{questao_nb}. Leia a seguinte oração</Text>
      <ScrollView style={styles.Pergunta}>
        <Text style={styles.perguntaText}>{currentQuestion.descricao}</Text>
      </ScrollView>
      <View style={styles.ListOpcao}>
        {currentQuestion.alternativas_list.map(questao => (
          <Button
            key={questao.id}
            resposta={questao.descricao}
            correta={Boolean(questao.correta)}
            firstTry={firstTry}
            onPress={() => {
              if (firstTry) {
                handlePress(Boolean(questao.correta));
              }
            }}
          />
        ))}
        {nextQuestion && (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: '/Prova',
                params: { processo_nb, questao_nb: number }
              })
            }
            style={styles.button}
          >
            <Text style={styles.buttonText}>Próxima Pergunta!</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

export default Selecao;

const styles = StyleSheet.create({
  button: {
    margin: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignSelf: 'center',
    borderRadius: 8,
    backgroundColor: 'green',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
  },
  buttonResposta: {
    margin: 8,
    padding: 12,
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    width: '100%',
    maxWidth: 350,  // Define a largura máxima
  },
  ListOpcao: {
    marginTop: 10,
  },
  Pergunta: {
    marginHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 20,  // Adiciona um pequeno espaço para separar das opções
  },
  perguntaText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    color: '#333',
    paddingHorizontal: 10,  // Padding para garantir que o texto não fique encostado nas bordas
  },
  container: {
    flex: 1,
    padding: 10,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
    color: '#333',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
  },
});
