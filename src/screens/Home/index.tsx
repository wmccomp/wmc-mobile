import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { Styles } from './styles';

export default function Home() {
  return (
    <View style={Styles.container}>
      <Text>Wheres My Color Mobile Init!</Text>
      <StatusBar style="auto" />
    </View>
  );
}
