import { Image, StyleSheet, Platform, View, Text, ScrollView, TextInput} from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import CardProvas from '@/components/CardProvas';



export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <TextInput placeholder='Prova Ensino Superior' style={[styles.TextInput, {textAlign:'center'}]}></TextInput>
      <View style={[{height:1},{backgroundColor:'gray'}, {width:1000},{top:5}]}></View>
      <View style={styles.subContainer}>
      
        
        <View style={styles.titleContainer}>
          <Text>Processos Seletivos</Text>
        </View>
        <View style={styles.ContainerProcessos}>
          <ScrollView style={styles.ListProcessos}>
            <CardProvas ></CardProvas>
            <CardProvas ></CardProvas>
            <CardProvas ></CardProvas>
            <CardProvas ></CardProvas>
            <CardProvas ></CardProvas>
            <CardProvas ></CardProvas>
            <CardProvas ></CardProvas>
            <CardProvas ></CardProvas>
            <CardProvas ></CardProvas>
          </ScrollView>
        </View>
      </View> 
   </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    top:20,
  },
  ContainerProcessos:{
    top:5,
    width: 350,
    height:400,
    maxWidth:600,
    borderTopColor: 'gray',
    borderBottomColor:'gray',
    borderColor:'transparent',
    borderStyle: 'solid',
    borderWidth:0.5,
    
  },
  ListProcessos:{

  },
  TextInput:{
    
    borderRadius:20,
    width: 400,
    height:60,
    backgroundColor:'white',
    

  },
  subContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },

  titleContainer: {
    width:170,
    height: 40,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 10,
    bottom: 20
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
