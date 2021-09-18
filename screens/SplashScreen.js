import React, { useRef, useEffect } from 'react';
import {
  SafeAreaView,
  Image,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import LottieView from 'lottie-react-native';

const SplashScreen = ({ navigation }) => {
  const moveAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // useEffect(() => {
  //   Animated.sequence([
  //     Animated.timing(moveAnim, {
  //       duration: 2000,
  //       toValue: Dimensions.get('window').width / 1.6,
  //       delay: 0,
  //       useNativeDriver: false,
  //     }),
  //     Animated.timing(moveAnim, {
  //       duration: 2000,
  //       toValue: 0,
  //       delay: 0,
  //       useNativeDriver: false,
  //     }),
  //   ]).start();
  //   Animated.timing(fadeAnim, {
  //     duration: 2000,
  //     toValue: 1,
  //     delay: 2000,
  //     useNativeDriver: false,
  //   }).start();

  //   setTimeout(() =>{
  //       navigation.replace('HomeStack');
  //   }, 5000)
  // }, [moveAnim, fadeAnim]);



  return (
    // <SafeAreaView style={styles.container}>
    //   <View style={styles.contentContainer}>
    //     <Animated.Image
    //       style={[styles.image, {opacity: fadeAnim}]}
    //       source={require('../assets/images/logo.png')}
    //     />
    //     <Animated.View style={[styles.logoContainer, {marginLeft: moveAnim}]}>
    //       <Text style={[styles.logoText]}>R</Text>
    //       <Animated.Text style={[styles.logoText, {opacity: fadeAnim}]}>
    //         entalZ
    //       </Animated.Text>
    //     </Animated.View>
    //   </View>
    // </SafeAreaView>
    <View
      style={{
        flex: 1,
        backgroundColor: '#BF6B7B',

      }}
    >
      <LottieView
        source={require('../assets/images/splash.json')}
        autoPlay
        loop={false}
        speed={0.5}
        onAnimationFinish={() => {
          console.log('Animation Finished!')
          navigation.replace('SignInStack');
        }}
      />
    </View>
  );
};

export default SplashScreen;

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#BF6B7B',
  },
  logoText: {
    fontSize: 35,
    marginTop: 20,
    color: 'white',
    fontWeight: '700',
  },
  contentContainer: {
    top: '40%',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
  },
  logoContainer: {
    flexDirection: 'row',
  },
});