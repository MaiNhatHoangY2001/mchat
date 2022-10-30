import { Text, View, Image, ImageBackground, TouchableOpacity, TextInput, Animated, Dimensions } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './Login.module.scss';
import { Link, useNavigate } from 'react-router-native';
import { loginUser } from '../../../redux/apiRequest/authApiRequest';
import { useDispatch, useSelector } from 'react-redux';

import { SafeAreaView } from 'react-native-safe-area-context';

//link all name animations: https://github.com/oblador/react-native-animatable
//link how to code animation: https://blog.bitsrc.io/top-5-animation-libraries-in-react-native-d00ec8ddfc8d
import * as Animatable from 'react-native-animatable';

//link all icons react-native: https://oblador.github.io/react-native-vector-icons/
import Icon from 'react-native-vector-icons/Ionicons';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

function Login() {
    //splash-screen
    const splashscreen = useRef(new Animated.Value(0)).current;
    const [isVisible, setisVisible] = useState(true);
    useEffect(() => {
        Animated.sequence([
            Animated.timing(splashscreen, {
                toValue: 1,
                duration: 0, //0s
                useNativeDriver: true,
            }),
            Animated.timing(splashscreen, {
                toValue: 0,
                duration: 7500, //7.5s
                useNativeDriver: true,
            }),
        ]).start();
    }, []);
    useEffect(() => {
        let myTimeout = setTimeout(() => {
            setisVisible(false);
        }, 2746); //0.2746s
        return () => clearTimeout(myTimeout);
    }, []);
    function showSplashScreen() {
        return (
            <Animated.View
                style={[
                    { flex: 1 },
                    {
                        opacity: splashscreen,
                    },
                ]}
            >
                <Animated.Image
                    style={[{ width: widthScreen, height: heightScreen }]}
                    source={require('../../../../assets/loading-mline-splashscreen.gif')}
                ></Animated.Image>
            </Animated.View>
        );
    }

    //show-hide-form
    const [flag, setFlag] = useState(false);
    // const [animationName, setAnimationName] = useState('');

    //show-hide-pw
    // const [passwordInput, setPasswordInput] = useState('');
    const [isSecureTextEntry, setIsSecureTextEntry] = useState(true);
    const togglePassword = () => {
        if (isSecureTextEntry) {
            setIsSecureTextEntry(false);
            return;
        }
        setIsSecureTextEntry(true);
    };

    //handle login
    const user = useSelector((state) => state.auth.login?.currentUser);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    // const [linkToHome, setLinkToHome] = useState('');

    const handleLogin = () => {
        const newUser = {
            phoneNumber: phoneNumber,
            password: password,
        };
        console.log(newUser);
        loginUser(newUser, dispatch, navigate, setIsLoading);
    };

    //check regex sdt
    const [errorMessSDT, setErrorMessSDT] = useState('');
    let isNum = /^\d+$/.test(phoneNumber.trim());
    let regexPhoneNumber = /\+?(0|84)\d{9}/.test(phoneNumber.trim());
    function checkPhoneNumber() {
        if (phoneNumber.trim() === '')
            setErrorMessSDT((errorMessSDT) => (errorMessSDT = 'Vui lòng nhập số điện thoại!'));
        else if (!isNum) setErrorMessSDT('Vui lòng nhập lại số điện thoại!');
        else if (phoneNumber.trim().length !== 10) setErrorMessSDT('Vui lòng nhập đủ 10 ký tự số!');
        else if (!regexPhoneNumber) setErrorMessSDT('SĐT không hợp lệ!');
        // setErrorMessSDT(errorMessSDT => errorMessSDT = '✅');
        else setErrorMessSDT('');
    }

    //check input pw
    const [errorMessPW, setErrorMessPW] = useState('');
    function checkPW() {
        if (password.trim() === '') setErrorMessPW('Vui lòng nhập mật khẩu!');
        else if (password.trim().length < 6) setErrorMessPW('Mật khẩu phải tối thiểu 6 ký tự!');
        else {
            setErrorMessPW('');
            handleLogin();
        }
    }

    //check data inputs
    function checkDataInputs() {
        checkPhoneNumber();
        checkPW();
    }

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {isVisible ? (
                showSplashScreen()
            ) : (
                <Animatable.View
                    animation="zoomIn"
                    // iterationCount={5}
                    direction="alternate"
                >
                    <View style={{ display: !flag ? 'flex' : 'none' }}>
                        <ImageBackground
                            source={require('../../../../assets/bgcolor-vertical.png')}
                            style={styles.imgBG}
                        >
                            {/* <View style={styles.whiteBG}> */}
                            <View>
                                <Image
                                    source={require('../../../../assets/logo-no-bg.png')}
                                    style={{ width: 180, height: 150, resizeMode: 'contain' }}
                                />
                                <Text style={styles.txtLine}>LINE</Text>
                            </View>
                            <View>
                                <Image
                                    // source={require('../../../../assets/Illustration.png')}
                                    source={require('../../../../assets/animate-app-chat-6.gif')}
                                    style={{ height: 270, resizeMode: 'contain' }}
                                    // style={{ height: 350, resizeMode: 'contain' }}
                                />
                            </View>
                            <View>
                                <TouchableOpacity
                                    style={{
                                        shadowColor: 'rgba(0,0,0, .4)', // IOS
                                        shadowOffset: { height: 1, width: 1 }, // IOS
                                        shadowOpacity: 2, // IOS
                                        shadowRadius: 1, //IOS
                                        backgroundColor: '#fff',
                                        elevation: 4, // Android
                                        backgroundColor: '#fff',
                                        borderRadius: 12,
                                        borderColor: 'rgb(250, 139, 158)',
                                        borderWidth: 2,
                                        borderStyle: 'solid',
                                        padding: '3%',
                                    }}
                                    onPress={() => setFlag(true)}
                                >
                                    <Text style={{ color: 'rgb(250, 139, 158)', fontSize: 17, fontWeight: 'bold' }}>
                                        Đăng nhập bằng số điện thoại
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            {/* </View> */}
                        </ImageBackground>
                    </View>
                    <View style={{ display: !flag ? 'none' : 'flex' }}>
                        <ImageBackground
                            source={require('../../../../assets/bgcolor-vertical.png')}
                            style={styles.imgBG}
                        >
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
                                        numberOfLines={1}
                                        onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
                                        // value={phoneNumber}
                                    />
                                    <View style={{ justifyContent: 'center', marginLeft: 10 }}>
                                        <Icon name="phone-portrait-outline" size={40} color="rgb(250, 139, 158)" />
                                    </View>
                                </View>
                                <Text style={styles.errorMess}>{errorMessSDT}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <TextInput
                                        style={styles.styleInput}
                                        placeholder="Mật khẩu"
                                        numberOfLines={1}
                                        secureTextEntry={isSecureTextEntry}
                                        onChangeText={(password) => setPassword(password)}
                                        // value={passwordInput}
                                        // name="password"
                                    />
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
                                        onPress={togglePassword}
                                    >
                                        {isSecureTextEntry ? (
                                            <Icon name="eye-sharp" size={30} color="rgb(250, 139, 158)" />
                                        ) : (
                                            <Icon name="eye-off-sharp" size={30} color="rgb(250, 139, 158)" />
                                        )}
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.errorMess}>{errorMessPW}</Text>
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
                                        onPress={() => setFlag(false)}
                                    >
                                        <Text style={{ color: '#fff', fontSize: 17, fontWeight: 'bold' }}>Trở về</Text>
                                    </TouchableOpacity>
                                    {isLoading ? (
                                        <Text style={styles.currentLoginMobile}>Đang đăng nhập...</Text>
                                    ) : (
                                        <Link
                                            // to={linkToHome}
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
                                            onPress={() => checkDataInputs()}
                                        >
                                            <Text style={{ color: '#fff', fontSize: 17, fontWeight: 'bold' }}>
                                                Đăng nhập
                                            </Text>
                                        </Link>
                                    )}
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
                    </View>
                </Animatable.View>
            )}
        </SafeAreaView>
    );
}

export default Login;
