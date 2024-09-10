import { StyleSheet, View, Text, ScrollView, TextInput, Pressable } from 'react-native';
import CardProvas from '@/components/CardProvas';
import { router } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '@/context/AuthContext';

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

// Componente principal da tela inicial
export default function Explore() {
  // Estado para armazenar os processos seletivos
  const [processosSeletivos, setProcessosSeletivos] = useState<ProcessoSeletivo[]>([]);
  const [valueSearch, setValueSearch] = useState<string>("");
  const {username} = useContext(AuthContext);

  useEffect(() => {
    // Função assíncrona para buscar os processos seletivos
    const buscarProcesso = async () => {
      try {
        const data = await axios.get('http://localhost:5000/all');
        const processos: ProcessoSeletivo[] = data.data;
        setProcessosSeletivos(processos);
      } catch (error) {
        console.log(error);
      }
    };

    buscarProcesso();
  }, []);

  //filtrando os processos com o valor da barra de pesquisa
  const filteredProcessos = processosSeletivos.filter(processo => processo.name.toLowerCase().includes(valueSearch.toLowerCase()) || processo.description.toLowerCase().includes(valueSearch.toLowerCase()))

  return (
    <View style={styles.container}>
     
      {/* Barra de pesquisa */}
      <View style={styles.nav}>
      <Text style ={styles.textBemvindo}>Bem vindo {username}</Text>
        <TextInput
          onChangeText={setValueSearch}
          placeholder='Pesquise aqui: Prova Ensino Superior'
          style={[styles.TextInput, { textAlign: 'center', borderWidth: 1}]}
        />
        
      </View>

      {/* Linha separadora abaixo da barra de pesquisa */}
      <View style={[{ height: 1 }, { backgroundColor: 'gray' }, { margin: 10 }]} />

      {/* Título da seção */}
      <View style={styles.titleContainer}>
        <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Processos Seletivos</Text>
      </View>

      {/* Lista de processos seletivos com scroll */}
      <ScrollView style={styles.ListProcessos}>
        {
       
        filteredProcessos.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => router.push({ pathname: '/Selecao', params: { processo_nb: item.id } })}
          >
            <CardProvas
              titulo={item.name}
              descricao={item.description}
            />
          </Pressable>
        ))
        
        }
      </ScrollView>
      
    </View>
  );
}

// Estilos para a tela
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  TextInput: {
    borderRadius: 20,
    width: 350,
    height: 40,
    backgroundColor: 'white',
  },
  nav: {
    padding: 10,
    alignItems: 'center',
  },
  titleContainer: {
    width: 300,
    height: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 10,
    margin: 50,
    backgroundColor: 'white',
  },
  ListProcessos: {
    borderTopColor: 'gray',
    borderBottomColor: 'gray',
    borderColor: 'transparent',
    borderStyle: 'solid',
    borderWidth: 1,
    maxHeight: 400,
  },
  textBemvindo:{
      bottom: 10,
      margin: 10,
      fontFamily: 'Roboto-Regular',
      fontSize: 30,
      
  },
});
