import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, Image, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import { images, COLORS, SIZES, FONTS } from '../constants/index';
import { TextInput } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Searchbar } from "react-native-paper";
import CheckData from '../components/Confirm'

const { width } = Dimensions.get('screen');
const cardWidth = width / 1.8;

const ViewDataScreen = ({ navigation }) => {

    const [value, setvalue] = useState([]);
    const [visible, setVisible] = useState(false);
    const [item, setItem] = useState('');
    const [key, setKey] = useState('');
    const [searchedValue, setSearchedValue] = useState([]);


    const showDialog = (e) => {
        setVisible(!visible);
        setItem(e)
    };

    console.log(item);

    const fectData = async () => {
        let request = await fetch("http://192.168.3.133:3000/get");
        let response = await request.json();
        setvalue(response);
    }

    const handleDelete = async () => {
        await fetch(`http://192.168.3.133:3000/delete/${item._id}`, {
            method: 'DELETE'
        });
        showDialog();
        await fectData();
    }

    const search = async (key) => {
        let request = await fetch("http://192.168.3.133:3000/search", {
            method: 'POST',
            body: JSON.stringify({ propertyType: key }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        let response = await request.json();
        setvalue(response);
    }
    console.log(setvalue);
    console.log(key);

    useEffect(() => {
        if(key.length > 0) {
            search(key)
        }else{
            fectData();
        }
        
    }, [key])

    useEffect(() => {
        fectData();
    }, [])

    // useEffect(() => {
    //     console.log(value)
    // }, [value])

    return (
        <View style={{ flex: 1 }}>
            <Text style={styles.header}>View Data</Text>
            <Searchbar
                placeholder="Search property type"
                value={key}
                onSubmitEditing={() => {
                    search(key);
                }}
                onChangeText={(text) => {
                    setKey(text);
                }}
                style={styles.input}
            />
            <FlatList
                data={value}
                renderItem={({ item, index }) => (
                    <View style={{ ...styles.card }}>
                        <TouchableOpacity
                            style={styles.priceTag}
                            onPress={() => showDialog(item)}
                        >
                            <Text
                                style={{ color: COLORS.white, fontSize: 20, fontWeight: 'bold' }}>
                                Delete
                            </Text>
                        </TouchableOpacity>
                        <Image
                            source={{
                                uri: item.image
                            }}
                            style={{
                                height: 200,
                                width: '100%',
                                borderTopLeftRadius: 15,
                                borderTopRightRadius: 15,
                            }}
                        />

                        <View style={styles.cardDetails}>
                            <Text style={styles.text}>ID: {item._id}</Text>
                            <Text style={styles.text}>PropertyType: {item.propertyType}</Text>
                            <Text style={styles.text}>BedRome: {item.bedRoom}</Text>
                            <Text style={styles.text}>Date: {item.addingDate}</Text>
                            <Text style={styles.text}>MoneyRent: {item.monthlyRentPrice}</Text>
                            <Text style={styles.text}>FurnitureType: {item.furnitureType}</Text>
                            <Text style={styles.text}>Notes: {item.notes}</Text>
                            <Text style={styles.text}>ReportName: {item.reporterName}</Text>
                            <Text style={styles.text}>Name: {item.name}</Text>
                        </View>

                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
            <CheckData
                bag="Do you want to Delelte"
                visible={visible}
                handleSubmit={handleDelete}
                setVisible={setVisible}
            />
            {/* {
                value.map((item, index) => (
                    <View style={{ ...styles.card }} key={index}>
                        <TouchableOpacity
                            style={styles.priceTag}
                            onPress={showDialog}
                        >
                            <Text
                                style={{ color: COLORS.white, fontSize: 20, fontWeight: 'bold' }}>
                                Delete
                            </Text>
                        </TouchableOpacity>
                        <Image
                            source={{
                                uri: item.image
                            }}
                            style={{
                                height: 200,
                                width: '100%',
                                borderTopLeftRadius: 15,
                                borderTopRightRadius: 15,
                            }}
                        />

                        <View style={styles.cardDetails}>
                            <Text style={styles.text}>ID: {item._id}</Text>
                            <Text style={styles.text}>PropertyType: {item.propertyType}</Text>
                            <Text style={styles.text}>BedRome: {item.bedRoom}</Text>
                            <Text style={styles.text}>Date: {item.addingDate}</Text>
                            <Text style={styles.text}>MoneyRent: {item.monthlyRentPrice}</Text>
                            <Text style={styles.text}>FurnitureType: {item.furnitureType}</Text>
                            <Text style={styles.text}>Notes: {item.notes}</Text>
                            <Text style={styles.text}>ReportName: {item.reporterName}</Text>
                            <Text style={styles.text}>Name: {item.name}</Text>
                        </View>
                        <CheckData
                            bag="Do you want to Delelte"
                            visible={visible}
                            handleSubmit={() => handleDelete(item._id)}
                            showDialog={showDialog} />
                    </View>

                ))
            } */}
        </View>
    );
};

export default ViewDataScreen;

const styles = StyleSheet.create({
    header: {
        fontSize: 28,
        textAlign: 'center',
        marginTop: 30,
        marginBottom: 20,
        fontWeight: 'bold',

    },
    cardDetails: {
        height: 240,
        borderRadius: 15,
        backgroundColor: COLORS.white,
        position: 'absolute',
        bottom: -10,
        paddingTop: 10,
        paddingLeft: 20,
        width: '100%',
    },
    // card: {
    //     flex: 1,
    //     backgroundColor: '#D3D3D3',
    //     margin: 10,
    //     textAlign: 'center',
    //     fontSize: 20,
    //     paddingTop: 20,
    //     paddingBottom: 20,
    //     paddingLeft: 20,
    //     marginTop: 10,
    //     borderRadius: 15
    // },
    card: {
        height: 400,
        width: 382,
        marginRight: 20,
        borderRadius: 15,
        backgroundColor: COLORS.white,
        marginTop: 10,
        marginLeft: 15,
        marginBottom: 20,
    },
    priceTag: {
        height: 60,
        width: 80,
        backgroundColor: COLORS.search,
        position: 'absolute',
        zIndex: 1,
        right: 0,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 18
    },
    input:{
        width: '92%',
        marginLeft: 15,
        marginBottom: 20,
        borderRadius: 10
    }

});