import { Text, View, Image, ImageBackground, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import styles from './Login.module.scss';
import { Link } from 'react-router-native';

import { SafeAreaView } from 'react-native-safe-area-context';

//link all name animations: https://github.com/oblador/react-native-animatable
//link how to code animation: https://blog.bitsrc.io/top-5-animation-libraries-in-react-native-d00ec8ddfc8d
import * as Animatable from 'react-native-animatable';

//link all icons react-native: https://oblador.github.io/react-native-vector-icons/
import Icon from 'react-native-vector-icons/Ionicons';

function Login() {
    // const [flag, setFlag] = useState(false);
    // const [animationName, setAnimationName] = useState('');
    return (
        <SafeAreaView style={styles.container}>
            <Animatable.View animation="fadeInDown">
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
                        <View style={{ flexDirection: 'row' }}>
                            <TextInput
                                style={styles.styleInput}
                                placeholder="Số điện thoại"
                                maxLength={10}
                                keyboardType="numeric"
                                // onChangeText={(infoToDo) => setInfoToDo(infoToDo)}
                                // value={infoToDo}
                            />
                            <View style={{ justifyContent: 'center', marginLeft: 10 }}>
                                <Icon name="phone-portrait-outline" size={40} color="rgb(250, 139, 158)" />
                            </View>
                        </View>
                        <Text style={styles.errorMess}>Lỗi sdt</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <TextInput style={styles.styleInput} placeholder="Mật khẩu" />
                            <TouchableOpacity
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    alignSelf: 'center',
                                    borderColor: 'cyan',
                                    borderWidth: 1,
                                    borderStyle: 'solid',
                                    height: 40,
                                    paddingLeft: 5,
                                    paddingRight: 5,
                                    marginLeft: 10,
                                }}
                            >
                                <Icon name="eye-sharp" size={30} color="rgb(250, 139, 158)" />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.errorMess}>Lỗi mk</Text>
                        <Link to="/forgotPass" style={{ alignSelf: 'flex-end', marginRight: 22 }}>
                            <Text
                                style={{
                                    color: 'rgb(250, 139, 158)',
                                    fontWeight: 'bold',
                                    fontSize: 15,
                                    textDecorationLine: 'underline',
                                }}
                            >
                                Bạn quên mật khẩu?
                            </Text>
                        </Link>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
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
                                    width: 120,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                // onPress={() => {setFlag(false); setAnimationName('zoomIn');}}
                            >
                                <Text style={{ color: '#fff', fontSize: 17, fontWeight: 'bold' }}>Trở về</Text>
                            </Link>
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
                                    width: 120,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                // onPress={() => }
                            >
                                <Text style={{ color: '#fff', fontSize: 17, fontWeight: 'bold' }}>Đăng nhập</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text>Bạn chưa có tài khoản?</Text>
                            <Link to="/Register">
                                <Text
                                    style={{
                                        color: 'rgb(250, 139, 158)',
                                        fontWeight: 'bold',
                                        fontSize: 15,
                                        textDecorationLine: 'underline',
                                    }}
                                >
                                    Đăng ký ngay
                                </Text>
                            </Link>
                        </View>
                    </View>
                </ImageBackground>
            </Animatable.View>
        </SafeAreaView>
    );
}

export default Login;
