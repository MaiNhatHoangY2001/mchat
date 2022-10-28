import { Text, View, Image, ImageBackground, TouchableOpacity, TextInput } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
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

//create tab react-native
const Tab = createBottomTabNavigator();
function VerifiedScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderTopColor: 'red', borderStyle: 'solid', borderTopWidth: 1 }}>
      <TouchableOpacity style={{backgroundColor: 'cyan'}}>
        <Text>Xác thực</Text>
      </TouchableOpacity>
    </View>
  );
}
function RenewPWScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
    //OTP firebase
    // const [activeTab, setActiveTab] = useState(1); //active tab
    // // const [disableTab1, setDisableTab1] = useState(false);
    // // const [disableTab2, setDisableTab2] = useState(true);
    // //
    // const [number, setNumber] = useState('');
    // const [otp, setOtp] = useState('');
    // const [errorMess, setErrorMess] = useState('');
    // const [errorMessOTP, setErrorMessOTP] = useState('');
    // const [changeTabMess, setchangeTabMess] = useState('');
    // // const [flag, setFlag] = useState(false);
    // const [confirmObj, setConfirmObj] = useState('');
    // const getOtp = async (e) => {
    //     e.preventDefault();

    //     let phoneNumber = '+' + number.trim();
    //     let regexPhoneNumberVN = /\+?(0|84)\d{9}/.test(phoneNumber);
    //     if (phoneNumber === '' || phoneNumber === undefined) return setErrorMess('Vui lòng nhập số điện thoại!');
    //     else if (!regexPhoneNumberVN) setErrorMess('SĐT không hợp lệ!');
    //     else {
    //         setErrorMess('');
    //         // console.log(number);
    //         try {
    //             const response = await setUpRecaptcha(phoneNumber);
    //             console.log(response);
    //             setConfirmObj(response);
    //             console.log(phoneNumber);
    //             // setFlag(true);
    //         } catch (err) {
    //             // setErrorMess(err.message);
    //             console.log(err.message);
    //         }
    //     }
    // };

    // const verifyOtp = async (e) => {
    //     e.preventDefault();

    //     if (otp === '' || otp === undefined) setErrorMessOTP('Vui lòng nhập mã xác thực!');
    //     else if (otp.length !== 6) setErrorMessOTP('Vui lòng nhập 6 ký tự!');
    //     else {
    //         setErrorMessOTP('');
    //         try {
    //             await confirmObj.confirm(otp);
    //             console.log(otp);

    //             // setActiveTab(2);
    //             // setHandleMoveTab(2);
    //             // setDisableTab1(true);
    //             // setDisableTab2(false);
    //             setchangeTabMess("Đã xác thực, vui lòng chuyển đến tab 'Mật khẩu mới'");

    //             // //  CHANGE PASSWORD
    //             // const account = {
    //             //     phoneNumber: phoneTabNewPW.trim(),
    //             //     newPassword: passwordInputNewPW.trim(),
    //             // };
    //             // changePassword(account, dispatch, navigate);
    //         } catch (err) {
    //             // setErrorMessOTP(err.message);
    //             console.log(err.message);
    //         }
    //     }
    // };

    // function setUpRecaptcha(phoneNumber) {
    //     //link sub language: https://firebase.google.com/docs/reference/android/com/google/firebase/ml/naturallanguage/translate/FirebaseTranslateLanguage
    //     // auth.setLanguageCode('vi');
    //     const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);
    //     recaptchaVerifier.render();
    //     recaptchaVerifier.verify();
    //     return signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
    // }

    return (
        <SafeAreaView style={styles.container}>
            <Animatable.View
                animation="bounceIn"
                // iterationCount={5}
                direction="alternate"
            >
                <ImageBackground source={require('../../../../assets/bgcolor-vertical.png')} style={styles.imgBG}>
                    <View
                        style={{
                            // backgroundColor: '#fff',
                            width: 350,
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
                        <Link to="/" style={{marginRight: '81%'}}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Icon name="caret-left" size={40} color="#fff" />
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
                                            size = focused ? 30 : 20;
                                            color = focused ? '#fff' : '#555';
                                        } else if (route.name === 'Mật khẩu mới') {
                                            iconName = focused ? 'lock-open' : 'lock';
                                            size = focused ? 30 : 20;
                                            color = focused ? '#fff' : '#555';
                                        }

                                        // You can return any component that you like here!
                                        return <Icon name={iconName} size={size} color={color} />;
                                    },
                                    tabBarStyle: {
                                        // backgroundColor: '#0000ff',
                                        // marginBottom: -15,
                                        width: 350,
                                        height: 60,
                                    },
                                    tabBarItemStyle: {
                                        // backgroundColor: 'rgb(250, 139, 158)',
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
