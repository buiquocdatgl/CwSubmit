import React, { useState, useEffect } from 'react';
import { Text, Image, View, Platform, TouchableOpacity, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import firebase from "../../firebase/fire";
import { ActivityIndicator } from 'react-native-paper';


const PickImage = ({ data, setData }) => {

    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);


    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
        // return () => setImage('');
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
            // await upLoadImage();
        }
    };

    const upLoadImage = async () => {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function () {
                reject(new TypeError('Network request failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', image, true);
            xhr.send(null);
        });

        const ref = firebase.storage().ref().child(new Date().toISOString())
        const snapshot = ref.put(blob)

        snapshot.on(firebase.storage.TaskEvent.STATE_CHANGED,
            () => {
                setUploading(true);

            },
            (error) => {
                setUploading(false);
                console.log(error);
                blob.close();
                return
            },
            () => {
                snapshot.snapshot.ref.getDownloadURL().then((url) => {
                    setUploading(false);
                    console.log(url);
                    setData({ ...data, image: url });
                    console.log("dowload url : ", url);
                    blob.close();
                    return url;
                });
            }
        );
    }


    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', marginLeft: 20 }}>
            {!image && (
                <TouchableOpacity onPress={pickImage}>
                    <Text>Pick Image</Text>
                </TouchableOpacity>
            )}
            {image &&
                <Image
                    source={{ uri: image }}
                    style={{ width: 90, height: 90, borderRadius: 10 }}
                />
            }
            {!uploading ?
                <Button title="Upload" onPress={upLoadImage} />
                : <ActivityIndicator size="large" color="#000"
                />
            }

        </View>
    );
}

export default PickImage;