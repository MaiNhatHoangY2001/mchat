import { ImageBackground, Alert, SafeAreaView, Text, TextInput, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import styles from './Register.module.scss';
import { Link, useNavigate } from 'react-router-native';
import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loginUser, registerUser } from '../../../redux/apiRequest/authApiRequest';

import PhoneInput from 'react-native-phone-number-input';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { firebaseConfig } from '../../../firebase-config-mobile';
import firebase from 'firebase/compat/app';

import Icon from 'react-native-vector-icons/FontAwesome5';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { getAllNumber } from '../../../redux/apiRequest/userApiRequest';
const Tab = createBottomTabNavigator();

const widthScreen = Dimensions.get('window').width

function Register() {
    const user = useSelector((state) => state.auth.login?.currentUser)
    const allNumber = useSelector((state) => state.user?.users?.allNumber);
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [flagTabNewUser, setFlagTabNewUser] = useState(false);
    const [FlagNewUser, setFlagNewUser] = useState(false)
    const [isLoading, setIsLoading] = useState(false);

    const [numberphone, setNumberPhone] = useState('')
    const [password, setPassword] = useState('')


    // const handleRegister = (e) => {
    //     e.preventDefault();
    //     // const validationForm = this.validationForm();
    //     // if(validationForm.error){
    //     //     alert(validationForm.msg);
    //     // }
    //     const newUser = {
    //         phoneNumber: phoneNumber,
    //         password: password,
    //         profileName: name,
    //         date: date,
    //         refreshToken: '',
    //     };
    //     registerUser(newUser, dispatch, navigate, setIsLoading);
    //     window.setTimeout(function () {
    //         //login when sign up one second
    //         handleLogin(phoneNumber, password);
    //         navigate('/');
    //     }, 1000);
    // };

    // const handleLogin = (phoneNumber, password) => {
    //     const newUser = {
    //         phoneNumber: phoneNumber,
    //         password: password,
    //         // phoneNumber: phoneNumberValue,
    //         // password: pwValue,
    //     };

    //     loginUser(newUser, dispatch, navigate, setIsLoading);
    // };

    useEffect(() => {
        console.log('running');
        if (user) {
            navigate('/');
        }
    });

    useEffect(() => {
        getAllNumber(dispatch);
    }, [])

    function VerifyOtp() {
        const [Flag, setFlag] = useState(false)
        const [phonenumber, setPhoneNumber] = useState('')
        const [otp, setOtp] = useState('');
        const [verificationId, setVerificationId] = useState(null);
        const recaptchaVerifier = useRef(null);
        const phoneInput = useRef(PhoneInput);
        let phoneNumber = phonenumber.trim();

        const getOtp = () => {
            if (phoneNumber === '' || phoneNumber === undefined)
                Alert.alert('Th??ng b??o', 'Vui l??ng nh???p s??? ??i???n tho???i!');
            else if (phoneNumber.length !== 12) Alert.alert('Th??ng b??o', 'Vui l??ng nh???p ????? 9 k?? t??? sau c???a s??? ??i???n tho???i!');
            else if( allNumber.includes(('0' +phoneNumber.slice(3,12)))){
                Alert.alert('Th??ng ba??o', 'S???? ??i????n thoa??i ??a?? ????????c ????ng ki??! Vui lo??ng du??ng s???? kha??c.')}
            else {
                console.log(phonenumber);
                try {
                    const phoneProvider = new firebase.auth.PhoneAuthProvider();
                    phoneProvider.verifyPhoneNumber(phoneNumber, recaptchaVerifier.current).then(setVerificationId);
                    setPhoneNumber(phoneNumber);
                    setFlag(true);
                } catch (err) {
                    console.log(err.message);
                    Alert.alert('Th??ng b??o', 'Vui l??ng nh???p l???i s?? ??i???n tho???i!');
                }
            }
        };
        const verifyyOtp = () => {
            if (otp === '' || otp === undefined) Alert.alert('Th??ng b??o', 'Vui l??ng nh???p m?? x??c th???c!');
            else if (otp.length !== 6) Alert.alert('Th??ng b??o', 'Vui l??ng nh???p 6 k?? t???!');
            else {
                const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, otp);
                firebase
                    .auth()
                    .signInWithCredential(credential)
                    .then(() => {
                        setOtp('');
                        setFlagTabNewUser(true);
                        Alert.alert('Th??ng b??o', "X??c th???c th??nh c??ng. Vui l??ng chuy???n tab '????ng ky??'");
                    })
                    .catch((error) => {
                        console.log(error);
                        alert('X??c th???c kh??ng th??nh c??ng!');
                    });
                console.log(otp);
                setNumberPhone(phonenumber)
            }
        };

        return (
            <SafeAreaView style={{ margin: 0, padding: 0 }}>
                <View style={{ borderRadius: 20 }}>
                    <ImageBackground source={require('../../../../assets/bgcolor-vertical.png')} style={[styles.ImageBackground, {}]}>
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'space-around',
                                alignItems: 'center',
                                borderTopColor: 'red',
                                borderStyle: 'solid',
                                borderTopWidth: 1,
                                marginTop: -5
                            }}>
                            {/* <View>
                                <Image
                                    source={require('../../../../assets/logo-no-bg.png')}
                                    style={styles.logo}
                                />
                                <Text style={styles.line}>LINE</Text>
                            </View> */}


                            <View style={{ display: !Flag ? 'flex' : 'none', }}>
                                <View style={{
                                    backgroundColor: 'white',
                                    width: 350,
                                    height: 485,
                                    margin: 30,
                                    marginTop: 90,
                                    justifyContent: 'center',
                                    borderRadius: 30
                                    , opacity: 0.99999
                                }}>
                                    <Text style={styles.tittle}>Nh????p s???? ??i????n thoa??i cu??a ba??n</Text>
                                    <Text style={styles.info}> Vui lo??ng nh????p s???? ??i????n thoa??i ????ng ky??            cu??a ba??n</Text>
                                    <View style={{ alignContent: 'center', alignSelf: 'center', marginTop: 15 }}>
                                        <PhoneInput
                                            defaultCode='VN'
                                            ref={phoneInput}
                                            maxLength={9}
                                            defaultValue={phonenumber}
                                            withShadow
                                            layout='first'
                                            autoFocus
                                            // onChange={setPhoneNumber}
                                            onChangeFormattedText={(text) => setPhoneNumber(text)}
                                            placeholder='S???? ??i????n thoa??i'>
                                        </PhoneInput>
                                    </View>
                                    <Text style={[styles.info, { marginTop: 18 }]}>Ba??n ??a?? co?? ta??i khoa??n?</Text>
                                    <Link to="/">
                                        <Text style={{
                                            color: 'rgb(250, 139, 158)',
                                            fontWeight: 'bold',
                                            textAlign: 'center',
                                            margin: 10,
                                            fontSize: 20,
                                        }}>????ng nh????p ngay!</Text>
                                    </Link>

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignContent: 'space-between' }}>
                                        <TouchableOpacity style={styles.btnCon} onPress={getOtp}>
                                            <Text style={styles.txtCon}> Ti????p tu??c </Text>
                                        </TouchableOpacity>
                                        <Link to="/" style={styles.btnCon}>
                                            <Text style={styles.txtCon}>Tr???? v???? </Text>
                                        </Link>
                                    </View>
                                </View>
                            </View>
                            <View style={{ display: !Flag ? 'none' : 'flex' }}>
                                <View style={{
                                    backgroundColor: 'white',
                                    width: 350,
                                    height: 420,
                                    margin: 30,
                                    marginTop: 150,
                                    borderRadius: 30
                                }}>
                                    <Text style={styles.tittle}>     Vui lo??ng nh????p ma?? OTP</Text>
                                    <Text style={[styles.info, { fontWeight: '300', marginBottom: 20, opacity: 0.6 }]}> H???? th????ng v????a g????i OTP ??????n s???? ??i????n thoa??i {phonenumber}</Text>
                                    <View style={{ alignContent: 'center', alignSelf: 'center', marginTop: 15, marginLeft: -28 }}>
                                        <TextInput keyboardType='number-pad'
                                            maxLength={6} autoComplete='tel'
                                            onChangeText={setOtp}
                                            placeholder='Nh????p OTP' style={styles.inputSDT}>
                                        </TextInput>
                                    </View>
                                    <Text style={[styles.info, { marginTop: 20, marginBottom: 15 }]}>Ba??n ch??a nh????n ????????c ma???</Text>
                                    <Text style={{
                                        color: 'rgb(250, 139, 158)',
                                        textDecorationLine: 'underline',
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                        fontSize: 20,
                                    }
                                    }>G????i la??i OTP</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignContent: 'space-around' }}>
                                        <TouchableOpacity style={styles.btnCon} onPress={verifyyOtp}>
                                            <Text style={styles.txtCon}>Xa??c nh????n</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => setFlag(false)} style={styles.btnCon}>
                                            <Text style={styles.txtCon}>Tr???? v????</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View>
                                <FirebaseRecaptchaVerifierModal ref={recaptchaVerifier} firebaseConfig={firebaseConfig} />
                            </View>
                        </View>
                    </ImageBackground>
                </View>
            </SafeAreaView>
        );
    }
    function VerifyUser() {

        const [date, setDate] = useState('10-07-2001');

        const [isSecureNewPW, setIsSecureNewPW] = useState(true)
        const toggleNewPW = () => {
            if (isSecureNewPW) {
                setIsSecureNewPW(false)
                return
            }
            setIsSecureNewPW(true)
        };
        const [passwordInputNewPW, setPasswordInputNewPW] = useState('')
        const [nameUserInput, setNameUserInput] = useState('')

        function checkConfirmNewPW() {
            if (passwordInputNewPW.trim().length < 6)
                Alert.alert('Th??ng b??o', 'Vui l??ng nh???p t???i thi???u 6 k?? t??? m???t kh???u!');
            else {
                // console.log("S??T t???? verify ",numberphone)
                // console.log("SDT sau khi ??i??nh da??ng ",phoneTabNewPW)
                // setNumberPhone('0' + numberphone.slice(3,12))
                // console.log("SDT ng??????i du??ng t????ng b???? ",numberphone)
                setFlagNewUser(true)
                setPassword(passwordInputNewPW)
                console.log(passwordInputNewPW)
                console.log(password)
            }
        }
        function checkDataInputsPassword() {
            if (passwordInputNewPW.trim() === '')
                Alert.alert('Th??ng b??o', 'Vui l??ng nh???p m????t kh????u!')
            else {
                checkConfirmNewPW()
            }
        }
        function checkDataInputInfo() {
            if (nameUserInput.trim() === '')
                Alert.alert('Th??ng ba??o', 'Vui lo??ng nh????p t??n cu??a ba??n')
            else {
                if (nameUserInput.trim().length < 1)
                    Alert.alert('Th??ng b??o', 'Vui l??ng nh???p t???i thi???u 2 k?? t???!')
                else {
                    const phoneTabNewUser = '0' + numberphone.slice(3, 12)
                    const newUser = {
                        phoneNumber: phoneTabNewUser.trim(),
                        password: password.trim(),
                        profileName: nameUserInput,
                        date: '',
                        refreshToken: '',
                    };



                    registerUser(newUser, dispatch, navigate, setIsLoading);
                    window.setTimeout(function () {
                        //login when sign up one second
                        handleLogin(phoneTabNewUser.trim(), password)
                        navigate('/')
                    }, 1000);


                }
            }
        }


        const handleLogin = (phoneNumber, password) => {
            const newUser = {
                phoneNumber: phoneNumber,
                password: password,
            };

            loginUser(newUser, dispatch, navigate, setIsLoading);
        };

        useEffect(() => {
            if (user) {
                navigate('/')
            }
        });

        return (
            <SafeAreaView style={{ margin: 0, padding: 0 }}>
                <View
                    style={{
                        display: !flagTabNewUser ? 'flex' : 'none',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#fff',
                        width: '100%',
                        height: '100%',
                        marginBottom: 70
                    }}
                >
                    <Image source={require('../../../../assets/stop.gif')} style={{ height: '45%', width: '50%' }} />
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

                <View style={styles.registercontainer}>
                    <ImageBackground source={require('../../../../assets/bgcolor-vertical.png')} style={[styles.ImageBackground, {}]}>
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'space-around',
                                alignItems: 'center',
                                borderTopColor: 'red',
                                borderStyle: 'solid',
                                borderTopWidth: 1,
                                marginTop: -5
                            }}>

                            <View style={{ display: !FlagNewUser ? 'flex' : 'none', }}>
                                <View style={{
                                    backgroundColor: 'white',
                                    width: 350,
                                    height: 700,
                                    margin: 30,
                                    justifyContent: 'center',
                                    marginTop: 350,
                                    borderRadius: 30
                                    , opacity: 0.99999
                                }}>
                                    <Text style={[styles.tittle, { alignSelf: 'center' }]}>Nh????p m????t kh????u cu??a ba??n</Text>
                                    <Text style={styles.info}> Vui lo??ng nh????p m????t kh????u cu??a ba??n</Text>
                                    <View style={{ alignContent: 'center', alignSelf: 'center', marginTop: 15, marginLeft: -28 }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <TextInput
                                                placeholderTextColor={'#a9a9a9'}
                                                secureTextEntry={isSecureNewPW}
                                                onChangeText={(txt) => setPasswordInputNewPW(txt)}
                                                placeholder='M????t kh????u' style={styles.inputSDT}>
                                            </TextInput>
                                            <TouchableOpacity
                                                style={{
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    alignSelf: 'center',
                                                    height: 55,
                                                    paddingLeft: 5,
                                                    paddingRight: 5,
                                                    marginLeft: -50,
                                                    opacity: 0.95
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
                                        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                            <TouchableOpacity style={[styles.btnCon, { marginLeft: 30 }]} onPress={checkDataInputsPassword}>
                                                <Text style={styles.txtCon}> Ti????p tu??c </Text>
                                            </TouchableOpacity>
                                            {/* <Link to="/" style={styles.btnCon}>
                                                <Text style={styles.txtCon}>   Tr???? v???? </Text>
                                            </Link> */}
                                        </View>
                                    </View>
                                </View>
                            </View>


                            <View style={{ display: !FlagNewUser ? 'none' : 'flex' }}>
                                <View style={{
                                    backgroundColor: 'white',
                                    width: 350,
                                    height: 700,
                                    margin: 30,
                                    justifyContent: 'center',
                                    marginTop: 350,
                                    borderRadius: 30
                                    , opacity: 0.99999
                                }}>
                                    <Text style={[styles.tittle, { alignSelf: 'center' }]}>Nh????p t??n cu??a ba??n</Text>
                                    <Text style={styles.info}> Vui lo??ng nh????p t??n cu??a ba??n</Text>
                                    <View style={{ alignContent: 'center', alignSelf: 'center', marginTop: 15, marginLeft: -28 }}>
                                        <TextInput numberOfLines={1}
                                            maxLength={15} autoComplete='cc-number'
                                            onChangeText={(txt) => setNameUserInput(txt)}
                                            placeholderTextColor={'#a9a9a9'}
                                            placeholder='T??n cu??a ba??n' style={styles.inputSDT}>
                                        </TextInput>
                                        {isLoading ? (
                                            <Text>??ang ta??o ta??i khoa??n, vui lo??ng ch???? trong gi??y la??t</Text>
                                        ) : (
                                            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                                <TouchableOpacity
                                                    style={[styles.btnCon, { marginLeft: 30 }]}
                                                    onPress={checkDataInputInfo}>
                                                    <Text style={styles.txtCon}> ????ng ky?? </Text>
                                                </TouchableOpacity>
                                            </View>
                                        )}
                                    </View>
                                </View>
                            </View>


                        </View>
                    </ImageBackground>
                </View>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={{ margin: 0, padding: 0 }}>
            <View style={styles.registercontainer}>
                <ImageBackground source={require('../../../../assets/bgcolor-vertical.png')} style={[styles.imgBackground, {}]}>
                    <View
                        style={{
                            width: widthScreen - 100,
                            height: '80%',
                            alignItems: 'center',
                        }}>
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
                                        } else if (route.name === '????ng ky??') {
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
                                <Tab.Screen name="X??c th???c S??T" component={VerifyOtp} />
                                <Tab.Screen name="????ng ky??" component={VerifyUser} />
                            </Tab.Navigator>
                        </NavigationContainer>


                    </View>
                </ImageBackground>
            </View>
        </SafeAreaView>
        // VerifyOtp() 
        // verifyUser()

    )
}

export default Register;
