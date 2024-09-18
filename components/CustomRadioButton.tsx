import React, { useState } from 'react';
import {
    View, Text, TouchableOpacity,
    StyleSheet
} from 'react-native';
import { RadioButton } from 'react-native-paper';

interface CustomRadioButtonProps{
    onValueChanged: (value: string) => void
}



const CustomRadioButton : React.FC<CustomRadioButtonProps>  = ({onValueChanged}) => {
    const [selectedValue, setSelectedValue] = useState<string>('1');

    const handleValueChanged = (value : string) => {
        setSelectedValue(value);
        onValueChanged(value)
    }
    return(
        <View style={styles.container}>
            <View style={styles.radioGroup}>
                <View style={styles.radioButton}>
                    <RadioButton.Android
                        value="1"
                        status={selectedValue === '1' ? 
                                'checked' : 'unchecked'}
                        onPress={() => handleValueChanged('1')}
                        color="#007BFF"
                    />
                    <Text style={styles.radioLabel}>
                       
                     1° Semestre
                    </Text>
                </View>

                <View style={styles.radioButton}>
                    <RadioButton.Android
                        value="2"
                        status={selectedValue === '2' ? 
                                 'checked' : 'unchecked'}
                        onPress={() => handleValueChanged('2')}
                        color="#007BFF"
                    />
                    <Text style={styles.radioLabel}>
                    2° Semestre
                    </Text>
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
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    radioButton: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    radioLabel: {
                fontSize: 16,
        color: '#333',
    },
});
export default CustomRadioButton
