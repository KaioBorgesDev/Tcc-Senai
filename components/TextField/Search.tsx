import {TextInput, StyleSheet} from 'react-native'

const Search = () => {
  return (
    <TextInput style={style.text} 
    placeholder='Prova Ensino Superior'
    >

    </TextInput>
  )
}
const style = StyleSheet.create({
    text: {
        maxWidth: 600,
        height: 40,
        borderWidth: 1,
        backgroundColor: 'white',
        textAlign: 'center',
        justifyContent: 'center',
        borderColor: 'gray',
        borderStyle: 'solid',
        borderRadius: 20
    },

})
export default Search