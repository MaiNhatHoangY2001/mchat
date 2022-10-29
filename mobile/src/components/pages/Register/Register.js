import { ImageBackground, SafeAreaView, Text, TextInput, View ,Image, TouchableOpacity, Dimensions} from 'react-native';
import styles from './Register.module.scss';
import { Link } from 'react-router-native';
import { useRef, useState } from 'react';
// import { Icon } from 'react-native-vector-icons/icon';
import PhoneInput from 'react-native-phone-number-input';
import {FirebaseRecaptchaVerifierModal} from 'expo-firebase-recaptcha';
import { firebaseConfig } from '../../../firebase-config-mobile';
import firebase from 'firebase/compat/app';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const widthScreen = Dimensions.get('window').width

function Register() {
    const [FlagNewUser, setFlagNewUser] = useState(false)
    function verifyOtp(){

        const [Flag, setFlag] = useState(false)
        
        const [phonenumber, setPhoneNumber] = useState("")
        const [otp, setOtp] = useState('');
        const [verificationId, setVerificationId] = useState(null);
        const recaptchaVerifier = useRef(null);        const phoneInput = useRef(PhoneInput);
        // const otp1ref = useRef(null)
        // const otp2ref = useRef(null)
        // const otp3ref = useRef(null)
        // const otp4ref = useRef(null)
        // const otp5ref = useRef(null)
        // const otp6ref = useRef(null)

        // const [otp1, setOtp1] = useState("")
        // const [otp2, setOtp2] = useState("")
        // const [otp3, setOtp3] = useState("")
        // const [otp4, setOtp4] = useState("")
        // const [otp5, setOtp5] = useState("")
        // const [otp6, setOtp6] = useState("")

        const getOtp = () => {
                let phoneNumber = number.trim();
                // let regexPhoneNumberVN = /\+?(0|84)\d{9}/.test(phoneNumber);
                if (phoneNumber === '' || phoneNumber === undefined)
                    Alert.alert('Thông báo', 'Vui lòng nhập số điện thoại!');
                else if (phoneNumber.length !== 12) Alert.alert('Thông báo', 'Vui lòng nhập đủ 9 ký tự sau của số điện thoại!');
                else {
                    console.log(number);
                    try {
                        const phoneProvider = new firebase.auth.PhoneAuthProvider();
                        phoneProvider.verifyPhoneNumber(phoneNumber, recaptchaVerifier.current).then(setVerificationId);
                        setNumber('');
                        setFlag(true);
                    } catch (err) {
                        console.log(err.message);
                        Alert.alert('Thông báo', 'Vui lòng nhập lại só điện thoại!');
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
                            setFlagTabNewPW(true);
                            Alert.alert('Thông báo', "Xác thực thành công. Vui lòng chuyển tab 'Mật khẩu mới'");
                        })
                        .catch((error) => {
                            console.log(error);
                            alert('Xác thực không thành công!');
                        });
                    console.log(otp);

                    // //  CHANGE PASSWORD
                    // const account = {
                    //     phoneNumber: phoneTabNewPW.trim(),
                    //     newPassword: passwordInputNewPW.trim(),
                    // };
                    // changePassword(account, dispatch, navigate);
                }
            };
        return (
            <SafeAreaView style={{margin:0, padding:0}}>
                <View style={styles.registercontainer}>
                    <ImageBackground source={require('../../../../assets/bgcolor-vertical.png')} style={[styles.ImageBackground,{}]}>
                        <View>
                            <View>
                                <Image
                                    source={require('../../../../assets/logo-no-bg.png')}
                                    style={styles.logo}
                                />
                                <Text style={styles.line}>LINE</Text>
                            </View>
                            

                            <View style={{display: !Flag ? 'flex' : 'none',}}>
                                <View style={{  backgroundColor:'white',
                                                width:350,
                                                height:330,
                                                margin:30,
                                                marginTop:90,
                                                borderRadius:30
                                                ,opacity:0.99999
                                }}>
                                    <Text style={styles.tittle}>Nhập số điện thoại của bạn</Text>
                                    <Text style={styles.info}> Vui lòng nhập số điện thoại đăng ký            của bạn</Text>
                                    <View style={{alignContent:'center', alignSelf:'center',marginTop:15}}>
                                        <PhoneInput  defaultCode='VN' 
                                                    ref={phoneInput}
                                                    maxLength={9} autoComplete='cc-number'
                                                    defaultValue={phonenumber}
                                                    withShadow
                                                    layout='first'
                                                    autoFocus
                                                    placeholderTextColor={'#a9a9a9'}
                                                    onChangeFormattedText={(text) => setPhoneNumber(text)}
                                                    textContentType='telephoneNumber'
                                            placeholder='Số điện thoại'>
                                        </PhoneInput>
                                    </View>
                                    <Text style={[styles.info,{marginTop:18}]}>Bạn đã có tài khoản?</Text>
                                    <Link to="/">
                                        <Text style={{color: 'rgb(250, 139, 158)',
                                                fontWeight: 'bold',
                                                textAlign:'center',
                                                margin:10,
                                                fontSize: 20,}}>Đăng nhập ngay!</Text>
                                    </Link>
                                </View>
                                
                                <View style={{flexDirection:'row', alignContent:'space-around'}}>
                                    <TouchableOpacity style={styles.btnCon} onPress={() => setFlag(true)}>
                                        <Text style={styles.txtCon}> Tiếp tục </Text>
                                    </TouchableOpacity>
                                    <Link to="/" style={styles.btnCon}>
                                        <Text style={styles.txtCon}>   Trở về </Text>
                                    </Link>
                                </View>
                            </View>


                            <View style={{display: !Flag ? 'none' : 'flex'}}>
                                <View style={{  backgroundColor:'white',
                                                    width:350,
                                                    height:300,
                                                    margin:30,
                                                    marginTop:90,
                                                    borderRadius:30
                                    }}>
                                        <Text style={styles.tittle}>     Vui lòng nhập mã OTP</Text>
                                        <Text style={[styles.info, {fontWeight:'300',marginBottom:20,opacity:0.6}]}> Hệ thống vừa gửi OTP đến số điện thoại {phonenumber}</Text>
                                        <View style={{flexDirection:'row', alignItems:'space-around'} }>
                                                {/* <TextInput style={[styles.numberotp,{marginLeft:20}]} maxLength={1}
                                                    keyboardType='number-pad'
                                                    // onChange={(otp1) =>{
                                                    //     setOtp1(otp1)
                                                    //     if(otp1 != "")
                                                    //         otp2ref.current.focus()
                                                    // }}
                                                ></TextInput>
                                                <TextInput style={styles.numberotp} maxLength={1}
                                                    keyboardType='number-pad'
                                                    // onChange={(otp2) =>{
                                                    //     setOtp2(otp2)
                                                    //     if(otp2 != "")
                                                    //         otp3ref.current.focus()
                                                    // }}
                                                ></TextInput>
                                                <TextInput style={styles.numberotp} maxLength={1}
                                                    keyboardType='number-pad'
                                                    // onChange={(otp3) =>{
                                                    //     setOtp3(otp3)
                                                    //     if(otp3 != "")
                                                    //         otp4ref.current.focus()
                                                    // }}
                                                ></TextInput>
                                                <TextInput style={styles.numberotp} maxLength={1}
                                                    keyboardType='number-pad'
                                                    // onChange={(otp4) =>{
                                                    //     setOtp4(otp4)
                                                    //     if(otp4 != "")
                                                    //         otp5ref.current.focus()
                                                    // }}
                                                ></TextInput>
                                                <TextInput style={styles.numberotp} maxLength={1}
                                                    keyboardType='number-pad'
                                                    // onChange={(otp5) =>{
                                                    //     setOtp5(otp5)
                                                    //     if(otp5 != "")
                                                    //         otp6ref.current.focus()
                                                    // }}
                                                ></TextInput>
                                                <TextInput style={styles.numberotp} maxLength={1}
                                                    keyboardType='number-pad'
                                                    // onChange={(otp1) =>{
                                                    //     setOtp6(otp1)
                                                    // }}
                                                ></TextInput> */}
                                                <TextInput  keyboardType='number-pad' 
                                                    maxLength={6} autoComplete='cc-number'
                                                    // blurOnSubmit='true'
                                                    placeholderTextColor={'#a9a9a9'}
                                                    textContentType='oneTimeCode'
                                                    placeholder='Nhập OTP' style={styles.inputSDT}>
                                                </TextInput>
                                        </View>
                                        <Text style={[styles.info,{marginTop:20,marginBottom:15}]}>Bạn chưa nhận được mã?</Text>
                                        <Text style={{color: 'rgb(250, 139, 158)',
                                                textDecorationLine:'underline',
                                                fontWeight: 'bold',
                                                textAlign:'center',
                                                fontSize: 20,}
                                                }>Gửi lại OTP</Text>
                                </View>
                                <View style={{flexDirection:'row', marginTop:10, marginBottom:70, alignContent:'space-around'}}>
                                    <Link to="/" style={styles.btnCon} onPress={() => setFlag(false)}>
                                        <Text style={styles.txtCon}> Xác nhận </Text>
                                    </Link>
                                    <TouchableOpacity onPress={() => setFlag(false)}  style={styles.btnCon}>
                                        <Text style={styles.txtCon}>   Trở về </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
            </SafeAreaView>
        );
    }
    function verifyUser(){
        return(
            <SafeAreaView style={{margin:0, padding:0}}>
                <View style={styles.registercontainer}>
                    <ImageBackground source={require('../../../../assets/bgcolor-vertical.png')} style={[styles.ImageBackground,{}]}>
                        <View>
                            <View>
                                <Image
                                    source={require('../../../../assets/logo-no-bg.png')}
                                    style={styles.logo}
                                />
                                <Text style={styles.line}>LINE</Text>
                            </View>
                            
                            <View style={{display: !FlagNewUser ? 'flex' : 'none',}}>
                                <View style={{  backgroundColor:'white',
                                                width:350,
                                                height:250,
                                                margin:30,
                                                marginTop:90,
                                                borderRadius:30
                                                ,opacity:0.99999
                                }}>
                                    <Text style={[styles.tittle,{alignSelf:'center'}]}>Nhập tên của bạn</Text>
                                    <Text style={styles.info}> Vui lòng nhập tên của bạn</Text>
                                    <View style={{alignContent:'center', alignSelf:'center',marginTop:15, marginLeft:-28}}>
                                        <TextInput      numberOfLines={1}
                                                        maxLength={15} autoComplete='cc-number'
                                                        // blurOnSubmit='true'
                                                        placeholderTextColor={'#a9a9a9'}
                                                        textContentType='oneTimeCode'
                                                        placeholder='Tên của bạn' style={styles.inputSDT}>
                                                    </TextInput>
                                    </View>
                                    
                                </View>
                                
                                <View style={{flexDirection:'row', alignSelf:'center',marginBottom:80}}>
                                    <TouchableOpacity style={[styles.btnConUser]} onPress={() => setFlagNewUser(true)}>
                                        <Text style={styles.txtCon}> Tiếp tục </Text>
                                    </TouchableOpacity>
                                    {/* <Link to="/" style={styles.btnCon}>
                                        <Text style={styles.txtCon}>   Trở về </Text>
                                    </Link> */}
                                </View>
                            </View>


                            <View style={{display: !FlagNewUser ? 'none' : 'flex'}}>
                                <View style={{  backgroundColor:'white',
                                                    width:350,
                                                    height:300,
                                                    margin:30,
                                                    marginTop:90,
                                                    borderRadius:30,
                                                    alignSelf:'center'
                                    }}>
                                        <Text style={[styles.tittle, {alignSelf:'center'}]}>Chọn ảnh đại diện</Text>
                                        <View style={{flexDirection:'row', alignSelf:'center'} }>
                                            <TouchableOpacity style={styles.btnImgPicker}>
                                                <Image source={require('../../../../assets/camera.png')}
                                                style={styles.ImgPicker}/>
                                            </TouchableOpacity>
                                        </View>
                                        
                                </View>
                                <View style={{flexDirection:'row', marginTop:10, marginBottom:70, alignSelf:'center'}}>
                                    <Link to="/" style={styles.btnConUser} onPress={() => setFlagNewUser(false)}>
                                        <Text style={styles.txtCon}> Xác nhận </Text>
                                    </Link>
                                    {/* <TouchableOpacity onPress={() => setFlagNewUser(false)}  style={styles.btnCon}>
                                        <Text style={styles.txtCon}>   Trở về </Text>
                                    </TouchableOpacity> */}
                                </View>
                            </View>
                            

                            </View>
                    </ImageBackground>
                </View>
            </SafeAreaView>
        )
    }
    return(
        // <SafeAreaView style={{margin:0, padding:0}}>
        //         <View style={styles.registercontainer}>
        //             <ImageBackground source={require('../../../../assets/bgcolor-vertical.png')} style={[styles.ImageBackground,{}]}>
        //                 <View>
        //                     <View>
        //                         <Image
        //                             source={require('../../../../assets/logo-no-bg.png')}
        //                             style={styles.logo}
        //                         />
        //                         <Text style={styles.line}>LINE</Text>
        //                     </View>
                            
                            

        //                     </View>
        //             </ImageBackground>
        //         </View>
        //     </SafeAreaView>
        verifyOtp() 
        // verifyUser()
        ) 
}

export default Register;
