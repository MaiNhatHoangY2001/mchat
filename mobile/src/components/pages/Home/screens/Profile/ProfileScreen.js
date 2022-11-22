import { Text, View, Image, ImageBackground, TouchableOpacity, TextInput, Dimensions, StyleSheet } from 'react-native';
import React, { useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-native';
import { useDispatch, useSelector } from 'react-redux';

import { SafeAreaView } from 'react-native-safe-area-context';

//link all name animations: https://github.com/oblador/react-native-animatable
//link how to code animation: https://blog.bitsrc.io/top-5-animation-libraries-in-react-native-d00ec8ddfc8d
import * as Animatable from 'react-native-animatable';

//link all icons react-native: https://oblador.github.io/react-native-vector-icons/
import IconIon from 'react-native-vector-icons/Ionicons';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconFeather from 'react-native-vector-icons/Feather';

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
            <Image source={require('../../../../../../assets/avatar.png')} style={styles.imgAva} resizeMode="contain" />
            <View>
                <View style={styles.viewInfoLine}>
                    <IconAntDesign name="user" size={30} color="black" />
                    <View style={{ width: '70%', backgroundColor: '#fff', marginLeft: '5%', marginRight: '5%' }}>
                        <Text style={styles.txtInfo}>Tuấn Đinh</Text>
                        <Text style={styles.txtSystem}>Tên của bạn</Text>
                    </View>
                    <TouchableOpacity>
                        <IconFeather name="edit-3" size={30} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={[styles.viewInfoLine, { borderTopColor: 'lightgray', borderTopWidth: 1 }]}>
                    <IconIon name="phone-portrait-outline" size={30} color="black" />
                    <View style={{ width: '70%', backgroundColor: '#fff', marginLeft: '5%', marginRight: '5%' }}>
                        <Text style={styles.txtInfo}>0944302210</Text>
                        <Text style={styles.txtSystem}>Số điện thoại của bạn</Text>
                    </View>
                    <TouchableOpacity>
                        <IconFeather name="edit-3" size={30} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity style={styles.btnLogout} onPress={() => handleLogout()}>
                <Text style={{ color: '#fff', fontSize: 17, fontWeight: 'bold' }}>Đăng xuất</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-around',
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
        width: 120,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgAva: {
        width: 150,
        height: 150,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 100,
    },
    viewInfoLine: {
        // backgroundColor: 'red',
        width: widthScreen,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    txtInfo: {
        fontSize: 20,
    },
    txtSystem: {
        fontSize: 15,
        color: 'lightgray'
    }
});
