import React from 'react';
import { Text, StyleSheet, View, TextInput, } from 'react-native'
import IonicIcon from 'react-native-vector-icons/Ionicons'
import { Picker } from '@react-native-picker/picker'

const Dropdown = ({ label, icon, changeValue, value, data, name }) => {
    return (
        <View style={styles.dropContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.iconHome}>
                    <IonicIcon name={icon} size={15} color="white" />
                </View>
                <Text style={styles.dropLabel}>{label}</Text>
            </View>
            <View style={styles.dropContainer}>
                <View style={styles.dropInput}>
                    <Picker
                        selectedValue={value}
                        style={{ height: 50, width: 300 }}
                        onValueChange={(value, index) => changeValue(name, value)}
                    >
                        {
                            data.map((item, index) => (
                                <Picker.Item
                                    label={item.label}
                                    style={{ color: item.value === '' ? 'gray' : 'black' }}
                                    value={item.value} 
                                    key={index}
                                    enabled={item.value !== ''}
                                />
                            ))
                        }
                    </Picker>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    iconHome: {
        backgroundColor: 'black',
        height: 25,
        width: 25,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    dropContainer: {
        marginVertical: 10,
        width: 350,
        flex: 1,
    },
    dropLabel: {
        color: "#666",
        fontWeight: '700',
        fontSize: 18,
        marginLeft: 6
    },
    dropInput: {
        borderColor: "lightgray",
        borderWidth: 1,
        width: "92%",
        borderRadius: 10,
        marginTop: 10,
        paddingLeft: 25,
        paddingRight: 10,
        color: "black",
        flex: 1,
        alignItems: 'center',
    },
    required: {
        color: "red",
        position: "absolute",
        top: 25,
        right: 10,
        fontSize: 25
    },
    erorrMsg: {
        color: "red",
        fontSize: 16,
        fontWeight: "400",
        marginLeft: 3
    },
})

export default Dropdown;