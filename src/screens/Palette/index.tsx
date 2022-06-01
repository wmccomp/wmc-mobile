import { Text, View } from 'react-native';
import { FloatButton } from '../../components/FloatButton';
import { Header } from '../../components/Header';
import { PaletteContainer } from './styles';

export function Palette() {
  return (
    <>
      <Header type="back" title="Paleta" option={true} />
      <PaletteContainer>
        <FloatButton bottom={15} right={15} onPress={() => {}} />
      </PaletteContainer>
    </>
  );
}
