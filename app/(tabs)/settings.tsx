import ButtonGreen from '@/components/ButtonGreen'
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { AuthContext } from '@/context/AuthContext';
import { router } from 'expo-router'
import { useContext } from 'react';
import {View, Text} from 'react-native'
import { Button } from 'react-native-paper';

const settings = () => {
  const {rule} = useContext(AuthContext);
  return(
    <View>
      {rule === 'adm' ?  (<ButtonGreen text='Criar Processos' onPress={() => router.navigate('/Criar_processos')}></ButtonGreen>) : (<Text>Você não pode inserir provas ainda.</Text>)}
      
      <ButtonGreen text='Sobre Nós' onPress={() => alert('Somos uma equipe de duas pessoas comprometidas em oferecer soluções criativas e personalizadas. Combinamos nossas habilidades para entregar resultados de qualidade, sempre com foco em detalhes e eficiência. Valorizamos a comunicação direta e a flexibilidade para atender às suas necessidades, garantindo uma experiência ágil e personalizada. Vamos transformar suas ideias em realidade!')}></ButtonGreen>
      <TabBarIcon name={'exit'} color={'black'}onPress= {() => router.navigate('/')}><Text>Sair</Text></TabBarIcon>
    </View>
      )
}

  


export default settings