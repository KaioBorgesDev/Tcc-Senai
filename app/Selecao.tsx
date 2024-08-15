import { router } from 'expo-router'
import {StyleSheet,View,Image,Text,TouchableOpacity} from 'react-native'

const processo = () => {
  return (
    <View style={styles.container}>
      <View style={styles.fundo}>
       <Image source={require('@/assets/images/prova.jpg')} style={styles.fundoImage} />
       <View style = {styles.cardTitulo}>
          <Text style ={styles.titulo}>Processo Seletivo - Aprendizagem Industrial </Text>
          <Text style={styles.subtitulo}>20 questões de Língua Portuguesa, 19 questões de Matemática e 20 questões de Ciências</Text>
          <TouchableOpacity onPress={()=>{router.push({pathname: '/Prova',
                params: {param1: '1', param2: '1231'}
                })}} style={styles.button}>Iniciar Prova</TouchableOpacity >   
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
      button:{
        padding: 15,
        backgroundColor:'green',
        textAlign:'center',
        justifyContent:'center',
        alignSelf:'center',
        top: 30,
        color:'white',
        fontFamily:'Sans-Serif',
        fontSize: 14,
        borderRadius:8,
      },
      cardTitulo:{
        

      },
      subtitulo:{
        top:15,
        fontSize:15,
        width:300,
      },
      titulo:{
        top:5,
        fontSize:15,
        width:200,
      },
      container:{
        margin:8,
        top:100,
        height:480,
        borderRadius:8,
        backgroundColor:'white'
      },
      fundo:{
        alignItems:'center',
        justifyContent:'center',
        top:25,
        borderRadius:8,
        
        
      },
    fundoImage:{
      height:250,
      width:300,
    }
})
export default processo
