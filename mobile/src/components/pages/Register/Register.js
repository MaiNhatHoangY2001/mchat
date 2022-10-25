import { Text, View } from 'react-native';
import styles from './Register.module.scss';
import { Link } from 'react-router-native';
function Register() {
    return (
        <View style={styles.registercontainer}>
            <View>
                <Text>Thông tin đăng ký</Text>
                {/* <Link to="/">
                    <Text> Home </Text>
                </Link> */}
            </View>
        </View>
    );
}

export default Register;
