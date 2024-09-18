import React, { useState } from 'react';
import {
    View, Text, TouchableOpacity,
    StyleSheet
} from 'react-native';
import { RadioButton } from 'react-native-paper';


const CustomRadioButton  = () => {
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
                    <Text style={styles.radioLabel}>
                       
                     1° Semestre
                    </Text>
                </View>

                <View style={styles.radioButton}>
                    <RadioButton.Android
                        value="option2"
                        status={selectedValue === 'option2' ? 
                                 'checked' : 'unchecked'}
                        onPress={() => setSelectedValue('option2')}
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
