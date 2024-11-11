import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

interface OnboardingProps {
    caminho_imagem: string; // Este será o nome da chave no objeto de imagens
    texto: string;
    proxima_pagina: () => void;
}

const imagens: { [key: string]: any } = {
    Trust: require('../assets/images/Onboarding/Trust.png'),
    Lupa:  require('../assets/images/Onboarding/Lupa.png'),
    Celular: require('../assets/images/Onboarding/Celular.png')
    
};

const Onboarding: React.FC<OnboardingProps> = ({ caminho_imagem, texto, proxima_pagina }) => {
    const imagemSource = imagens[caminho_imagem] || imagens.Trust; // Fallback para a imagem padrão

    return (
        <View style={styles.container}>
            <Image source={imagemSource} />
            <Text style={styles.text}>{texto}</Text>
            <TouchableOpacity style={styles.button} onPress={proxima_pagina}>
                <Text style={{ color: 'white' }}>Próximo</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#696969',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: 31,
        margin: 30,
        textAlign: 'center',
        fontFamily: 'SpaceMono-Regular',
    },
    button: {
        backgroundColor: '#292929',
        width: 200,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
});

export default Onboarding;
