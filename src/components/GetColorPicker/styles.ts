import {Text, Pressable} from 'react-native';
import styled from 'styled-components';

const BlockColor = styled(Pressable)`
    background-color: whitesmoke;
    color: #9a9797;
    border-radius: 17px;
    border-color: transparent;
    font-size: 16px;
    width: 55px;
    height: 55px;

`
const codeColor = styled(Text)`
    font-size: 18px;
    text-align: center;
    color: #000000;
`
const nameColor = styled(Text)`
    font-size: 18px;
    text-align: center;
    color: #000000;
`

export {
    BlockColor,
    codeColor,
    nameColor
}
