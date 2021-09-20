import React, { useState, useEffect } from 'react';
import { Text, Image, View, Platform, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const PickImage = ({ data, setData }) => {

    const [image, setImage] = useState(null);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', marginLeft: 20 }}>
            {!image && (
                <TouchableOpacity onPress={pickImage}>
                    <Text>Pick Image</Text>
                </TouchableOpacity>
            )}
            {image && <Image source={{ uri: image }} style={{  width: 90, height: 90, borderRadius: 10 }} />}
        </View>
    );
}

export default PickImage;