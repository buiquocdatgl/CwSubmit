import React, { useContext, useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    FlatList,
    Pressable,
    Animated,
    TouchableOpacity
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { images, COLORS, SIZES, FONTS } from '../constants/index';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import hotels from '../consts/hotels';
import { AuthenticationContext } from "../../service/context";

const { width } = Dimensions.get('screen');
const cardWidth = width / 1.8;

const HomeScreen = ({ navigation }) => {

    const { logout } = useContext(AuthenticationContext);
    const optionsList = [
        { id: 1, title: 'House', img: require('../assets/images/home1.png') },
        { id: 2, title: 'Flat', img: require('../assets/images/home2.png') },
        { id: 3, title: 'Room', img: require('../assets/images/home3.png') },
        { id: 4, title: 'Lading', img: require('../assets/images/home4.png') },
    ];

    const categoryList = ['Popular', 'Recommended', 'Nearest'];
    const scrollX = React.useRef(new Animated.Value(0)).current;
    const [activeCardIndex, setActiveCardIndex] = React.useState(0);

    const ListCategories = () => {
        const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);
        return (
            <View style={styles.categoryListContainer}>
                {categoryList.map((category, index) => (
                    <Pressable
                        key={index}
                        onPress={() => setSelectedCategoryIndex(index)}
                    >
                        <Text
                            style={[
                                styles.categoryListText,
                                index == selectedCategoryIndex && styles.activeCategoryListText,
                            ]}>
                            {category}
                        </Text>
                    </Pressable>
                ))}
            </View>
        );
    };

    function renderListOptions() {
        const renderItem = ({ item }) => {
            return (
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    style={{ height: 220 }}
                >
                    <TouchableOpacity style={styles.optionsCard}>
                        {/* House image */}
                        <Image source={item.img} style={styles.optionsCardImage} />

                        {/* Option title */}
                        <Text style={{ marginTop: 10, fontSize: 18, fontWeight: 'bold' }}>
                            {item.title}
                        </Text>
                    </TouchableOpacity >
                </ScrollView>
            );
        }
        return (
            <View style={{ padding: SIZES.padding * 2 }}>
                <FlatList
                    data={optionsList}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderItem}
                // contentContainerStyle={{ paddingVertical: SIZES.padding * 2 }}
                />
            </View>
        )
    };

    const [value, setvalue] = useState([]);
    const fectData = async () => {
        let request = await fetch("http://192.168.1.71:3000/get");
        let response = await request.json();
        setvalue(response);
    }
    
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fectData();
        });
        return unsubscribe;
      }, [navigation]);

    const Card = ({ hotel, index }) => {
      
        const inputRange = [
            (index - 1) * cardWidth,
            index * cardWidth,
            (index + 1) * cardWidth,
        ];
        const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.7, 0, 0.7],
        });
        const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1, 0.8],
        });
        return (
            <TouchableOpacity
                disabled={activeCardIndex != index}
                activeOpacity={1}
                onPress={() => navigation.navigate("Details")}>
                <Animated.View style={{ ...styles.card, transform: [{ scale }] }}>
                    <Animated.View style={{ ...styles.cardOverLay, opacity }} />
                    <View style={styles.priceTag}>
                        <Text
                            style={{ color: COLORS.white, fontSize: 20, fontWeight: 'bold' }}>
                            {hotel.monthlyRentPrice}
                        </Text>
                    </View>
                    <Image
                        source={{
                            uri: hotel.image
                        }}
                        style={styles.cardImage}
                    />
                    <View style={styles.cardDetails}>
                        <View
                            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View>
                                <Text style={{ fontWeight: 'bold', fontSize: 17 }}>
                                    {hotel.name}
                                </Text>
                                <Text style={{ color: COLORS.grey, fontSize: 12 }}>
                                    {hotel.notes}
                                </Text>
                            </View>
                            <Icon name="bookmark-border" size={26} color={COLORS.search} />
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: 10,
                            }}>
                            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                <View style={styles.facility}>
                                    <Icon name="hotel" size={18} />
                                    <Text style={styles.facilityText}>2</Text>
                                </View>
                                <View style={styles.facility}>
                                    <Icon name="bathtub" size={18} />
                                    <Text style={styles.facilityText}>2</Text>
                                </View>
                                <View style={styles.facility}>
                                    <Icon name="aspect-ratio" size={18} />
                                    <Text style={styles.facilityText}>100m</Text>
                                </View>
                            </View>
                            {/* <Text style={{ fontSize: 10, color: COLORS.grey }}>365reviews</Text> */}
                        </View>
                    </View>
                </Animated.View>
            </TouchableOpacity>
        );
    };
    return (
        <View style={styles.container}>
            <View style={styles.head}>
                <Image
                    source={require('../assets/images/home.png')}
                    style={{
                        height: 80,
                        width: 80,
                        marginTop: 20,
                        marginLeft: -20
                    }}
                />
                <View style={styles.text}>
                    <View style={{ width: "50%" }}>
                        <Text style={{ fontSize: 28, fontWeight: 'bold', color: "#FFF" }}>Welcome to</Text>
                        <Text style={{
                            fontSize: 25,
                            color: "#FFF",
                            fontWeight: "bold"
                        }}>Bin Home</Text>
                    </View>
                    <View style={{ width: "50%", alignItems: "flex-end" }}>
                        <TouchableOpacity
                            onPress={logout}
                        >
                            <Image
                                source={require('../assets/images/ava.jpg')}
                                style={styles.profileImage}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Render list options */}
            <ScrollView>
                <View style={{
                    flexDirection: "row",
                    paddingHorizontal: 20,
                    width: "100%",
                    alignItems: "center",
                    marginTop: 20
                }}>
                    <View style={{ width: "50%" }}>
                        <Text style={{
                            fontWeight: "bold",
                            fontSize: 17,
                            color: "#585a61"
                        }}>Recommended</Text>
                    </View>
                    <View style={{ width: "50%", alignItems: "flex-end" }}>
                        <TouchableOpacity
                            style={{
                                backgroundColor: "#F291A3",
                                paddingHorizontal: 20,
                                paddingVertical: 5,
                                borderRadius: 15
                            }}
                            onPress={() => navigation.navigate("View")}
                        >
                            <Text style={{
                                fontWeight: "bold",
                                fontSize: 13,
                                color: "#FFF"
                            }}>View All</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {renderListOptions()}
                <ListCategories />
                <View>
                    <Animated.FlatList
                        onMomentumScrollEnd={(e) => {
                            setActiveCardIndex(
                                Math.round(e.nativeEvent.contentOffset.x / cardWidth),
                            );
                        }}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                            { useNativeDriver: true },
                        )}
                        horizontal
                        data={value}
                        contentContainerStyle={{
                            paddingVertical: SIZES.padding * 2,
                            paddingBottom: 30,
                            paddingLeft: 10,
                            paddingRight: cardWidth / 2 - 40,
                        }}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) => <Card hotel={item} index={index} key={item._id} />}
                        snapToInterval={cardWidth}
                    />
                </View>
            </ScrollView>
        </View >


    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    head: {
        backgroundColor: "#F291A3",
        height: "28%",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        paddingHorizontal: 20
    },
    text: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: -30,
        width: "100%"
    },
    // header: {
    //     marginTop: 25,
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    // },
    profileImage: {
        height: 50,
        width: 50,
        borderRadius: 25,
    },

    searchContainer: {
        height: 50,
        backgroundColor: COLORS.light,
        borderRadius: 10,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
        color: COLORS.dark,
    },
    sortBtn: {
        marginLeft: 10,
        height: 50,
        width: 50,
        borderRadius: 15,
        backgroundColor: COLORS.pink,
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionsCard: {
        height: 210,
        width: width / 2 - 30,
        elevation: 15,
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderRadius: 20,
        paddingTop: 10,
        paddingHorizontal: 10,
        marginRight: 10,
    },
    optionsCardImage: {
        height: 140,
        borderRadius: 10,
        width: '100%',
    },
    optionListsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        paddingHorizontal: 20,
    },
    categoryListText: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingBottom: 5,
        color: COLORS.grey,
    },
    activeCategoryListText: {
        color: COLORS.dark,
        borderBottomWidth: 1,
        paddingBottom: 5,
    },
    categoryListContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 0,
        paddingHorizontal: 40,
    },
    card: {
        height: 280,
        width: cardWidth,
        elevation: 15,
        marginRight: 20,
        borderRadius: 15,
        backgroundColor: COLORS.white,
        marginTop: 10,
    },
    cardImage: {
        height: 200,
        width: '100%',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
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
    cardDetails: {
        height: 100,
        borderRadius: 15,
        backgroundColor: COLORS.white,
        position: 'absolute',
        bottom: 0,
        padding: 20,
        width: '100%',
    },
    cardOverLay: {
        height: 280,
        backgroundColor: COLORS.white,
        position: 'absolute',
        zIndex: 100,
        width: cardWidth,
        borderRadius: 15,
    },
    facility: { flexDirection: 'row', marginRight: 15 },
    facilityText: { marginLeft: 5, color: COLORS.grey },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
});

export default HomeScreen;
