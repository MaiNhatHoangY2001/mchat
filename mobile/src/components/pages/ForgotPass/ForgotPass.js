import { Text, View, Image, ImageBackground, TouchableOpacity, TextInput, Alert, Dimensions } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './ForgotPass.module.scss';
import { Link } from 'react-router-native';

//npm i react-hook-form
import { useForm } from 'react-hook-form';

import { SafeAreaView } from 'react-native-safe-area-context';

//link all name animations: https://github.com/oblador/react-native-animatable
//link how to code animation: https://blog.bitsrc.io/top-5-animation-libraries-in-react-native-d00ec8ddfc8d
import * as Animatable from 'react-native-animatable';

//link all icons react-native: https://oblador.github.io/react-native-vector-icons/
// import Icon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome5';

//link doc: https://reactnavigation.org/docs/tab-based-navigation/
//npm i @react-navigation/native @react-navigation/bottom-tabs
//link clip: https://www.youtube.com/watch?v=_031dsQNy88
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//link firebase doc: https://firebase.google.com/docs/auth/web/phone-auth
// import auth from '../../../firebase-config-mobile';
// import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

//link doc: https://formik.org/docs/guides/react-native
//link clip: https://www.youtube.com/watch?v=fGz-I_eT0KM 
//npm i formik
import { Formik } from 'formik';

//link npm: https://www.npmjs.com/package/react-native-phone-number-input
//link clip: https://www.youtube.com/watch?v=gtEUVndgIzU
//link code country: https://github.com/xcarpentier/react-native-country-picker-modal/blob/master/src/types.ts#L252
//npm i react-native-phone-number-input
import PhoneInput from 'react-native-phone-number-input';

//new link firebase-expo-recaptcha: https://docs.expo.dev/versions/latest/sdk/firebase-recaptcha/
//link yt: https://www.youtube.com/watch?v=ePk0fjrNo6c
//npm i firebase@9.6.11
//npm i expo-firebase-recaptcha react-native-webview
import {FirebaseRecaptchaVerifierModal} from 'expo-firebase-recaptcha';
import { firebaseConfig } from '../../../firebase-config-mobile';
import firebase from 'firebase/compat/app';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

//create tab react-native
const Tab = createBottomTabNavigator();
function VerifiedScreen() {
    //OTP firebase
    const [number, setNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [verificationId, setVerificationId] = useState(null);
    const recaptchaVerifier = useRef(null);
    const phoneInput = useRef(PhoneInput);
    const [flag, setFlag] = useState(false);

    // const [activeTab, setActiveTab] = useState(1); //active tab
    // // const [disableTab1, setDisableTab1] = useState(false);
    // // const [disableTab2, setDisableTab2] = useState(true);
    // const [changeTabMess, setchangeTabMess] = useState('');
    // // const [flag, setFlag] = useState(false);

    const getOtp = () => {
        let phoneNumber = number.trim();
        // let regexPhoneNumberVN = /\+?(0|84)\d{9}/.test(phoneNumber);
        if (phoneNumber === '' || phoneNumber === undefined) Alert.alert('Thông báo', 'Vui lòng nhập số điện thoại!');
        else if (phoneNumber.length !== 10) Alert.alert('Thông báo', 'Vui lòng nhập đủ 10 ký tự số điện thoại!');
        else {
            console.log(number);
            try {
                const phoneProvider = new firebase.auth.PhoneAuthProvider();
                phoneProvider.verifyPhoneNumber(phoneNumber, recaptchaVerifier.current).then(setVerificationId);
                setNumber('');
                setFlag(true);
            } catch (err) {
                console.log(err.message);
                Alert.alert('Vui lòng nhập lại só điện thoại!');
            }
        }
    };

    const verifyOtp = () => {
        if (otp === '' || otp === undefined) Alert.alert('Thông báo', 'Vui lòng nhập mã xác thực!');
        else if (otp.length !== 6) Alert.alert('Thông báo', 'Vui lòng nhập 6 ký tự!');
        else {
            const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, otp);
            firebase
                .auth()
                .signInWithCredential(credential)
                .then(() => {
                    setOtp('');
                    Alert.alert('Xác thực thành công!');
                })
                .catch((error) => {
                    console.log(error);
                    alert('Xác thực không thành công!');
                });
            console.log(otp);

            // setActiveTab(2);
            // setHandleMoveTab(2);
            // setDisableTab1(true);
            // setDisableTab2(false);
            // setchangeTabMess("Đã xác thực, vui lòng chuyển đến tab 'Mật khẩu mới'");

            // //  CHANGE PASSWORD
            // const account = {
            //     phoneNumber: phoneTabNewPW.trim(),
            //     newPassword: passwordInputNewPW.trim(),
            // };
            // changePassword(account, dispatch, navigate);
        }
    };

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'space-around',
                alignItems: 'center',
                borderTopColor: 'red',
                borderStyle: 'solid',
                borderTopWidth: 1,
            }}
        >
            <Formik initialValues={{ email: '' }} onSubmit={(values) => console.log(values)}>
                <View style={{ width: '90%' }}>
                    <View style={{ display: flag ? 'flex' : 'none' }}>
                        <PhoneInput
                            ref={phoneInput}
                            defaultValue={number}
                            defaultCode="VN"
                            withShadow
                            onChangeFormattedText={(text) => setNumber(text)}
                            layout="first"
                            autoFocus
                            containerStyle={{
                                width: '100%',
                            }}
                        />
                        <TouchableOpacity
                            style={{
                                marginTop: 30,
                                backgroundColor: 'rgb(250, 139, 158)',
                                height: 40,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 20,
                            }}
                            onPress={getOtp}
                        >
                            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Gửi mã xác thực</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ display: !flag ? 'flex' : 'none' }}>
                        <TextInput
                            placeholder="Nhập mã xác thực"
                            onChangeText={setOtp}
                            keyboardType="number-pad"
                            autoComplete="tel"
                            style={{
                                height: 50,
                                padding: 15,
                                fontSize: 18,
                                shadowColor: 'rgba(0,0,0, .4)', // IOS
                                shadowOffset: { height: 1, width: 1 }, // IOS
                                shadowOpacity: 1, // IOS
                                shadowRadius: 1, //IOS
                                elevation: 2, // Android
                                backgroundColor: '#fff',
                            }}
                        />
                        <TouchableOpacity
                            style={{
                                marginTop: 30,
                                backgroundColor: 'rgb(250, 139, 158)',
                                height: 40,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 20,
                            }}
                            onPress={verifyOtp}
                        >
                            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Xác nhận mã</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <FirebaseRecaptchaVerifierModal ref={recaptchaVerifier} firebaseConfig={firebaseConfig} />
                    </View>
                </View>
            </Formik>
        </View>
    );
}
function RenewPWScreen() {
  return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderTopColor: 'red',
                borderStyle: 'solid',
                borderTopWidth: 1,
            }}
        >
            <Text>mk mới</Text>
        </View>
  );
}

//handle useForm
const InscriptionScreen = () => {
  const { register, handleSubmit, setValue } = useForm();
  const onSubmit = useCallback((formData) => {
      console.log(formData);
  }, []);
  const onChangeField = useCallback(
      (name) => (text) => {
          setValue(name, text);
      },
      [],
  );
  useEffect(() => {
      register('email');
      register('password');
  }, [register]);
}

function ForgotPass() {
    return (
        <SafeAreaView style={styles.container}>
            <Animatable.View
                animation="fadeInRight"
                // iterationCount={5}
                direction="alternate"
            >
                <ImageBackground source={require('../../../../assets/bgcolor-vertical.png')} style={styles.imgBG}>
                    <View
                        style={{
                            // backgroundColor: '#fff',
                            width: widthScreen - 100,
                            height: '80%',
                            // // padding: 20,
                            // paddingTop: 5,
                            // paddingLeft: 20,
                            // paddingRight: 20,
                            // display: 'flex',
                            alignItems: 'center',
                            // justifyContent: 'space-around',
                            // shadowColor: 'rgba(0,0,0, .4)', // IOS
                            // shadowOffset: { height: 1, width: 1 }, // IOS
                            // shadowOpacity: 2, // IOS
                            // shadowRadius: 2, //IOS
                            // elevation: 10, // Android
                            // borderTopLeftRadius: 20,
                            // borderTopRightRadius: 20,
                        }}
                    >
                        {/* <Link
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
                                justifyContent: 'center',
                                alignItems: 'center',
                                alignSelf: 'center',
                            }}
                            // onPress={() => {setFlag(false); setAnimationName('zoomIn');}}
                        >
                            <Text style={{ color: '#fff', fontSize: 17, fontWeight: 'bold' }}>
                                Trở về màn hình đăng nhập
                            </Text>
                        </Link> */}
                        <Link to="/">
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Icon name="caret-left" size={26} color="#fff" />
                                <Text
                                    style={{
                                        fontSize: 18,
                                        color: '#fff',
                                        fontWeight: 'bold',
                                        marginLeft: 5,
                                        textDecorationLine: 'underline',
                                    }}
                                >
                                    Trở về
                                </Text>
                            </View>
                        </Link>
                        <View style={{ marginBottom: 10 }}></View>
                        <NavigationContainer>
                            <Tab.Navigator
                                screenOptions={({ route }) => ({
                                    tabBarIcon: ({ focused, color, size }) => {
                                        let iconName;

                                        if (route.name === 'Xác thực SĐT') {
                                            iconName = 'sms';
                                            size = focused ? 24 : 18;
                                            color = focused ? '#fff' : '#555';
                                        } else if (route.name === 'Mật khẩu mới') {
                                            iconName = focused ? 'lock-open' : 'lock';
                                            size = focused ? 22 : 18;
                                            color = focused ? '#fff' : '#555';
                                        }

                                        // You can return any component that you like here!
                                        return <Icon name={iconName} size={size} color={color} />;
                                    },
                                    tabBarStyle: {
                                        // backgroundColor: '#0000ff',
                                        // marginBottom: -15,
                                        width: widthScreen - 100,
                                        height: 60,
                                    },
                                    tabBarItemStyle: {
                                        // backgroundColor: 'rgb(250, 139, 158)',
                                        // flexDirection: 'column',
                                        margin: 2,
                                        padding: 5,
                                    },
                                    tabBarActiveTintColor: '#fff',
                                    tabBarActiveBackgroundColor: 'rgb(250, 139, 158)',
                                    tabBarInactiveTintColor: '#555',
                                    tabBarInactiveBackgroundColor: '#fff',
                                    headerTitleAlign: 'center',
                                    headerTitleStyle: {
                                        color: 'rgb(250, 139, 158)',
                                    },
                                })}
                                // {...{screenOptions: ({ route })}}
                            >
                                <Tab.Screen name="Xác thực SĐT" component={VerifiedScreen} />
                                <Tab.Screen name="Mật khẩu mới" component={RenewPWScreen} />
                            </Tab.Navigator>
                        </NavigationContainer>
                    </View>
                </ImageBackground>
            </Animatable.View>
        </SafeAreaView>
    );
}

export default ForgotPass;
