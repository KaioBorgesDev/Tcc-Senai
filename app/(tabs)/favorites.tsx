import CardProvas from '@/components/CardProvas';
import { TitleThemed } from '@/components/TitleThemed';
import { AuthContext } from '@/context/AuthContext';
import axios from 'axios';
import { router } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { View, Pressable, ScrollView, StyleSheet, ActivityIndicator, Text } from 'react-native';

interface Favorito {
  email_user: string,
  prova_fav: number,
  titulo_prova: string
}

const Favorites = () => {
  const [favoritos, setFavoritos] = useState<Favorito[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { email } = useContext(AuthContext);

  useEffect(() => {
    const buscarFavoritos = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/ServicesFavoritos/getAllByEmail/${email}`);
        const response_tratada : Favorito[] = response.data;
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
    <View>
      <TitleThemed background="transparent" titulo="Provas Favoritas" />
      <ScrollView style={styles.ListProcessos}>
        {favoritos.map((prova) => (
          <Pressable onPress={() => router.push({ pathname: '/Selecao', params: { processo_nb: prova.prova_fav } })}>
            <CardProvas
              titulo={prova.titulo_prova}
              descricao={'Faça já!'}
              processo_nb={prova.prova_fav}
            />
        </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  ListProcessos: {
    borderTopColor: 'gray',
    borderBottomColor: 'gray',
    borderColor: 'transparent',
    borderStyle: 'solid',
    borderWidth: 1,
    maxHeight: 400,
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
});

export default Favorites;
