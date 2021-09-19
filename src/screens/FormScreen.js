/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Dimensions,
  Alert,
  TextInput,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import * as Animatable from 'react-native-animatable';
import DateTimePicker from '@react-native-community/datetimepicker';
import Dialog from 'react-native-dialog';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const { width, height } = Dimensions.get("window");

const FormScreen = () => {
  const [data, setData] = useState({
    propertyType: '',
    bedRoom: '',
    addingDate: new Date(),
    monthlyRentPrice: '',
    furnitureType: '',
    notes: '',
    reporterName: '',
  });

  const [show, setShow] = useState(false);


  const showMode = currentMode => {
    setShow(true);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || data.addingDate;
    setShow(Platform.OS === 'ios');
    setData({ ...data, addingDate: currentDate });
  };


  return (
    <LinearGradient
      colors={['#F291A3', '#A67779']}
      style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Rent Now!</Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={styles.footer}
      >
        <KeyboardAvoidingView
          style={styles.footer}
          behavior="padding"
          enabled
          keyboardVerticalOffset={40}>
          <ScrollView>

            {/* PropertyType */}
            <Text style={styles.text_footer}>PropertyType</Text>
            <View style={styles.action}>
              <TextInput
                placeholder="PropertyType"
                style={styles.textInput}
                autoCapitalize="none"
              />
            </View>

            {/* Bed Room */}
            <Text style={[styles.text_footer, {
              marginTop: 20
            }]}>Bed Room</Text>
            <View style={styles.action}>
              <TextInput
                placeholder="Bed Room"
                style={styles.textInput}
                autoCapitalize="none"
              />
            </View>

            {/* Adding Time */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Adding Time</Text>
              <TouchableOpacity onPress={showMode}>
                <Text style={styles.formInput}>{data.addingDate.toString()}</Text>
              </TouchableOpacity>
            </View>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={data.addingDate}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={onChange}
                maximumDate={Date.now()}
              />
            )}

            {/* MonthlyRentPrice */}
            <Text style={[styles.text_footer, {
              marginTop: 20
            }]}>MonthlyRentPrice</Text>
            <View style={styles.action}>
              <TextInput
                placeholder="MonthlyRentPrice"
                style={styles.textInput}
                autoCapitalize="none"
              />
            </View>

            {/* FurnitureType */}
            <Text style={[styles.text_footer, {
              marginTop: 20
            }]}>FurnitureType</Text>
            <View style={styles.action}>
              <TextInput
                placeholder="FurnitureType"
                style={styles.textInput}
                autoCapitalize="none"
              />
            </View>

            {/* Note */}
            <Text style={[styles.text_footer, {
              marginTop: 20
            }]}>Note</Text>
            <View style={styles.action}>
              <TextInput
                placeholder="Note"
                style={styles.textInput}
                autoCapitalize="none"
              />
            </View>

            {/* ReporterName */}
            <Text style={[styles.text_footer, {
              marginTop: 20
            }]}>ReporterName</Text>
            <View style={styles.action}>
              <TextInput
                placeholder="ReporterName"
                style={styles.textInput}
                autoCapitalize="none"
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Animatable.View>
    </LinearGradient>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
    fontSize: 30
  },
  title: {
    fontSize: 40,
    fontWeight: '600',
    color: 'white',
    marginTop: 40,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 35,
    textAlign: 'center',
  },
  text_footer: {
    color: 'black',
    fontSize: 18
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 0.4,
    borderBottomColor: 'gray',
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 0,
    color: '#05375a',
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
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20
  },
  color_textPrivate: {
    color: 'grey'
  },
  inputContainer: {
    marginVertical: 10,
    width: 350,
    flex: 1,
    marginTop: 20
  },
  inputLabel: {
    color: 'black',
    fontSize: 18
  },
  formInput: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 0.4,
    borderBottomColor: 'gray',
  },
});


export default FormScreen;
