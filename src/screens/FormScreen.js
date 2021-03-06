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
import IonicIcon from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DropDown from '../components/DropDown';
import PickImage from '../components/PickImage';
import { ActivityIndicator } from 'react-native-paper';
import CheckData from '../components/Confirm';
import { TextInputMask } from 'react-native-masked-text'

const { width, height } = Dimensions.get("window");

const FormScreen = ({ navigation }) => {
  const [data, setData] = useState({
    propertyType: '',
    bedRoom: '',
    addingDate: new Date(),
    monthlyRentPrice: '',
    furnitureType: '',
    notes: '',
    reporterName: '',
    image: '',
    name: ''
  });

  const [errors, setErrors] = useState({
    propertyType: '',
    bedRoom: '',
    monthlyRentPrice: '',
    notes: '',
    reporterName: '',
    name: '',
  });

  const [show, setShow] = useState(false);
  const [disable, setDisable] = useState(true);
  const [visible, setVisible] = useState(false);
  const [uploading, setUploading] = useState(false);

  const showDialog = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    if (data.bedRoom === ''
      || data.monthlyRentPrice === ''
      || data.propertyType === ''
      || data.reporterName === ''
      || data.image === ''
      || data.name === ''
      || errors.reporterName !== ''
      || errors.propertyType !== ''
      || errors.bedRoom !== ''
      || errors.notes !== ''
      || errors.monthlyRentPrice !== ''
      || errors.name !== ''
    ) {
      setDisable(true);
    }
    else {
      setDisable(false);
    }
  },
    [data.bedRoom, data.monthlyRentPrice,
    data.propertyType, data.reporterName, data.image, data.name,
    errors.name, errors.monthlyRentPrice, errors.bedRoom, errors.notes, errors.propertyType, errors.reporterName])

  useEffect(() => {
    console.log('data', data);
    console.log('errors', errors);
  }, [data, errors])

  const showMode = currentMode => {
    setShow(true);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || data.addingDate;
    setShow(Platform.OS === 'ios');
    setData({ ...data, addingDate: currentDate });
  };

  const dataProperty = [
    {
      label: "Please Select One",
      value: "",
    },
    {
      label: "Room",
      value: "Room",
    },
    {
      label: "Landing",
      value: "Landing",
    },
    {
      label: "Flat",
      value: "Flat",
    },
  ];


  const dataBed = [
    {
      label: "Please Select One",
      value: "",
    },
    {
      label: "Single Bed",
      value: "Single Bed",
    },
    {
      label: "Double Bed",
      value: "Double Bed",
    },
    {
      label: "Twin Bed",
      value: "Twin Bed",
    },
  ];



  const dataFur = [
    {
      label: "Please Select One",
      value: "",
    },
    {
      label: "Television",
      value: "Television",
    },
    {
      label: "Refrigerator",
      value: "Refrigerator",
    },
    {
      label: "Blanket",
      value: "Blanket",
    },
  ];

  const handleChange = (name, value) => {

    switch (name) {
      case 'propertyType':
        if (value.length === 0) {
          setErrors({ ...errors, [name]: 'Property Type is required' })
        }
        else {
          setErrors({ ...errors, [name]: '' })
          setData({ ...data, [name]: value });
        }

        break;
      case "bedRoom":
        if (value.length === 0) {
          setErrors({ ...errors, [name]: 'Bedroom is required' })
        }
        else {
          setErrors({ ...errors, [name]: '' })
          setData({ ...data, [name]: value });
        }
        break;
      case "monthlyRentPrice":
        if (value.length === 0) {
          setErrors({ ...errors, [name]: 'Monthly Rent Price is required' })
          setData({ ...data, [name]: null });
        }
        else {
          setErrors({ ...errors, [name]: '' })
          setData({ ...data, [name]: value });
        }
        break;
      case "notes":
        if (value.length > 20) {
          setErrors({ ...errors, [name]: 'Note not be 20 characters long!' })
        }
        else {
          setErrors({ ...errors, [name]: '' })
          setData({ ...data, [name]: value });
        }
        break;
      case "reporterName":
        if (value.length === 0) {
          setErrors({ ...errors, [name]: 'Reporter Name is required' })
          setData({ ...data, [name]: '' });
        }
        else {
          setErrors({ ...errors, [name]: '' })
          setData({ ...data, [name]: value });
        }
        break;
      case "name":
        if (value.length === 0) {
          setErrors({ ...errors, [name]: 'Name  is required' })
          setData({ ...data, [name]: '' });
        }
        else {
          setErrors({ ...errors, [name]: '' })
          setData({ ...data, [name]: value });

          // fetch ("http://192.168.1.55:3000/checkName", {
          //   method: 'POST',
          //   body: JSON.stringify({ name: value }),
          //   headers: {
          //     "Content-Type": "application/json",
          //   },
          // })
          // .then((res) => {
          //   console.log(value)
          //   if(res.data.length > 0){
          //     console.log(res.data);
          //     setErrors({ ...errors, [name]: 'Name  is duplicated!!' })
          //   }
          //   else{
          //     setErrors({ ...errors, [name]: '' })
          //   }
          // })
          // .catch((e) => console.log(e))
        }
        break;

      default:
        setData({ ...data, [name]: value });
        break;
    }
  }

  const handleSubmit = async () => {
    try {
      let request = await fetch("http://192.168.1.71:3000/create", {
        method: "POST",
        body: JSON.stringify({ ...data }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let response = await request.json();
      showDialog();
      if (response?.error) {
        return Alert.alert('Name is Duplicated. Back to Edit!!!');
      }
      setData({
        propertyType: '',
        bedRoom: '',
        addingDate: new Date(),
        monthlyRentPrice: '',
        furnitureType: '',
        notes: '',
        reporterName: '',
        image: '',
        name: '',
      });
      Alert.alert('Save Success', 'You have successfully filled in the information!');
      navigation.navigate("View");
      console.log(response);
    }
    catch (error) {
      console.log(error.message);
    }
  }

  let bag = `  Property Type ${data.propertyType} \n 
  Bedrooms: ${data.bedRoom} \n
  Date Add Rent: ${data.addingDate.toDateString()} \n
  Monthly Rent Price: ${data.monthlyRentPrice} \n
  Furniture Type: ${data.furnitureType} \n
  Note: ${data.notes} \n
  Reporter Name: ${data.reporterName} \n
  Name: ${data.name}
  `;


  return (
    <LinearGradient
      colors={['#F291A3', '#A67779']}
      style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>RentalZ</Text>
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
            <DropDown
              label="PropertyType"
              icon="home"
              data={dataProperty}
              value={data.propertyType}
              changeValue={handleChange}
              name="propertyType"
              errors={errors.propertyType}
              isRequired
            />
            {errors.propertyType.length > 0 && (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMess}>{errors.propertyType}</Text>
              </Animatable.View>
            )}

            {/* Bed Room */}
            <DropDown
              label="Bed Room"
              icon="boat"
              data={dataBed}
              value={data.bedRoom}
              changeValue={handleChange}
              name="bedRoom"
              isRequired
              errors={errors.bedRoom}
            />
            {errors.bedRoom.length > 0 && (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMess}>{errors.bedRoom}</Text>
              </Animatable.View>
            )}
            {/* Adding Time */}
            <View style={styles.titleContainer}>
              <View style={{ flexDirection: 'row', position: 'relative', alignItems: 'center' }}>
                <View style={styles.iconHome}>
                  <IonicIcon name="calendar" size={15} color="white" />
                </View>
                <Text style={styles.titleLabel}>Adding Time</Text>
              </View>
              <TouchableOpacity onPress={showMode}>
                <Text style={styles.formInput}>{data.addingDate.toDateString()}</Text>
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
            <View style={styles.titleContainer}>
              <View style={styles.labelHead}>
                <View >
                  <FontAwesome
                    name="money"
                    color="#333"
                    size={20}
                  />
                </View>
              </View>
              <TextInputMask
                type={'money'}
                options={{
                  precision: 2,
                  separator: ',',
                  delimiter: '.',
                  unit: '$',
                  suffixUnit: ''
                }}
                value={data.monthlyRentPrice}
                onChangeText={(value) => handleChange("monthlyRentPrice", value)}
                keyboardType="numeric"
              />
            </View>
            {errors.monthlyRentPrice.length > 0 && (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMess}>{errors.monthlyRentPrice}</Text>
              </Animatable.View>
            )}

            {/* FurnitureType */}
            <DropDown
              label="FurnitureType"
              icon="cog"
              data={dataFur}
              value={data.furnitureType}
              changeValue={handleChange}
              name="furnitureType"
            />

            {/* Note */}
            <View style={styles.labelHead}>
              <View >
                <FontAwesome
                  name="bookmark"
                  style={styles.iconUser}
                  size={20}
                />
              </View>
              <Text style={styles.text_footer}>Notes</Text>
            </View>
            <View style={styles.action}>
              <TextInput
                placeholder="Notes"
                style={styles.textInput}
                autoCapitalize="none"
                value={data.notes}
                multiline={true}
                numberOfLines={0}
                onChangeText={(value) => handleChange("notes", value)}
              />
              {
                (data.notes.length) > 0 && (data.notes.length) < 20 ?
                  <Animatable.View
                    animation="bounceIn"

                  >
                    <Feather
                      name="check-circle"
                      color="green"
                      size={20}
                    />
                  </Animatable.View> : null
              }
            </View>
            {errors.notes.length > 0 && (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMess}>{errors.notes}</Text>
              </Animatable.View>
            )}

            {/* ReporterName */}

            <View style={styles.labelHead}>
              <View >
                <FontAwesome
                  name="user-o"
                  style={styles.iconUser}
                  size={20}
                />
              </View>
              <Text style={styles.text_footer}>ReporterName</Text>
            </View>
            <View style={styles.action}>
              <TextInput
                placeholder="ReporterName"
                style={styles.textInput}
                autoCapitalize="none"
                value={data.reporterName}
                onChangeText={(value) => handleChange("reporterName", value)}
              />
              {
                data.reporterName.length > 0 ?
                  <Animatable.View
                    animation="bounceIn"

                  >
                    <Feather
                      name="check-circle"
                      color="green"
                      size={20}
                    />
                  </Animatable.View> : null
              }
            </View>
            {errors.reporterName.length > 0 && (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMess}>{errors.reporterName}</Text>
              </Animatable.View>
            )}

            {/* NameHouse */}

            <View style={styles.labelHead}>
              <View >
                <FontAwesome
                  name="book"
                  style={styles.iconUser}
                  size={20}
                />
              </View>
              <Text style={styles.text_footer}>NameHouse</Text>
            </View>
            <View style={styles.action}>
              <TextInput
                placeholder="NameHouse"
                style={styles.textInput}
                autoCapitalize="none"
                value={data.name}
                onChangeText={(value) => handleChange("name", value)}
              />
              {
                data.name.length > 0 ?
                  <Animatable.View
                    animation="bounceIn"

                  >
                    <Feather
                      name="check-circle"
                      color="green"
                      size={20}
                    />
                  </Animatable.View> : null
              }
            </View>
            {errors.name.length > 0 && (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMess}>{errors.name}</Text>
              </Animatable.View>
            )}

            <PickImage
              data={data}
              setData={setData}
              // setUploading={setUploading}
              // uploading={uploading}
              navigation={navigation}
            />

            <View style={[styles.titleContainer1, {
              alignItems: 'center',
              // flexDirection: 'row',
            }]}>
              <TouchableOpacity
                disabled={disable}
                style={disable ? styles.btnDisable : styles.signIn}
                onPress={showDialog}
              >
                <Text style={styles.textSign}>Submit</Text>
              </TouchableOpacity>
            </View>
            <CheckData
              bag={bag}
              visible={visible}
              handleSubmit={handleSubmit}
              setVisible={setVisible} />
          </ScrollView>
        </KeyboardAvoidingView>
      </Animatable.View >
    </LinearGradient >
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
    color: "#666",
    fontWeight: '700',
    fontSize: 18,
    marginLeft: 6
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 0.4,
    borderBottomColor: 'gray',
    alignItems: 'center',
    marginBottom: 10
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: '#05375a',
    maxHeight: 100
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
  titleContainer: {
    marginVertical: 10,
    width: 350,
    flex: 1,
    marginTop: 20
  },
  titleContainer1: {
    width: 350,
    flex: 1,
  },
  errorMess: {
    color: '#FF0000',
    fontSize: 14,
  },
  titleLabel: {
    color: "#666",
    fontWeight: '700',
    fontSize: 18,
    marginLeft: 6
  },
  formInput: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 0.4,
    borderBottomColor: 'gray',
  },
  icon: {
    backgroundColor: 'black',
    height: 25,
    width: 25,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "18%",
    left: 0,
  },
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
  labelHead: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signIn: {
    width: '40%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#009387',
    borderWidth: 1,
    marginTop: 15,
    backgroundColor: '#BF6B7B'
  },
  pick: {
    width: '40%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#009387',
    borderWidth: 1,
    marginTop: 15,
    backgroundColor: '#ADA2F2',
    marginLeft: 45
  },
  buttonView: {
    width: '40%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#009387',
    borderWidth: 1,
    marginTop: 15,
    backgroundColor: '#ADA2F2',
    marginLeft: 50
  },
  btnDisable: {
    width: '40%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#fff',
    borderWidth: 1,
    marginTop: 15,
    backgroundColor: '#b2b2b2'
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});


export default FormScreen;
