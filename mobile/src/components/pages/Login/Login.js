import { Text, View, Image, ImageBackground, TouchableOpacity, TextInput, Animated, Dimensions } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './Login.module.scss';
import { Link } from 'react-router-native';

import { SafeAreaView } from 'react-native-safe-area-context';

//link all name animations: https://github.com/oblador/react-native-animatable
//link how to code animation: https://blog.bitsrc.io/top-5-animation-libraries-in-react-native-d00ec8ddfc8d
import * as Animatable from 'react-native-animatable';

//link all icons react-native: https://oblador.github.io/react-native-vector-icons/
import Icon from 'react-native-vector-icons/Ionicons';

//link doc: https://docs.expo.dev/guides/splash-screens/
//npm i expo-splash-screen
import * as SplashScreen from "expo-splash-screen";

// SplashScreen.preventAutoHideAsync(); //splash screen khi khởi động toàn bộ app - chỉnh splash trong app.json
// setTimeout(SplashScreen.hideAsync, 2000); //để ngoài export default function time khởi động lâu hơn 1s để trong

//npm i expo-asset expo-app-loading //no use
// import { Asset } from 'expo-asset'; //no use
// import AppLoading from 'expo-app-loading'; //no use

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

function Login() {
    // const [isReady, setIsReady] = useState(false);

    // async function cacheResourcesAsync() {
    //     try {
    //         const images = [require('../../../../assets/final_635a074b25a41f0080ec9b0a_580330.gif')];

    //         const cacheImages = images.map((image) => {
    //             return Asset.fromModule(image).downloadAsync();
    //         });

    //         return Promise.all(cacheImages);
    //     } catch (e) {
    //         console.warn(e);
    //     } finally {
    //         setIsReady(true);
    //     }
    // }
    // useEffect(() => {
    //     cacheResourcesAsync();
    // }, []);
    // const onLayoutRootView = useCallback(async () => {
    //     if (isReady) {
    //         await SplashScreen.hideAsync();
    //     }
    // }, [isReady]);

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

    // if (!isReady) {
    //     return <AppLoading startAsync={cacheResourcesAsync} onFinish={() => setIsReady(true)} onError={console.warn} />;
    // }
    // else {
        return (
            <SafeAreaView style={styles.container}>
                {isVisible == true ? (
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
                                            // onChangeText={(infoToDo) => setInfoToDo(infoToDo)}
                                            // value={infoToDo}
                                        />
                                        <View style={{ justifyContent: 'center', marginLeft: 10 }}>
                                            <Icon name="phone-portrait-outline" size={40} color="rgb(250, 139, 158)" />
                                        </View>
                                    </View>
                                    <Text style={styles.errorMess}>Lỗi sdt</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <TextInput
                                            style={styles.styleInput}
                                            placeholder="Mật khẩu"
                                            numberOfLines={1}
                                            secureTextEntry={isSecureTextEntry}
                                            // onChangeText={(passwordInput) => setPasswordInput(passwordInput)}
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
                                            <Text style={{ color: '#fff', fontSize: 17, fontWeight: 'bold' }}>
                                                Trở về
                                            </Text>
                                        </TouchableOpacity>
                                        <Link
                                            to="/home"
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
                                            <Text style={{ color: '#fff', fontSize: 17, fontWeight: 'bold' }}>
                                                Đăng nhập
                                            </Text>
                                        </Link>
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
    // }
}

export default Login;
