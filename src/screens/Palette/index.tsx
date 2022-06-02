import { RouteProp, useRoute } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { FloatButton } from '../../components/FloatButton';
import { Header } from '../../components/Header';
import { AppStackParamList } from '../../routes/app-stack.routes';
import { PaletteContainer } from './styles';

export function Palette() {
  const {
    params: { palette },
  } = useRoute<RouteProp<AppStackParamList>>();

  return (
    <>
      <Header type="back" title="Paleta" option={true} />
      <PaletteContainer>
        <FloatButton bottom={15} right={15} onPress={() => {}} />
      </PaletteContainer>
    </>
  );
}
