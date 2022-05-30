import { Text, View } from 'react-native';
import { Header } from '../../components/Header';

export function Palette() {
  return (
    <>
      <Header type="back" title="Paleta" option={true} />
      <View>
        <Text>Paleta</Text>
      </View>
    </>
  );
}
