import { Text, View, Image, ImageBackground, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './Home.module.scss';
import { Link, useNavigate } from 'react-router-native';
import { useDispatch, useSelector } from 'react-redux';

import { SafeAreaView } from 'react-native-safe-area-context';

//link all name animations: https://github.com/oblador/react-native-animatable
//link how to code animation: https://blog.bitsrc.io/top-5-animation-libraries-in-react-native-d00ec8ddfc8d
import * as Animatable from 'react-native-animatable';

//link all icons react-native: https://oblador.github.io/react-native-vector-icons/
import Icon from 'react-native-vector-icons/Ionicons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

import { createAxios } from '../../../redux/createInstance';
import { logoutSuccess } from '../../../redux/authSlice';
import { logOut } from '../../../redux/apiRequest/authApiRequest';

import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//link doc top tabs: https://reactnavigation.org/docs/material-top-tab-navigator/
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import MessagesScreen from './screens/MessagesScreen';
import CallsScreen from './screens/CallsScreen';
import ProfileScreen from './screens/ProfileScreen'

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

//create tab react-native
// const Tab = createBottomTabNavigator();
const Tab = createMaterialTopTabNavigator();

function Home() {
    return (
        <SafeAreaView>
            <Animatable.View animation="bounceInRight">
                <ImageBackground source={require('../../../../assets/bgcolor-vertical.png')} style={styles.imgBG}>
                    <View style={{ width: widthScreen, height: heightScreen, alignItems: 'center', }}>
                        <NavigationContainer>
                            <Tab.Navigator
                                initialRouteName="Trò chuyện"
                                tabBarPosition= 'bottom'
                                screenOptions={({ route }) => ({
                                    tabBarIcon: ({ focused, color, size }) => {
                                        let iconNameAntDesign, iconNameIcon, iconNameFA;
                                        if (route.name === 'Trò chuyện') {
                                            iconNameAntDesign = 'message1';
                                            size = focused ? 25 : 22;
                                            color = focused ? 'rgb(250, 139, 158)' : '#fff';
                                        } else if (route.name === 'Cuộc gọi') {
                                            iconNameIcon = 'md-call-sharp';
                                            size = focused ? 25 : 22;
                                            color = focused ? 'rgb(250, 139, 158)' : '#fff';
                                        } else if (route.name === 'Hồ sơ') {
                                            iconNameFA = 'user-circle-o';
                                            size = focused ? 25 : 22;
                                            color = focused ? 'rgb(250, 139, 158)' : '#fff';
                                        }
                                        return (
                                            <View style={{ flexDirection: 'row', height: '110%', width: '130%', justifyContent: 'center', marginLeft: '-12%' }}>
                                                <IconAntDesign name={iconNameAntDesign} size={size} color={color} />
                                                <Icon name={iconNameIcon} size={size} color={color} />
                                                <IconFontAwesome name={iconNameFA} size={size} color={color} />
                                            </View>
                                        );
                                    },
                                    tabBarStyle: {
                                        width: widthScreen,
                                        height: '8%',
                                        backgroundColor: '#303030',
                                    },
                                    // tabBarItemStyle: {
                                    //     margin: 2,
                                    //     padding: 5,
                                    // },
                                    tabBarActiveTintColor: 'rgb(250, 139, 158)',
                                    // tabBarActiveBackgroundColor: 'rgb(250, 139, 158)',
                                    tabBarInactiveTintColor: '#fff',
                                    // tabBarInactiveBackgroundColor: '#fff',
                                    tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold' },
                                    // headerShown: false,
                                    // tabBarVisibilityAnimationConfig
                                })}
                            >
                                <Tab.Screen name="Trò chuyện" component={MessagesScreen} />
                                <Tab.Screen name="Cuộc gọi" component={CallsScreen} />
                                <Tab.Screen name="Hồ sơ" component={ProfileScreen} />
                            </Tab.Navigator>
                        </NavigationContainer>
                    </View>
                </ImageBackground>
            </Animatable.View>
        </SafeAreaView>
    );
}

export default Home;
