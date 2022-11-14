import { Text, View, Image, ImageBackground, TouchableOpacity, TextInput, Dimensions, StyleSheet } from 'react-native';
import React, { useEffect, useContext } from 'react';
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

import { createAxios } from '../../../../../redux/createInstance';
import { logoutSuccess } from '../../../../../redux/authSlice';
import { logOut } from '../../../../../redux/apiRequest/authApiRequest';

import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//link doc top tabs: https://reactnavigation.org/docs/material-top-tab-navigator/
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { UserContext } from '../../../../../context/UserContext';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

export default function ProfileScreen() {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const userId = user?._id;
    const accessToken = user?.accessToken;

    const userContext = useContext(UserContext);
    const removeUserActive2Socket = userContext.removeUserActive2Socket;

    const navigate = useNavigate();
    const dispatch = useDispatch();
    let axiosJWTLogout = createAxios(user, dispatch, logoutSuccess);

    const handleLogout = () => {
        logOut(dispatch, navigate, userId, accessToken, axiosJWTLogout);
        removeUserActive2Socket(user?.phoneNumber);
    };

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user]);

    return (
        <SafeAreaView style={styles.container}>
            <Text>profile screen</Text>
            <TouchableOpacity style={styles.btnLogout} onPress={() => handleLogout()}>
                <Text style={{ color: '#fff', fontSize: 17, fontWeight: 'bold' }}>Đăng xuất</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgray',
    },
    btnLogout: {
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        elevation: 2, // Android
        backgroundColor: 'rgb(250, 139, 158)',
        borderRadius: 12,
        padding: '3%',
        marginRight: 20,
        width: 120,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
