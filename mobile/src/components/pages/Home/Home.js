// import { Text, View, Image, ImageBackground, TouchableOpacity, TextInput, Dimensions } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import styles from './Home.module.scss';
// import { Link, useNavigate } from 'react-router-native';
// import { useDispatch, useSelector } from 'react-redux';

// import { SafeAreaView } from 'react-native-safe-area-context';

// //link all name animations: https://github.com/oblador/react-native-animatable
// //link how to code animation: https://blog.bitsrc.io/top-5-animation-libraries-in-react-native-d00ec8ddfc8d
// import * as Animatable from 'react-native-animatable';

// //link all icons react-native: https://oblador.github.io/react-native-vector-icons/
// import Icon from 'react-native-vector-icons/Ionicons';
// import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
// import IconAntDesign from 'react-native-vector-icons/AntDesign';

// import { createAxios } from '../../../redux/createInstance';
// import { loginSuccess, logoutSuccess } from '../../../redux/authSlice';
// import { logOut } from '../../../redux/apiRequest/authApiRequest';

// import { NavigationContainer } from '@react-navigation/native';
// // import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// //link doc top tabs: https://reactnavigation.org/docs/material-top-tab-navigator/
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// import { getListGroupChat, getListIndividualChat } from '../../../redux/apiRequest/chatApiRequest';
// import CallsScreen from './screens/Call/CallsScreen';
// import ProfileScreen from './screens/Profile/ProfileScreen';
// import MessageHome from './screens/Message/MessageHome';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// const widthScreen = Dimensions.get('window').width;
// const heightScreen = Dimensions.get('window').height;

// //create tab react-native
// // const Tab = createBottomTabNavigator();
// const Tab = createMaterialTopTabNavigator();
// const Stack = createNativeStackNavigator();

// function DemoHome() {
//     return (
//         <View>
//             <Text>Home</Text>
//         </View>
//     );
// }

// function Home() {
//     const user = useSelector((state) => state.auth.login?.currentUser);
//     const navigate = useNavigate();

//     const dispatch = useDispatch();

//     const currentUser = useSelector((state) => state.auth.login?.currentUser);
//     let axiosJWT = createAxios(currentUser, dispatch, loginSuccess);

//     const accessToken = currentUser?.accessToken;
//     const id = currentUser?._id;

//     useEffect(() => {
//         getListIndividualChat(accessToken, id, dispatch, axiosJWT);
//         getListGroupChat(accessToken, id, dispatch, axiosJWT);
//     }, []);

//     useEffect(() => {
//         if (!user) {
//             navigate('/login');
//         }
//     }, [user]);

//     return (
//         <SafeAreaView>
//             <Animatable.View animation="bounceInRight">
//                 <ImageBackground source={require('../../../../assets/bgcolor-vertical.png')} style={styles.imgBG}>
//                     <View style={{ width: widthScreen, height: '100%', alignItems: 'center' }}>
//                         <NavigationContainer>
//                             <Tab.Navigator
//                                 initialRouteName="Trò chuyện"
//                                 tabBarPosition="bottom"
//                                 screenOptions={({ route }) => ({
//                                     tabBarIcon: ({ focused, color, size }) => {
//                                         let iconNameAntDesign, iconNameIcon, iconNameFA;
//                                         if (route.name === 'homeMessage') {
//                                             iconNameAntDesign = 'message1';
//                                             size = focused ? 25 : 22;
//                                             color = focused ? 'rgb(250, 139, 158)' : '#fff';
//                                         } else if (route.name === 'call') {
//                                             iconNameIcon = 'md-call-sharp';
//                                             size = focused ? 25 : 22;
//                                             color = focused ? 'rgb(250, 139, 158)' : '#fff';
//                                         } else if (route.name === 'profile') {
//                                             iconNameFA = 'user-circle-o';
//                                             size = focused ? 25 : 22;
//                                             color = focused ? 'rgb(250, 139, 158)' : '#fff';
//                                         }
//                                         return (
//                                             <View
//                                                 style={{
//                                                     flexDirection: 'row',
//                                                     height: '110%',
//                                                     width: '130%',
//                                                     justifyContent: 'center',
//                                                     marginLeft: '-12%',
//                                                 }}
//                                             >
//                                                 <IconAntDesign name={iconNameAntDesign} size={size} color={color} />
//                                                 <Icon name={iconNameIcon} size={size} color={color} />
//                                                 <IconFontAwesome name={iconNameFA} size={size} color={color} />
//                                             </View>
//                                         );
//                                     },
//                                     tabBarStyle: {
//                                         width: widthScreen,
//                                         height: '8%',
//                                         backgroundColor: '#303030',
//                                     },
//                                     tabBarItemStyle: {
//                                         padding: '3%',
//                                     },
//                                     tabBarActiveTintColor: 'rgb(250, 139, 158)',
//                                     // tabBarActiveBackgroundColor: 'rgb(250, 139, 158)',
//                                     tabBarInactiveTintColor: '#fff',
//                                     // tabBarInactiveBackgroundColor: '#fff',
//                                     tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold' },
//                                     // headerShown: false,
//                                     // tabBarVisibilityAnimationConfig
//                                 })}
//                             >
//                                 <Tab.Screen
//                                     name="homeMessage"
//                                     options={{
//                                         title: 'Cuộc trò chuyện',
//                                     }}
//                                     component={MessageHome}
//                                 />
//                                 <Tab.Screen name="call" options={{ title: 'Cuộc gọi' }} component={CallsScreen} />
//                                 <Tab.Screen name="profile" options={{ title: 'Thông tin' }} component={ProfileScreen} />
//                             </Tab.Navigator>
//                         </NavigationContainer>
//                     </View>
//                 </ImageBackground>
//             </Animatable.View>
//         </SafeAreaView>
//     );
// }

// export default Home;

// IMPORT REACT NATIVE
import { Dimensions, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// IMPORT STACK NAVIGATION
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// IMPORT SCREEN
import TabScreen from './screens/TabScreen';
import MessageChat from './screens/Message/MessageChat';
import MessageSearch from './screens/Message/MessageSearch';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-native';
import { createAxios } from '../../../redux/createInstance';
import { loginSuccess } from '../../../redux/authSlice';
import { useEffect } from 'react';
import { getListGroupChat, getListIndividualChat } from '../../../redux/apiRequest/chatApiRequest';

// IMPORT ICON LINK ==> https://icons.expo.fyi/
import { Ionicons } from '@expo/vector-icons';

// KHAI BAO STACK NAVIGATION
const Stack = createNativeStackNavigator();

// GET SIZE MOBILE
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function Home() {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const currentUser = useSelector((state) => state.auth.login?.currentUser);
    let axiosJWT = createAxios(currentUser, dispatch, loginSuccess);

    const accessToken = currentUser?.accessToken;
    const id = currentUser?._id;

    useEffect(() => {
        getListIndividualChat(accessToken, id, dispatch, axiosJWT);
        getListGroupChat(accessToken, id, dispatch, axiosJWT);
    }, []);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen options={{ headerShown: false }} name="HomeChat" component={TabScreen} />
                    <Stack.Screen name="MessageChat" component={MessageChat} />
                    <Stack.Screen
                        style={{ flex: 1 }}
                        options={({ navigation, route }) => ({
                            headerTitle: () => (
                                <View style={styles.bgSearch}>
                                    <TextInput style={styles.inputSearch} placeholder="Tìm Kiếm" />
                                    <TouchableOpacity>
                                        <Ionicons name="search" size={20} color="black" />
                                    </TouchableOpacity>
                                </View>
                            ),
                        })}
                        name="MessageSearch"
                        component={MessageSearch}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    bgSearch: {
        flex: 0.9,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: -15,
        marginRight: 20,
        paddingVertical: 4,
        paddingHorizontal: 16,

        borderWidth: 1,
        borderRadius: 100,
    },
    inputSearch: {
        flex: 1,
    },
});
