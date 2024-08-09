import { Image, StyleSheet, Platform, View, Text, ScrollView, TextInput,Pressable} from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import CardProvas from '@/components/CardProvas';
import { router } from 'expo-router';




export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <TextInput placeholder='Pesquise aqui: Prova Ensino Superior' style={[styles.TextInput, {textAlign:'center'}]}></TextInput>
      </View>
      <View style={[{height:1},{backgroundColor:'gray'}, {margin: 10}]}></View>
      <View style={styles.titleContainer}>
          <Text style={{textAlign: 'center', fontWeight: 'bold'}}>Processos Seletivos</Text>
      </View>
      <ScrollView style={styles.ListProcessos}>
        <Pressable onPress={()=> router.navigate('/Selecao')}>
        <CardProvas titulo='Prova de Tecnologia' descricao='Técnologo de 2024, 1° Semestre' ></CardProvas>
        </Pressable>
        <Pressable onPress={()=> router.push('/Selecao')}>
        <CardProvas titulo='Prova de Tecnologia' descricao='Técnologo de 2024, 1° Semestre' ></CardProvas>
        </Pressable>
        <Pressable onPress={()=> router.push('/Selecao')}>
        <CardProvas titulo='Prova de Tecnologia' descricao='Técnologo de 2024, 1° Semestre' ></CardProvas>
        </Pressable>
        <Pressable onPress={()=> router.push('/Selecao')}>
        <CardProvas titulo='Prova de Tecnologia' descricao='Técnologo de 2024, 1° Semestre' ></CardProvas>
        </Pressable>
        <Pressable onPress={()=> router.push('/Selecao')}>
        <CardProvas titulo='Prova de Tecnologia' descricao='Técnologo de 2024, 1° Semestre' ></CardProvas>
        </Pressable>
        <Pressable onPress={()=> router.push('/Selecao')}>
        <CardProvas titulo='Prova de Tecnologia' descricao='Técnologo de 2024, 1° Semestre' ></CardProvas>
        </Pressable>
        
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  TextInput:{
    borderRadius:20,
    width: 350,
    height:40,
    backgroundColor:'white',
  },
  nav:{
    padding: 10,
    alignItems: 'center'
  },
  titleContainer: {
    width: 300,
    height: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 10,
    margin: 50,
    backgroundColor: 'white'
  },
  ListProcessos:{
    borderTopColor: 'gray',
    borderBottomColor:'gray',
    borderColor:'transparent',
    borderStyle: 'solid',
    borderWidth: 1,
    maxHeight: 400
  }
});
