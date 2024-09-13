
import { TouchableOpacity, StyleSheet, Text} from "react-native";

interface props{
    text: string,
    onPress: () => void
}
const ButtonGreen: React.FC<props> =({text, onPress})=>{
    return (
        <TouchableOpacity  style={styles.button}>
        <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    )
    
}
const styles = StyleSheet.create({
    button: {
      margin: 10,
      padding: 15,
      alignSelf: 'center',
      borderRadius: 8,
      backgroundColor: 'green',
      justifyContent: 'center',
      marginTop: 30,
    },
    buttonText: {
      color: 'white',
      textAlign: 'center',
      fontSize: 14,
    }
});

export default ButtonGreen;