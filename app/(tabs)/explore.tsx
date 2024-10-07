import { StyleSheet, View, Text, ScrollView, TextInput, Pressable, Button } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '@/context/AuthContext';
import CardProvas from '@/components/CardProvas';
import { router } from 'expo-router';

interface ProcessoSeletivo {
  id: number;
  name: string;
  description: string;
  perguntas: Pergunta[];
}

interface Pergunta {
  id: number;
  descricao: string;
}

export default function Explore() {
  const [processosSeletivos, setProcessosSeletivos] = useState<ProcessoSeletivo[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const { username } = useContext(AuthContext);

  useEffect(() => {
    const fetchProcessos = async () => {
      try {
        const response = await axios.get<ProcessoSeletivo[]>('http://localhost:5000/all');
        setProcessosSeletivos(response.data);
      } catch (error) {
        console.error("Erro ao buscar processos:", error);
      }
    };

    fetchProcessos();
  }, []);

  const filteredProcessos = processosSeletivos.filter(processo =>
    processo.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    processo.description.toLowerCase().includes(searchValue.toLowerCase())
  );

  const [visibleQuestions, setVisibleQuestions] = useState<number | null>(null);

  const toggleQuestions = (id: number) => {
    setVisibleQuestions(visibleQuestions === id ? null : id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Bem-vindo, {username}!</Text>
      <TextInput
        placeholder='Pesquise aqui...'
        onChangeText={setSearchValue}
        style={styles.searchInput}
      />
      <ScrollView style={styles.scrollContainer}>
        {filteredProcessos.map(item => (
          <View key={item.id} style={styles.card}>
            <Pressable onPress={() => router.push({ pathname: '/Selecao', params: { processo_nb: item.id } })}>
              <CardProvas
                titulo={item.name}
                descricao={item.description}
                processo_nb={item.id}
              />
            </Pressable>
            <Button 
              title={visibleQuestions === item.id ? "Esconder Perguntas" : "Mostrar Perguntas"}
              onPress={() => toggleQuestions(item.id)}
              color="#3498db"
            />
            {visibleQuestions === item.id && (
              <>
                <Text style={styles.questionTitle}>Perguntas:</Text>
                {item.perguntas.map(pergunta => (
                  <Text key={pergunta.id} style={styles.questionText}>{pergunta.descricao}</Text>
                ))}
              </>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f8ff',
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 15,
    fontWeight: '600',
    color: '#2c3e50',
  },
  searchInput: {
    height: 50,
    borderColor: '#3498db',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  scrollContainer: {
    flex: 1,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  questionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2980b9',
    marginTop: 10,
  },
  questionText: {
    fontSize: 16,
    color: '#34495e',
    marginVertical: 5,
  },
});
