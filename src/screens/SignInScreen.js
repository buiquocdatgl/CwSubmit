import React, { useState, useContext } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    Dimensions,
    StatusBar,
    KeyboardAvoidingView,
    Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { AuthenticationContext } from "../../service/context";

const SignInScreen = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn, error } = useContext(AuthenticationContext);

    // const signIn = async () => {
    //     try {
    //         const response = await firebase.auth().signInWithEmailAndPassword(email, password);
    //         navigation.navigate('HomeScreen');
    //     } catch (err) {
    //         setError(err.message);
    //     }

    // }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#BF6B7B' barStyle="light-content" />
            <View style={styles.header}>
                <Animatable.Image
                    animation="bounceIn"
                    duraton="1500"
                    source={require('../assets/images/logo.png')}
                    style={styles.logo}
                    resizeMode="cover"
                />
            </View>


            <Animatable.View
                animation="fadeInUpBig"
                style={styles.footer}
            >
                    <Text style={styles.text_footer
                    }>Username</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="user-o"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Your Email"
                            placeholderTextColor="#666666"
                            style={styles.textInput}
                            autoCapitalize="none"
                            value={email}
                            onChangeText={(e) => setEmail(e)}
                        />
                    </View>

                    <Text style={[styles.text_footer, {
                        marginTop: 35
                    }]}>
                        Password
                    </Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="lock"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Your Password"
                            style={styles.textInput}
                            autoCapitalize="none"
                            value={password}
                            onChangeText={(p) => setPassword(p)}
                            secureTextEntry
                        />
                        <TouchableOpacity
                        >
                            <Feather
                                name="eye-off"
                                color="grey"
                                size={20}
                            />
                        </TouchableOpacity>
                    </View>



                    <TouchableOpacity>
                        <Text style={{ color: 'black', marginTop: 15 }}>Forgot password?</Text>
                    </TouchableOpacity>

                    <View style={styles.button}>
                        <TouchableOpacity
                            style={styles.signIn}
                            onPress={() => signIn(email, password)}
                        >
                            <LinearGradient
                                colors={['#BF6B7B', '#BF6B7B']}
                                style={styles.signIn}
                            >
                                <Text style={[styles.textSign, {
                                    color: '#fff'
                                }]}>Sign In</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.navigate('SignUp')}
                            style={[styles.signIn, {
                                borderColor: '#BF6B7B',
                                borderWidth: 1,
                                marginTop: 15
                            }]}
                        >
                            <Text
                                style={[styles.textSign, {
                                    color: 'black'
                                }]}
                            >
                                Sign Up
                            </Text>
                        </TouchableOpacity>
                    </View>
            </Animatable.View>
        </View>
    )
}

export default SignInScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#BF6B7B'
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 50,
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    errorMess: {
        color: '#FF0000',
        fontSize: 14,
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    centered_view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#BF6B7B'
    },
    warning_modal: {
        width: 300,
        height: 300,
        backgroundColor: '#BF6B7B',
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 20,
    },
    warning_button: {
        backgroundColor: '#00ffff',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    text: {
        color: '#000000',
        fontSize: 20,
        margin: 10,
        textAlign: 'center',
    },
    logo: {
        width: '60%',
        height: '130%'
    },
});
