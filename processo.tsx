import ButtonGreen from "@/components/ButtonGreen";
import CardProvas from "@/components/CardProvas";
import axios from "axios";
import { router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { ScrollView, View,Text,StyleSheet, Pressable} from "react-native"

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
  
const Processos =() =>{

    const [processosSeletivos, setProcessosSeletivos] = useState<ProcessoSeletivo[]>([]);
 
  

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
    return(
        <ScrollView>
            <Text style={styles.Titulo}>Processos Seletivos</Text>
              {/* Linha separadora abaixo da barra de pesquisa */}
             <View style={[{ height: 1 }, { backgroundColor: 'gray' }, { margin: 10 }]} />
            <ButtonGreen text='Processos' onPress={()=> router.push}></ButtonGreen>
            {/* Lista de processos seletivos com scroll */}

        <ScrollView style={styles.ListProcessos}>
        {
        processosSeletivos.map((item) => (
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
      <View></View>
      <ButtonGreen text='Criar' onPress={()=> router.push}></ButtonGreen>

    </ScrollView>
    
    )

}

const styles=StyleSheet.create({
    Titulo:{
        marginTop:"10%",
        fontSize: 24,
        textAlign: 'center',
    },
    ListProcessos: {
        
        borderTopColor: 'gray',
        borderBottomColor: 'gray',
        borderColor: 'transparent',
        borderStyle: 'solid',
        borderWidth: 1,
        maxHeight: 400,
    }
});
export default Processos