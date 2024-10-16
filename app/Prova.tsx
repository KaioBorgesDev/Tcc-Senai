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
  // Estado para gerenciar todos os processos
  const [processosSeletivos, setProcessosSeletivos] = useState<ProcessoSeletivo>();
  // Estado para gerenciar a exibição do botão de próxima pergunta
  const [nextQuestion, setNextQuestion] = useState(false);
  // Parâmetro que é a questão atual a ser exibida
  const { processo_nb, questao_nb } = useLocalSearchParams();
  // Número da questão para navegar para a próxima
  const [number, setNumber] = useState<number>(Number(questao_nb));
  // Estado para controlar se é a primeira tentativa
  const [firstTry, setFirstTry] = useState(true);

  //contexto do usuario
  const { email } = useContext(AuthContext);

  useEffect(() => {
    // Função assíncrona para buscar o processo seletivo
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
      
      await axios.post(await axios.post(`http://localhost:5000/ServicesScores/InsertAcByEmail/${email}`));
      
    } catch (err) {
      console.error(err);
    } 
  };

  const enviarErro = async () => {
    try {
      await axios.post(await axios.post(`http://localhost:5000/ServicesScores/InsertErByEmail/${email}`));
      
    } catch (err) {
      console.error(err);
    } 
  };


  // Função para lidar com a mudança de questão e adicionar resultado
  const handlePress = (palpite : boolean) =>  { 
    setNextQuestion(true);
    setFirstTry(false);
    setNumber(prev => prev + 1);
    console.log(email);
    if(palpite){
      enviarAcerto();
    }else{
      enviarErro();
    }
  };

  // Verifica se a pergunta existe
  const currentQuestion = processosSeletivos?.perguntas[Number(questao_nb) - 1];

  if (!currentQuestion) {
    // Se a pergunta não existir, exibe uma mensagem de fim de perguntas
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Acabaram as perguntas!</Text>

        <TouchableOpacity  style={styles.button} onPress={()=> router.push("/explore")}>
          <Text style={styles.buttonText}>Voltar para Explore!</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.cardProva}>
        {/* Título da questão */}
        <Text style={styles.titulo}>{questao_nb}. Leia a seguinte oração</Text>

        {/* Texto da pergunta */}
        <ScrollView style={styles.Pergunta}>
          <Text>{currentQuestion.descricao}</Text>
        </ScrollView>

        {/* Lista de opções de resposta */}
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
        </View>

        {/* Botão para ir para a próxima pergunta */}
        {nextQuestion && (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: '/Prova',
                params: { processo_nb, questao_nb: number } // Passando o valor numérico correto
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

// Estilos para o componente
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
