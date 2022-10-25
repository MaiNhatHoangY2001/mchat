import { ImageBackground, SafeAreaView, Text, TextInput, View ,Image} from 'react-native';
import styles from './Register.module.scss';
import { Link } from 'react-router-native';
// import { Icon } from 'react-native-vector-icons/icon';



function Register() {
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
                        <Text style={styles.tittle}>Nhập số điện thoại của bạn</Text>
                        <Text style={styles.info}> Vui lòng nhập số điện thoại đăng ký của bạn..</Text>
                        {/* <Text><Icon name='globe'/>Vietnamse</Text> */}
                        <TextInput placeholder='      Số điện thoại' style={styles.inputSDT}>
                            {/* <Image source={require('../../../../assets/iconglobe.png')} style={{height:26, width:26}}/> */}
                        </TextInput>
                        <Link to="/" style={styles.btnCon}>
                            <Text style={styles.txtCon}> Trở v </Text>
                        </Link>
                    </View>
                </ImageBackground>
            </View>
        </SafeAreaView>
    );
}

export default Register;
