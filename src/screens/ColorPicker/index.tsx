import {StyleSheet, View, SafeAreaView} from 'react-native';

import {BlockColor, TextColor} from '../../components/GetColorPicker';
import UploadImage from '../../components/UploadImage';

export default function ColorPicker(){
    return (
        <View style={styles.container}>
            <UploadImage/>

            <SafeAreaView style={styles.BlockColor}>
                <BlockColor />
            </SafeAreaView>
    
        </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
    BlockColor: {
        flex: 0.4,
        justifyContent: 'center',
        alignContent: 'center'
    }
});
