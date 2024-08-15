import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ScrollView } from 'react-native-gesture-handler';
import { View, Text} from 'react-native';

const profile = () => {
  return (
    <ScrollView>
      <View style={styles.Container}>
        <Image source={require('../../assets/icones/avatar.png')}style={styles.avatar} resizeMode="contain"></Image>
        <Text style={styles.info}> Samuel Gomes Private</Text>
        <Text style={styles.info}> example@outlook.com</Text>
        <View style={styles.CardInsights}>
        <View >
            <Text>Provas Completas</Text>
            <Text style={styles.TaxaAE} >Acertos / Erros</Text>
        </View>  
        <View style={{height: 40, width: 1, backgroundColor: 'black'}}>
        </View>
        
        <View>
          <Text>Explicações Favoritadas</Text>
          <Text style={styles.RespostasCertas}>Respostas Certas</Text>
        </View> 
        
      </View>
      <View style={{height: 40, width: 1, backgroundColor: 'black', bottom: 30, right: 17}}></View>   
      </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  RespostasCertas:{
    marginTop: 70,
  },
  TaxaAE:{
    marginTop: 70,
  },
  CardInsights:{
    marginTop: 55,
    borderColor:'black',
    flexDirection: 'row',
    gap: 60,
  

  },
  info:{
    margin:15,
    textDecorationLine: 'underline',
    fontSize: 20,
    opacity: 0.6
  },
    avatar: {
      
    },
    Container:{
      alignItems: 'center',
      top:65,
    },
    titleContainer: {
      flexDirection: 'row',
      gap: 8,
    },
  });

export default profile