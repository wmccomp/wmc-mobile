import React, { useState, useEffect } from 'react';
import { Text, View, Button, Image, StyleSheet, Dimensions} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const size = Dimensions.get('screen').width * 1;

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
        console.log(result);
        if (!result.cancelled) {
            setImage(result);
        }
    };

    if(IsGalleryPermission === false) {
        return <Text>access to gallery not allowed!</Text>;
    }
    
    return(
    <View style={Styles.container}>
        <Button title="pick image from gallery" onPress={() => pickImage()} /> 
        {image && <Image source={image} style={{width: size, height: size}} /> }
    </View>
    );
}

const Styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center'
    }
});