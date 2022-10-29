import { ImageBackground, SafeAreaView, Text, TextInput, View ,Image, TouchableOpacity} from 'react-native';
import styles from './Register.module.scss';
import { Link } from 'react-router-native';
import { useRef, useState } from 'react';
// import { Icon } from 'react-native-vector-icons/icon';



function Register() {

    const [Flag, setFlag] = useState(false)
    const [phonenumber, setPhoneNumber] = useState("")

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

    return (
        <SafeAreaView style={{margin:0, padding:0}}>
            <View style={styles.registercontainer}>
                <ImageBackground source={require('../../../../assets/bgcolor-vertical.png')} style={styles.ImageBackground}>
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
                            }}>
                                <Text style={styles.tittle}>Nhập số điện thoại của bạn</Text>
                                <Text style={styles.info}> Vui lòng nhập số điện thoại đăng ký            của bạn</Text>
                                <TextInput  keyboardType='number-pad' 
                                            maxLength={10} autoComplete='cc-number'
                                            // blurOnSubmit='true'
                                            placeholderTextColor={'#a9a9a9'}
                                            textContentType='telephoneNumber'
                                    placeholder='Số điện thoại' style={styles.inputSDT}>
                                </TextInput>
                                <Text style={styles.info}>Bạn đã có tài khoản?</Text>
                                <Link to="/">
                                    <Text style={{color: 'rgb(250, 139, 158)',
                                            fontWeight: 'bold',
                                            textAlign:'center',
                                            margin:10,
                                            fontSize: 18,}}>Đăng nhập ngay!</Text>
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
                                    <Text style={[styles.info, {fontWeight:'300',marginBottom:20}]}> Hệ thống vừa gửi OTP đến số điện thoại 1234567890</Text>
                                    <View style={{flexDirection:'row', alignItems:'space-around'} }>
                                            <TextInput style={[styles.numberotp,{marginLeft:20}]} maxLength={1}
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
                                            ></TextInput>
                                    </View>
                                    <Text style={[styles.info,{marginTop:20,marginBottom:15}]}>Bạn chưa nhận được mã?</Text>
                                    <Text style={{color: 'rgb(250, 139, 158)',
                                            textDecorationLine:'underline',
                                            fontWeight: 'bold',
                                            textAlign:'center',
                                            fontSize: 18,}
                                            }>Gửi lại OTP</Text>
                            </View>
                            <View style={{flexDirection:'row', marginTop:10, marginBottom:70, alignContent:'space-around'}}>
                                <TouchableOpacity style={styles.btnCon} onPress={() => setFlag(false)}>
                                    <Text style={styles.txtCon}> Xác nhận </Text>
                                </TouchableOpacity>
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

export default Register;
