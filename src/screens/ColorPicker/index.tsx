import {View} from 'react-native';
import UploadImage from '../../components/UploadImage';
import {Styles} from './styles';

export default function ColorPicker(){
    return (
        
        <View style={Styles.container}>
            <UploadImage/>
        </View>
        
    );
}
