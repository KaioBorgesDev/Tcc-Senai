import {StyleSheet,View,Image,Text,TouchableOpacity} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

const Selecao = () => {
  return (
    <ScrollView style= {styles.container}>
      
        <View style={styles.cardProva}>
          <Text style={styles.titulo}>1. Leia a seguinte oração</Text>
          <ScrollView style={styles.Pergunta}>“A vida é um soco no estômago.” Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe magnam quibusdam accusantium! Omnis incidunt provident, asperiores sit quos at similique exercitationem impedit facilis minima veritatis ab dolor eligendi nihil ipsam? Lorem ipsum, dolor sit amet consectetur adipisicing elit. A odio aperiam eius impedit et, qui dolorum amet doloribus ipsam asperiores quaerat tempora ab tenetur? Enim sit vitae officia dolore cumque.</ScrollView>
          <View style={styles.ListOpcao}>
          <Text style={styles.Opcao}>18. Leia a seguinte oração</Text>
          <Text style={styles.Opcao}>18. Leia a seguinte oração</Text>
          <Text style={styles.Opcao}>18. Leia a seguinte oração</Text>
          <Text style={styles.Opcao}>18. Leia a seguinte oração</Text>
          <Text style={styles.Opcao}>18. Leia a seguinte oração</Text>
          <Text style={styles.Opcao}>18. Leia a seguinte oração</Text>
          </View>
        </View>
        
    </ScrollView>
  )
}

export default Selecao
const styles = StyleSheet.create({
  Opcao:{
    margin: 10,
    top: 50,
    paddingHorizontal: 80,
    paddingVertical:10,
    backgroundColor:'white',
    borderRadius: 5,
  },
  ListOpcao:{
    top: 10
  },
  Pergunta:{
    top:50,
    paddingHorizontal: 75,
    paddingVertical:10,
    backgroundColor:'white',
    borderRadius: 5,
  },
  container:{
    flex:1,
  },
  titulo:{
    fontSize:30,
    fontWeight: 'bold',
  },
  cardProva:{
      top: 30,
      justifyContent: 'center',
      alignItems:'center'
  }

})