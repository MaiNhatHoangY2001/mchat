import { Text, View, Image, ImageBackground, TouchableOpacity, TextInput } from 'react-native';
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
import { createAxios } from '../../../redux/createInstance';
import { logoutSuccess } from '../../../redux/authSlice';
import { logOut } from '../../../redux/apiRequest/authApiRequest';

function Home() {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const userId = user?._id;
    const accessToken = user?.accessToken;

    const navigate = useNavigate();
    const dispatch = useDispatch();
    let axiosJWTLogout = createAxios(user, dispatch, logoutSuccess);

    const handleLogout = () => {
        logOut(dispatch, navigate, userId, accessToken, axiosJWTLogout);
    };

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user]);

    return (
        <SafeAreaView>
            <Animatable.View animation="bounceInRight">
                <ImageBackground source={require('../../../../assets/bgcolor-vertical.png')} style={styles.imgBG}>
                    <Text>HOME</Text>
                    <TouchableOpacity
                        style={{
                            shadowColor: 'rgba(0,0,0, .4)', // IOS
                            shadowOffset: { height: 1, width: 1 }, // IOS
                            shadowOpacity: 1, // IOS
                            shadowRadius: 1, //IOS
                            backgroundColor: '#fff',
                            elevation: 2, // Android
                            backgroundColor: 'rgb(250, 139, 158)',
                            borderRadius: 12,
                            padding: '3%',
                            marginRight: 20,
                            width: 120,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        onPress={() => handleLogout()}
                    >
                        <Text style={{ color: '#fff', fontSize: 17, fontWeight: 'bold' }}>Đăng xuất</Text>
                    </TouchableOpacity>
                </ImageBackground>
            </Animatable.View>
        </SafeAreaView>
    );
}

export default Home;
