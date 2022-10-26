import { Text, View, Image, ImageBackground, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import styles from './ForgotPass.module.scss';
import { Link } from 'react-router-native';

import { SafeAreaView } from 'react-native-safe-area-context';

//link all name animations: https://github.com/oblador/react-native-animatable
//link how to code animation: https://blog.bitsrc.io/top-5-animation-libraries-in-react-native-d00ec8ddfc8d
import * as Animatable from 'react-native-animatable';

//link all icons react-native: https://oblador.github.io/react-native-vector-icons/
import Icon from 'react-native-vector-icons/Ionicons';

function ForgotPass() {
    return (
        <SafeAreaView>
            <Animatable.View
                animation="fadeInUp"
                // iterationCount={5}
                direction="alternate"
            >
                <ImageBackground source={require('../../../../assets/bgcolor-vertical.png')} style={styles.imgBG}>
                    <View
                        style={{
                            backgroundColor: '#fff',
                            width: 350,
                            height: 450,
                            padding: 20,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-around',
                            shadowColor: 'rgba(0,0,0, .4)', // IOS
                            shadowOffset: { height: 1, width: 1 }, // IOS
                            shadowOpacity: 2, // IOS
                            shadowRadius: 2, //IOS
                            elevation: 10, // Android
                            borderRadius: 20,
                        }}
                    >
                        <Text>forgot pw</Text>
                        <Link
                            to="/"
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
                                justifyContent: 'center',
                                alignItems: 'center',
                                alignSelf: 'center'
                            }}
                            // onPress={() => {setFlag(false); setAnimationName('zoomIn');}}
                        >
                            <Text style={{ color: '#fff', fontSize: 17, fontWeight: 'bold' }}>Trở về màn hình đăng nhập</Text>
                        </Link>
                    </View>
                </ImageBackground>
            </Animatable.View>
        </SafeAreaView>
    );
}

export default ForgotPass;
