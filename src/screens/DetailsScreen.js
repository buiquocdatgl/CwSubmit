/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
  Dimensions,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import hotels from '../consts/hotels';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get("window");

const DetailsScreen = ({ navigation }) => {

  function renderGallery() {
    const renderItem = ({ item }) => {
      return (
        <Image
          source={item.image}
          resizeMode="stretch"
          style={styles.img}
        />
      )
    }

    return (
      <FlatList
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        data={hotels}
        keyExtractor={(item, index) => `${index}`}
        renderItem={renderItem}
      />
    )
  }

  return (
    <View style={styles.container}>
      {renderGallery()}
      <Animatable.View
        style={styles.footer}
        animation="fadeInUpBig"
      >
        <View style={{ flexDirection: 'column' }}>
          <View>
            <Text style={styles.text}>
              Modern Downtown House
            </Text>
          </View>
          <View style={styles.quality}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View>
                <Text style={{ color: 'grey', fontSize: 12 }}>High Speed Wifi</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, marginRight: 10 }}>
              <View style={styles.circles}></View>
              <View style={{ marginLeft: 6 }}>
                <Text style={{ color: 'grey', fontSize: 12 }}>Deskspace</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={styles.circles}></View>
              <View style={{ marginLeft: 6 }}>
                <Text style={{ color: 'grey', fontSize: 12 }}>Safe Location</Text>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.facility}>
                <Icon name="hotel" size={24} color="#BF6B7B" />
                <Text style={styles.facilityText}>2</Text>
              </View>
              <View style={styles.facility}>
                <Icon name="bathtub" size={24} color="#BF6B7B" />
                <Text style={styles.facilityText}>2</Text>
              </View>
              <View style={styles.facility}>
                <Icon name="aspect-ratio" size={24} color="#BF6B7B" />
                <Text style={styles.facilityText}>100m</Text>
              </View>
            </View>
            <View style={{ marginLeft: 20 }}>
              <Text style={styles.button} onPress={() => navigation.navigate('BookMark')}>Rent Now</Text>
            </View>
          </View>
          <View style={styles.divider}></View>
          <View>
            <Text style={styles.text2}>
              Description
            </Text>
            <Text style={styles.desc}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
            </Text>
          </View>
          <View>
            <Text style={styles.text2}>
              Gallery
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={require('../assets/images/home1.png')}
                resizeMode="cover"
                style={styles.gallery}
              />
              <Image
                source={require('../assets/images/home2.png')}
                resizeMode="cover"
                style={styles.gallery2}
              />
              <View style={styles.more}>
                <Text style={{ color: 'grey', fontWeight:'bold' }}>+6</Text>
              </View>
            </View>
          </View>
        </View>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    height: 280,
    width: width,
    flex: 1,
  },
  footer: {
    flex: 25,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 35,
    paddingVertical: 30,
    width: width,
    marginTop: -140

  },
  text: {
    fontWeight: 'bold',
    color: '#BF6B7B',
    fontSize: 26
  },
  text2: {
    fontWeight: 'bold',
    color: '#BF6B7B',
    fontSize: 20,
    marginBottom: 20
  },
  desc: {
    fontSize: 12,
    color: 'grey',
    marginBottom: 8
  },
  quality: {
    marginTop: 14,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center'
  },
  circles: {
    borderRadius: 50,
    width: 5,
    height: 5,
    backgroundColor: '#BF6B7B'
  },
  facility: { flexDirection: 'row', marginRight: 15, alignItems: 'center' },
  facilityText: { marginLeft: 5, color: 'grey', fontSize: 18 },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: '#BF6B7B',
    borderRadius: 15,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  divider: {
    height: 0,
    marginTop: 16,
    marginBottom: 8,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.4,
    width: width,
  },
  gallery: {
    width: 115,
    height: 115,
  },
  gallery2: {
    width: 115,
    height: 115,
    marginLeft: 15,
    marginRight: 15
  },
  more:{
    width:55,
    height:55,
    borderWidth: 1,
    borderColor: "transparent",
    backgroundColor: "#f1f2f6",
    position: "absolute",
    top: 0,
    right: 25,
    alignItems: 'center', 
    justifyContent:'center',
    flexDirection: 'column',
  }
});

export default DetailsScreen;
