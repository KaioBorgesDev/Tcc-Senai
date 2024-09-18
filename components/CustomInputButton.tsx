import React, { useState } from 'react';
import {
    View, Text, TouchableOpacity,
    StyleSheet
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { RadioButton } from 'react-native-paper';


const CustomInputButton  = () => {
    const [selectedValue, setSelectedValue] = useState('option1');
    return(
        <View style={styles.container}>
            <View style={styles.radioGroup}>
                <View style={styles.radioButton}>
                    <RadioButton.Android
                        value="option1"
                        status={selectedValue === 'option1' ? 
                                'checked' : 'unchecked'}
                        onPress={() => setSelectedValue('option1')}
                        color="#007BFF"
                    />
                    <TextInput placeholder='Crie Sua Resposta Gatinho(A)'style={styles.textInput}>
                    </TextInput>
                 
                </View>

                <View style={styles.radioButton}>
                    <RadioButton.Android
                        value="option2"
                        status={selectedValue === 'option2' ? 
                                 'checked' : 'unchecked'}
                        onPress={() => setSelectedValue('option2')}
                        color="#007BFF"
                    />
                    <TextInput  placeholder='Crie Sua Resposta Gatinho(A)'style={styles.textInput}></TextInput>
                </View>
                <View style={styles.radioButton}>
                
                    <RadioButton.Android
                        value="option3"
                        status={selectedValue === 'option3' ? 
                                 'checked' : 'unchecked'}
                        onPress={() => setSelectedValue('option3')}
                        color="#007BFF"
                        
                    />
                    <TextInput placeholder='Crie Sua Resposta Gatinho(A)' style={styles.textInput}></TextInput>
                   
                </View>
                <View style={styles.radioButton}>
                    <RadioButton.Android
                        value="option4"
                        status={selectedValue === 'option4' ? 
                                 'checked' : 'unchecked'}
                        onPress={() => setSelectedValue('option4')}
                        color="#007BFF"
                    />
                    <TextInput placeholder='Crie Sua Resposta Gatinho(A)' style={styles.textInput}></TextInput>
                </View>
                <View style={styles.radioButton}>
                    <RadioButton.Android
                        value="option5"
                        status={selectedValue === 'option5' ? 
                                 'checked' : 'unchecked'}
                        onPress={() => setSelectedValue('option5')}
                        color="#007BFF"
                    />
                    <TextInput  placeholder='Crie Sua Resposta Gatinho(A)'style={styles.textInput}></TextInput>
                </View>
            </View>
        </View>
    )
    
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioGroup: {
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 20,
        borderRadius: 8,
        padding: 16,
        elevation: 4,
        shadowColor: '#000',
        
    },
    radioButton: {
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInput: {
        fontSize: 16,
        color: '#333',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 8,    
        width: 300,
        height: 30,
    },
});
export default CustomInputButton
