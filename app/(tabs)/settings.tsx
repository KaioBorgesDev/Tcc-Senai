import ButtonGreen from '@/components/ButtonGreen';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { AuthContext } from '@/context/AuthContext';
import { router } from 'expo-router';
import { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Settings = () => {
  const { rule } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View>
        {rule === 'adm' ? (
          <ButtonGreen 
            text='Criar Processos' 
            onPress={() => router.push('/Criar_processos')} 
          />
        ) : (
          <Text style={styles.warningText}>
            Você não pode inserir provas ainda.
          </Text>
        )}
        
        <ButtonGreen 
          text='Sobre Nós' 
          onPress={() => alert('Somos uma equipe de duas pessoas comprometidas em oferecer soluções criativas e personalizadas. Combinamos nossas habilidades para entregar resultados de qualidade, sempre com foco em detalhes e eficiência. Valorizamos a comunicação direta e a flexibilidade para atender às suas necessidades, garantindo uma experiência ágil e personalizada. Vamos transformar suas ideias em realidade!')} 
        />
        
        <ButtonGreen text='Sair' onPress={()=>router.push('/Login')}></ButtonGreen>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#c3c3c3',
    alignItems: 'center',
  },
  warningText: {
    color: 'red',
    marginVertical: 15,
    fontSize: 16,
    textAlign: 'center',
  },
  logoutText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#ad1306',
  },
});

export default Settings;
