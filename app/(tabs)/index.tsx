import { Image, StyleSheet, Platform, View, Text, ScrollView} from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Search from '@/components/TextField/Search';


export default function HomeScreen() {
  return (
    <ScrollView >
    <Search/>

   

    <ScrollView>
    <View style={styles.titleContainer}>
      <Text>Processos Seletivos</Text>
    </View>
    </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    maxWidth: 200,
    height: 50,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 10
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
