import { Text, View, Image, ImageBackground, TouchableOpacity, TextInput, Dimensions, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
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

import { createAxios } from '../../../../redux/createInstance';
import { logoutSuccess } from '../../../../redux/authSlice';
import { logOut } from '../../../../redux/apiRequest/authApiRequest';

import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//link doc top tabs: https://reactnavigation.org/docs/material-top-tab-navigator/
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

export default function MessagesScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <Text>messages screen</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgray',
    },
});