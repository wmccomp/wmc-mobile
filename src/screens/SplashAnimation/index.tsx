import React, {useEffect} from 'react';
import { View, Text, Dimensions } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/core';
import LottieView from 'lottie-react-native';

import Animation from '../../../assets/splash.json';
import { Styles } from './styles';

const size = Dimensions.get('window').width * 0.5;

export default function SplashAnimation(){
    
    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(() => {
            navigation.dispatch(CommonActions.reset({
                index: 0,
                routes: [{name: 'Home'}]
            }))
        }, 4000);
    }, [])

    return (
        <View style={Styles.container}>
            <LottieView source={Animation} style={{width: size, height: size}} 
                autoPlay loop resizeMode='contain' />
        </View>
    );
}
