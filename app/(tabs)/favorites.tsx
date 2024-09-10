import CardProvas from '@/components/CardProvas'
import { TitleThemed } from '@/components/TitleThemed'
import { router } from 'expo-router'
import {View, Pressable, ScrollView, StyleSheet} from 'react-native'

const favorites = () => {
  return (
    <View>
      <TitleThemed background='transparent' titulo='Provas Favoritas'></TitleThemed>
      <ScrollView style={styles.ListProcessos}>
       <Pressable onPress={()=> router.navigate('/Selecao')}>
         <CardProvas titulo='Prova de Tecnologia' descricao='Técnologo de 2024, 1° Semestre' ></ CardProvas>
       </Pressable>
       <Pressable onPress={()=> router.navigate('/Selecao')}>
         <CardProvas titulo='Prova de Tecnologia' descricao='Técnologo de 2024, 1° Semestre' ></ CardProvas>
       </Pressable>
       <Pressable onPress={()=> router.navigate('/Selecao')}>
         <CardProvas titulo='Prova de Tecnologia' descricao='Técnologo de 2024, 1° Semestre' ></ CardProvas>
       </Pressable>
       <Pressable onPress={()=> router.navigate('/Selecao')}>
         <CardProvas titulo='Prova de Tecnologia' descricao='Técnologo de 2024, 1° Semestre' ></ CardProvas>
       </Pressable>
      </ScrollView>
      
    </View>
  )
}

const styles = StyleSheet.create({
  ListProcessos:{
    borderTopColor: 'gray',
    borderBottomColor:'gray',
    borderColor:'transparent',
    borderStyle: 'solid',
    borderWidth: 1,
    maxHeight: 400
  }
}
)
export default favorites