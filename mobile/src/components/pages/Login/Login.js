import { Text, View, Image, ImageBackground, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import styles from './Login.module.scss';
import { Link } from 'react-router-native';

import { SafeAreaView } from 'react-native-safe-area-context';

function Login() {
    const [flag, setFlag] = useState(false);
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ display: !flag ? 'flex' : 'none' }}>
                <ImageBackground source={require('../../../../assets/bgcolor-vertical.png')} style={styles.imgBG}>
                    <View>
                        <Image
                            source={require('../../../../assets/logo-no-bg.png')}
                            style={{ width: 180, height: 150, resizeMode: 'contain' }}
                        />
                        <Text style={styles.txtLine}>LINE</Text>
                    </View>
                    <View>
                        <Image
                            source={require('../../../../assets/Illustration.png')}
                            style={{ height: 270, resizeMode: 'contain' }}
                        />
                    </View>
                    <View>
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
                            }}
                            onPress={() => setFlag(true)}
                        >
                            <Text style={{ color: '#fff', fontSize: 17, fontWeight: 'bold' }}>
                                Đăng nhập bằng số điện thoại
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
            <View style={{ display: !flag ? 'none' : 'flex' }}>
                <ImageBackground source={require('../../../../assets/bgcolor-vertical.png')} style={styles.imgBG}>
                    <View
                        style={{
                            backgroundColor: '#fff',
                            width: 350,
                            height: 400,
                            padding: 20,
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextInput
                            style={styles.styleInput}
                            placeholder="Nhập số điện thoại"
                            maxLength={10}
                            keyboardType="numeric"

                            // onChangeText={(infoToDo) => setInfoToDo(infoToDo)}
                            // value={infoToDo}
                        />
                        <TextInput style={styles.styleInput} placeholder="Nhập mật khẩu" />
                        <View style={{flexDirection: 'row', marginTop: 20}}>
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
                                    marginRight: 20
                                }}
                                onPress={() => setFlag(false)}
                            >
                                <Text style={{ color: '#fff', fontSize: 17, fontWeight: 'bold' }}>Trở về</Text>
                            </TouchableOpacity>
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
                                }}
                                // onPress={() => }
                            >
                                <Text style={{ color: '#fff', fontSize: 17, fontWeight: 'bold' }}>Đăng nhập</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        </SafeAreaView>
    );
}

export default Login;
