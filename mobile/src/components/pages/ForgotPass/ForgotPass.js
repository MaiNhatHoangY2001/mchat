import { Text, View, Image, ImageBackground, TouchableOpacity, TextInput, Alert, Dimensions, ScrollView } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './ForgotPass.module.scss';
import { Link, useNavigate } from 'react-router-native';
import { changePassword } from '../../../redux/apiRequest/userApiRequest';
import { useDispatch } from 'react-redux';

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
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [flagTabNewPW, setFlagTabNewPW] = useState(false);
    const [getPhoneNumber, setGetPhoneNumber] = useState('');

    //create tab react-native
    function VerifiedScreen() {
        //OTP firebase
        const [number, setNumber] = useState('');
        const [otp, setOtp] = useState('');
        const [verificationId, setVerificationId] = useState(null);
        const recaptchaVerifier = useRef(null);
        const phoneInput = useRef(PhoneInput);
        const [flag, setFlag] = useState(false);
        
        let phoneNumber = number.trim();
        let regexPhoneNumberVN = /\+?(0|84)\d{9}/.test(phoneNumber);
        const getOtp = () => {
            if (phoneNumber === '' || phoneNumber === undefined)
                Alert.alert('Th??ng b??o', 'Vui l??ng nh???p s??? ??i???n tho???i!');
            else if (phoneNumber.length !== 12) Alert.alert('Th??ng b??o', 'Vui l??ng nh???p ????? 9 k?? t??? sau c???a s??? ??i???n tho???i!');
            else if (!regexPhoneNumberVN) Alert.alert('Th??ng b??o', 'S??T kh??ng h???p l???!');
            else {
                try {
                    const phoneProvider = new firebase.auth.PhoneAuthProvider();
                    phoneProvider.verifyPhoneNumber(phoneNumber, recaptchaVerifier.current).then(setVerificationId);
                    console.log(number);
                    setNumber(phoneNumber);
                    setFlag(true);
                } catch (err) {
                    console.log(err.message);
                    Alert.alert('Th??ng b??o', 'Vui l??ng nh???p l???i s?? ??i???n tho???i!');
                }
            }
        };

        const verifyOtp = () => {
            if (otp === '' || otp === undefined) Alert.alert('Th??ng b??o', 'Vui l??ng nh???p m?? x??c th???c!');
            else if (otp.length !== 6) Alert.alert('Th??ng b??o', 'Vui l??ng nh???p 6 k?? t???!');
            else {
                const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, otp);
                firebase
                    .auth()
                    .signInWithCredential(credential)
                    .then(() => {
                        setOtp('');
                        setFlagTabNewPW(true);
                        setGetPhoneNumber(phoneNumber);
                        Alert.alert('Th??ng b??o', "X??c th???c th??nh c??ng. Vui l??ng chuy???n tab 'M???t kh???u m???i'");
                    })
                    .catch((error) => {
                        console.log(error);
                        Alert.alert('Th??ng b??o', 'X??c th???c kh??ng th??nh c??ng!');
                    });
                console.log(otp);
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
                {/* <Formik initialValues={{ email: '' }} onSubmit={(values) => console.log(values)}> */}
                    <View style={{ width: '90%' }}>
                        <View style={{ display: !flag ? 'flex' : 'none' }}>
                            <PhoneInput
                                ref={phoneInput}
                                defaultValue={number}
                                defaultCode="VN"
                                placeholder='S??? ??i???n tho???i'
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
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>G???i m?? x??c th???c</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ display: flag ? 'flex' : 'none' }}>
                            <TextInput
                                placeholder="Nh???p m?? x??c th???c"
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
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>X??c nh???n m??</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <FirebaseRecaptchaVerifierModal ref={recaptchaVerifier} firebaseConfig={firebaseConfig} />
                        </View>
                    </View>
                {/* </Formik> */}
            </View>
        );
    }
    function RenewPWScreen() {
        // const [linkToHome, setLinkToHome] = useState('');

        //show-hide-pw
        const [isSecureNewPW, setIsSecureNewPW] = useState(true);
        const toggleNewPW = () => {
            if (isSecureNewPW) {
                setIsSecureNewPW(false);
                return;
            }
            setIsSecureNewPW(true);
        };
        const [isSecureConfirmNewPW, setIsSecureConfirmNewPW] = useState(true);
        const toggleConfirmNewPW = () => {
            if (isSecureConfirmNewPW) {
                setIsSecureConfirmNewPW(false);
                return;
            }
            setIsSecureConfirmNewPW(true);
        };

        // const [phoneTabNewPW, setPhoneTabNewPW] = useState('');
        const [passwordInputNewPW, setPasswordInputNewPW] = useState('');
        const [passwordInputConfirmNewPW, setPasswordInputConfirmNewPW] = useState('');
        // let regexPhoneNumberVN = /\+?(0|84)\d{9}/.test(phoneTabNewPW.trim());
        // function checkPhoneNumber() {
        //     if (phoneTabNewPW.trim().length !== 10)
        //         Alert.alert('Th??ng b??o', 'Vui l??ng nh???p ????? 10 k?? t??? s??? ??i???n tho???i!');
        //     else if (!regexPhoneNumberVN) Alert.alert('Th??ng b??o', 'S??T kh??ng h???p l???!');
        // }
        function checkNewPW() {
            if (passwordInputNewPW.trim().length < 6) Alert.alert('Th??ng b??o', 'Vui l??ng nh???p t???i thi???u 6 k?? t??? m???t kh???u!');
        }
        function checkConfirmNewPW() {
            if (passwordInputConfirmNewPW.trim().length < 6)
                Alert.alert('Th??ng b??o', 'Vui l??ng nh???p t???i thi???u 6 k?? t??? m???t kh???u!');
            else if (!passwordInputNewPW.trim().includes(passwordInputConfirmNewPW.trim()))
                Alert.alert('Th??ng b??o', 'M???t kh???u nh???p l???i kh??ng kh???p v???i m???t kh???u m???i!');
            else {
                // CHANGE PASSWORD
                //+84944302210
                const phoneTabNewPW = '0' +getPhoneNumber.slice(3,12) //l???y chu???i t??? k?? t??? th??? 3 l?? 9, ?????n k?? t??? th??? 12 l?? sau s??? 0 cu???i
                const account = {
                    phoneNumber: phoneTabNewPW.trim(),
                    newPassword: passwordInputNewPW.trim(),
                };
                changePassword(account, dispatch, navigate);
                console.log(account);
                if(account) navigate('/');
            }
        }
        function checkDataInputs() {
            if (passwordInputNewPW.trim() === '' || passwordInputConfirmNewPW.trim() === '')
                Alert.alert('Th??ng b??o', 'Vui l??ng nh???p ch??? tr???ng!');
            else {
                checkConfirmNewPW();
                checkNewPW();
                // checkPhoneNumber();
            }
        }

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
                <View
                    style={{
                        display: !flagTabNewPW ? 'flex' : 'none',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#fff',
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <Image source={require('../../../../assets/stop.gif')} style={{ height: '60%', width: '50%' }} />
                    <Text
                        style={{
                            color: 'red',
                            fontWeight: 'bold',
                            fontSize: 16,
                            backgroundColor: '#fff',
                            marginTop: '-5%',
                            paddingTop: '2%',
                        }}
                    >
                        Vui l??ng x??c th???c s??? ??i???n tho???i tr?????c!
                    </Text>
                </View>
                <View style={{ display: flagTabNewPW ? 'flex' : 'none', width: '80%', padding: '5%' }}>
                    {/* <Formik initialValues={{ email: '' }} onSubmit={(values) => console.log(values)}> */}
                    <ScrollView>
                        {/* <TextInput
                            placeholder="S??? ??i???n tho???i"
                            keyboardType="number-pad"
                            autoComplete="tel"
                            autoFocus
                            value={phoneTabNewPW}
                            onChangeText={(txt) => setPhoneTabNewPW(txt)}
                            style={[
                                styles.txtInputsNewPW,
                                {
                                    shadowColor: 'rgba(0,0,0, .4)', // IOS
                                    shadowOffset: { height: 1, width: 1 }, // IOS
                                    shadowOpacity: 1, // IOS
                                    shadowRadius: 1, //IOS
                                    elevation: 2, // Android
                                },
                            ]}
                        /> */}
                        <View style={styles.viewIputsPW}>
                            <TextInput
                                placeholder="M???t kh???u m???i"
                                secureTextEntry={isSecureNewPW}
                                value={passwordInputNewPW}
                                onChangeText={(txt) => setPasswordInputNewPW(txt)}
                                style={[
                                    styles.txtInputsNewPW,
                                    {
                                        shadowColor: 'rgba(0,0,0, .4)', // IOS
                                        shadowOffset: { height: 1, width: 1 }, // IOS
                                        shadowOpacity: 1, // IOS
                                        shadowRadius: 1, //IOS
                                        elevation: 2, // Android
                                    },
                                ]}
                            />
                            <TouchableOpacity
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    alignSelf: 'center',
                                    height: 55,
                                    paddingLeft: 5,
                                    paddingRight: 5,
                                    marginLeft: -46,
                                    marginTop: '-10%',
                                }}
                                onPress={toggleNewPW}
                            >
                                {isSecureNewPW ? (
                                    <Icon name="eye" size={30} color="rgb(250, 139, 158)" />
                                ) : (
                                    <Icon name="eye-slash" size={30} color="rgb(250, 139, 158)" />
                                )}
                            </TouchableOpacity>
                        </View>
                        <View style={styles.viewIputsPW}>
                            <TextInput
                                placeholder="Nh???p l???i m???t kh???u"
                                secureTextEntry={isSecureConfirmNewPW}
                                value={passwordInputConfirmNewPW}
                                onChangeText={(txt) => setPasswordInputConfirmNewPW(txt)}
                                style={[
                                    styles.txtInputsNewPW,
                                    {
                                        shadowColor: 'rgba(0,0,0, .4)', // IOS
                                        shadowOffset: { height: 1, width: 1 }, // IOS
                                        shadowOpacity: 1, // IOS
                                        shadowRadius: 1, //IOS
                                        elevation: 2, // Android
                                    },
                                ]}
                            />
                            <TouchableOpacity
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    alignSelf: 'center',
                                    height: 55,
                                    paddingLeft: 5,
                                    paddingRight: 5,
                                    marginLeft: -46,
                                    marginTop: '-10%',
                                }}
                                onPress={toggleConfirmNewPW}
                            >
                                {isSecureConfirmNewPW ? (
                                    <Icon name="eye" size={30} color="rgb(250, 139, 158)" />
                                ) : (
                                    <Icon name="eye-slash" size={30} color="rgb(250, 139, 158)" />
                                )}
                            </TouchableOpacity>
                        </View>
                        <Link
                            // to={linkToHome}
                            style={{
                                backgroundColor: 'rgb(250, 139, 158)',
                                height: 40,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 20,
                            }}
                            onPress={() => checkDataInputs()}
                        >
                            <Text style={{ color: '#fff', fontWeight: 'bold' }}>X??c nh???n</Text>
                        </Link>
                    </ScrollView>
                    {/* </Formik> */}
                </View>
            </View>
        );
    }

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
                            width: widthScreen - 100,
                            height: '80%',
                            alignItems: 'center',
                        }}
                    >
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
                                    Tr??? v???
                                </Text>
                            </View>
                        </Link>
                        <View style={{ marginBottom: 10 }}></View>
                        <NavigationContainer>
                            <Tab.Navigator
                                initialRouteName="X??c th???c S??T"
                                screenOptions={({ route }) => ({
                                    tabBarIcon: ({ focused, color, size }) => {
                                        let iconName;
                                        if (route.name === 'X??c th???c S??T') {
                                            iconName = 'sms';
                                            size = focused ? 24 : 18;
                                            color = focused ? '#fff' : '#555';
                                        } else if (route.name === 'M???t kh???u m???i') {
                                            iconName = focused ? 'lock-open' : 'lock';
                                            size = focused ? 22 : 18;
                                            color = focused ? '#fff' : '#555';
                                        }
                                        return <Icon name={iconName} size={size} color={color} />;
                                    },
                                    tabBarStyle: {
                                        width: widthScreen - 100,
                                        height: 60,
                                    },
                                    tabBarItemStyle: {
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
                            >
                                <Tab.Screen name="X??c th???c S??T" component={VerifiedScreen} />
                                <Tab.Screen name="M???t kh???u m???i" component={RenewPWScreen} />
                            </Tab.Navigator>
                        </NavigationContainer>
                    </View>
                </ImageBackground>
            </Animatable.View>
        </SafeAreaView>
    );
}

export default ForgotPass;
