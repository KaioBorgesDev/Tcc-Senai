import { Button } from 'react-native';
import CardProvas from '@/components/CardProvas';
import { TitleThemed } from '@/components/TitleThemed';
import { AuthContext } from '@/context/AuthContext';
import axios from 'axios';
import { router } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { View, Pressable, ScrollView, StyleSheet, ActivityIndicator, Text } from 'react-native';

interface Favorito {
  email_user: string;
  prova_fav: number;
  titulo_prova: string;
}

const Favorites = () => {
  const [favoritos, setFavoritos] = useState<Favorito[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { email } = useContext(AuthContext);


  useEffect(() => {
    const buscarFavoritos = async () => {
      try {
        const response = await axios.get(`http://192.168.1.206:5000/ControllerFavoritos/getAllByEmail/${email}`);
        const response_tratada: Favorito[] = response.data;
        setFavoritos(response_tratada);
      } catch (err) {
        console.error(err);
        setError('Erro ao carregar favoritos. Tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    buscarFavoritos();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>{error}</Text>
      </View>
    );
  }


  return (
    <View style={styles.container}>
      <TitleThemed background="transparent" titulo="Provas Favoritas" />
      <ScrollView style={styles.scrollContainer}>
        {favoritos.map((prova) => (
          <View key={prova.prova_fav} style={styles.card}>
            <Pressable
              accessibilityLabel='pressable'
              onPress={() => router.push({ pathname: '/Selecao', params: { processo_nb: prova.prova_fav } })}
            >
              <CardProvas
                titulo={prova.titulo_prova}
                descricao={'Clique aqui para fazer já!'}
                processo_nb={prova.prova_fav}
              />
            </Pressable>
          
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#c3c3c3',
  },
  scrollContainer: {
    flex: 1,
  },
  card: {
    width: "100%",
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 27,
    paddingLeft: 38,
    paddingVertical: 15,
    marginBottom: 15,
    shadowColor: '#000',
    maxWidth: 800,
    alignSelf: 'center',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionText: {
    fontSize: 16,
    color: '#34495e',
    marginVertical: 5,
  },
});

export default Favorites;
