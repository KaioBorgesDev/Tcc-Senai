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
                prova_fav: processo_nb,
                titulo_prova: titulo,
            });
            
            if(response_unfavorite.status == 200){
                setIcon(false);
                return;
            }
             alert('Não foi removido.');
        }else{
            const response_favorite = await axios.post('http://localhost:5000/ServicesFavoritos/insert', {
                email_user: email,
                prova_fav: processo_nb,
                titulo_prova: titulo
            });
            if(response_favorite.status == 200){
                return setIcon(true)
            }
            alert(response_favorite.data);
        }
    }
    return (
        <View style={styles.Card}>
            <View style={styles.ContainerEstrela}>
                <Pressable onPress={()=> enviarFavoritos()}>{icon ? <Ionicons name='star'/> : <Ionicons name='star-outline'/>}</Pressable>
                <Text style={styles.Title}>{titulo}</Text>
            </View>
            <Text style={styles.SubTitle}>{descricao}</Text>
        </View>
      )

}

const styles = StyleSheet.create({
    Title:{
        fontSize:18,
        fontWeight:'bold',
    },
    SubTitle:{
        flex: 1,
        flexWrap: 'wrap',
        fontSize:12,
        fontWeight:'100',
        marginBottom: 10,
    },
    Card:{
        display: "flex",
        gap: 10,
    },
   ContainerEstrela:{
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
   }
})

export default CardProvas