
import { View ,StyleSheet,Text} from 'react-native'

interface Props{
    titulo: string,
    background: string,
}
export const TitleThemed: React.FC<Props> = ({titulo, background}) => {
  return (
    <View style={[styles.titleContainer, {backgroundColor: background}]}>
        
          <Text style={{textAlign: 'center', fontWeight: 'bold'}}>{titulo}</Text>
      </View>
  )
}
const styles = StyleSheet.create({
    titleContainer: {
        width: 300,
        height: 50,
        justifyContent: 'center',
        alignSelf: 'center',
        borderWidth: 1,
        borderRadius: 10,
        margin: 50,
        
      },
})