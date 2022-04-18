import styled from 'styled-components/native';
import { StyleSheet, Dimensions} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const size = Dimensions.get('screen').width * 1;

const Styles = StyleSheet.create({
    
    ButtonUpload: {
        backgroundColor: '#1567E3',
        height: 42,
        width: 262,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 200,
    },

    ViewDefault:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    TextPosition:{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 250,
    },

    Image:{
        width: size, 
        height: size,
    }
});

const Title = styled.Text`
    font-family: sans-serif;
    font-size: ${RFValue(14)}px;
    color: white;
`;

const TextPage = styled.Text`
    color: rgb(108, 117, 125);
    font-family: sans-serif;
    font-size: ${RFValue(14)}px;
    width: ${RFValue(189)}px;
    height: ${RFValue(58)}px;
    
`;

export {
    Styles,
    Title,
    TextPage
}