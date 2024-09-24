import {View,StyleSheet,Text,Image} from 'react-native'
import { Pressable } from 'react-native'
import { useContext, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { AuthContext } from '@/context/AuthContext'
import axios from 'axios'

interface CardProvasProps{
    titulo: string,
    descricao: string,
    
}
const CardProvas: React.FC<CardProvasProps> = ({titulo, descricao}) => {
    const [icon, setIcon] = useState<boolean>(false); 
    const {email} = useContext(AuthContext)

    const enviarFavoritos = async () =>{
        const  response = await axios.post('http://192.168.1.10:3333/')
        setIcon(true);
    }
  return (
   
    <View style={styles.Card}>
       
        <Pressable style={styles.icone} onPress={()=> enviarFavoritos()}>{icon ? <Ionicons name='star'/> : <Ionicons name='star-outline'/>}</Pressable>
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