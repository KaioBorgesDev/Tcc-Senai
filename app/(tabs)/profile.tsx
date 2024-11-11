import { StyleSheet, Image, ScrollView, View, Text } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

interface Score {
  email_User: string;
  acertos: number;
  erros: number;
}

const Profile = () => {
  const { email, username } = useContext(AuthContext);
  const [score, setScore] = useState<Score | undefined>(undefined);

  useEffect(() => {
    // Função assíncrona para buscar o score
    const getScore = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/ServicesScores/GetByEmail/${email}`);
        const response_tratada: Score = response.data;
        setScore(response_tratada);
      } catch (err) {
        console.error(err);
      }
    };

    if (email) {
      getScore();
    }
  }, [email]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('../../assets/icones/avatar.png')}
        style={styles.avatar}
        resizeMode="contain"
      />
      <Text style={styles.username}>Username: {username}</Text>
      <Text style={styles.email}>Email: {email}</Text>

      <View style={styles.cardInsights}>
        <View style={styles.insightItem}>
          <Text style={styles.insightLabel}>FeedBack:</Text>
          
        </View>

        <View style={styles.insightItem}>
          <Text style={styles.insightLabel}>Acertos / Erros</Text>
          <Text style={styles.insightValue}>{score ? (score.acertos / (score.acertos + score.erros)).toFixed(2) : '0.00'}</Text>
          <Text style={styles.insightLabel}>Continue melhorando!</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 50,
    backgroundColor: '#c3c3c3',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#3498db',
    marginBottom: 20,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  email: {
    fontSize: 22,
    color: '#34495e',
    marginBottom: 30,
    textDecorationLine: 'none',
  },
  cardInsights: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    elevation: 3,
    width: '90%',
  },
  insightItem: {
    marginBottom: 15,
    alignItems: 'center',
  },
  insightLabel: {
    fontSize: 16,
    color: '#2980b9',
  },
  insightValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e74c3c',
  },
});

export default Profile;
