import {View,StyleSheet,Text,Image} from 'react-native'
import { Pressable } from 'react-native'
import { useContext, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { AuthContext } from '@/context/AuthContext'
import axios from 'axios'

interface CardProvasProps{
    titulo: string,
    descricao: string,
    processo_nb: number
}
const CardProvas: React.FC<CardProvasProps> = ({titulo, descricao, processo_nb}) => {
    const [icon, setIcon] = useState<boolean>(false); 
    const {email} = useContext(AuthContext);


    const enviarFavoritos = async () =>{
        if(icon == true){
            const response_unfavorite = await axios.post('http://localhost:5000/ServicesFavoritos/remove', {
                email_user: email,
                prova_fav: processo_nb
            });
            
            if(response_unfavorite.status == 200){
                setIcon(false);
                return;
            }
             alert('Não foi removido.');
        }else{
            const response_favorite = await axios.post('http://localhost:5000/ServicesFavoritos/insert', {
                email_user: email,
                prova_fav: processo_nb
            });
            
            if(response_favorite.status == 200){
                return setIcon(true)
            }
            alert('Não foi adicionado.');
        }
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