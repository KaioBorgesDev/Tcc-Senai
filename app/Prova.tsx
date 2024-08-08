import {StyleSheet,View,Image,Text,TouchableOpacity} from 'react-native'

const Selecao = () => {
  return (
    <View style= {styles.container}>
      
        <View style={styles.cardProva}>
          <Text style={styles.titulo}>18. Leia a seguinte oração</Text>
          <View style={styles.Pergunta}>“A vida é um soco no estômago.”</View>
          <View style={styles.Card}>
          <Text style={styles.Opcao}>18. Leia a seguinte oração</Text>
          <Text style={styles.Opcao}>18. Leia a seguinte oração</Text>
          <Text style={styles.Opcao}>18. Leia a seguinte oração</Text>
          <Text style={styles.Opcao}>18. Leia a seguinte oração</Text>
          <Text style={styles.Opcao}>18. Leia a seguinte oração</Text>
          </View>
        </View>
        
    </View>
  )
}

export default Selecao
const styles = StyleSheet.create({
  Opcao:{
    margin: 10,
    top: 50,
    paddingHorizontal: 60,
    paddingVertical:10,
    backgroundColor:'white',
    borderRadius: 5,
  },
  Card:{
    top: 10
    
  },
  Pergunta:{
    top:50,
    paddingHorizontal: 60,
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