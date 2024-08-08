import {View,StyleSheet,Text,Image} from 'react-native'

interface CardProvasProps{
    titulo: string,
    descricao: string,
}
const CardProvas: React.FC<CardProvasProps> = ({titulo, descricao}) => {
    
  return (
    <View style={styles.Card}>
         <Image source={require('@/assets/icones/estrela.png')} style={styles.icone} />
        <Text style={styles.Title}>{titulo}</Text>
        <Text style={styles.SubTitle}>{descricao}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    Title:{
        left:45,
        fontSize:18,
        fontWeight:'bold',
    },
    SubTitle:{
        left:45,
        fontSize:12,
        fontWeight:'100',
    },
    icone:{
        top: 24,
        left:10,
    },
    Card:{
        top:5,
        borderStyle:'solid',
        borderWidth: 1,        
        height:80,
        borderColor:'transparent',
        borderBottomColor:'gray'
    },
})

export default CardProvas