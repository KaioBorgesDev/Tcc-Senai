import { StyleSheet, Image, ScrollView, View, Text } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';

const Profile = () => {
  const { email, username } = useContext(AuthContext);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image 
        source={require('../../assets/icones/avatar.png')} 
        style={styles.avatar} 
        resizeMode="contain" 
      />
      <Text style={styles.username}>{username}</Text>
      <Text style={styles.email}>{email}</Text>
      
      <View style={styles.cardInsights}>
        <View style={styles.insightItem}>
          <Text style={styles.insightLabel}>Provas Completas</Text>
          <Text style={styles.insightValue}>50</Text>
        </View>
        
        <View style={styles.insightItem}>
          <Text style={styles.insightLabel}>Acertos / Erros</Text>
          <Text style={styles.insightValue}>{`1.53`}</Text>
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
    backgroundColor: '#f0f8ff',
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
    fontSize: 16,
    color: '#34495e',
    marginBottom: 30,
    textDecorationLine: 'underline',
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
