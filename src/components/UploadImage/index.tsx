import React, { useState, useEffect } from 'react';
import { Text, View, Image, Dimensions} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button, NativeBaseProvider, Icon} from 'native-base';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

import {
    Styles,
    Title,
    TextPage
} from './styles';

export default function UploadImage(){

    const [IsGalleryPermission, setIsGalleryPermission] = useState(null);
    const [image, setImage] = useState(null);
    
    useEffect(() => {
        (async () => {
            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
            
            setIsGalleryPermission(galleryStatus.status === 'granted');
        })();
    }, []);
    
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        if (!result.cancelled) {
            setImage(result);
        }
        console.log(result);
    };

    if(IsGalleryPermission === false) {
        return <Text>access to gallery not allowed!</Text>;
    }
    
    return(
        <NativeBaseProvider>
            <View style={Styles.TextPosition}>
                <TextPage>
                    Selecione cor a partir de uma imagem da galeria!
                </TextPage>

                <MaterialCommunityIcons name="image-edit-outline" size={34} color="black" />
                
            </View>

            <View style={Styles.ViewDefault}>
                <Button onPress={() => pickImage()} style={Styles.ButtonUpload}
                endIcon={<Icon as={Feather} name="upload" size={18} />}>
                    <Title>SELECIONAR IMAGEM</Title>
                </Button> 
                {image && <Image source={image} style={Styles.Image} /> }
            </View>
        </NativeBaseProvider>
    );
}