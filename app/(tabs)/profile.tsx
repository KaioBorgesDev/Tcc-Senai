
import { StyleSheet, Image} from 'react-native';
import { ScrollView } from 'react-native';
import { View, Text} from 'react-native';
import { AuthContext }from '../../context/AuthContext'
import { useContext } from 'react';
const profile = () => {
    const {email,username} = useContext( AuthContext)
  return (
    <ScrollView>
      <View style={styles.Container}>
        <Image source={require('../../assets/icones/avatar.png')} resizeMode="contain"></Image>
        <Text style={styles.info}> {username}</Text>
        <Text style={styles.info}> {email}</Text>
        <View style={styles.CardInsights}>
            <View >
              <Text>Provas Completas</Text>
              <Text>50</Text>
              
              <Text style={styles.TaxaAE}>Acertos / Erros</Text>
              <Text style={styles.text}>
                1.53
              </Text>
            </View>  
        </View>
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
    gap: 50,
    margin: 2,
  },
  info:{
    margin:15,
    textDecorationLine: 'underline',
    fontSize: 20,
    opacity: 0.6
  },
  text:{
    color: 'red',
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