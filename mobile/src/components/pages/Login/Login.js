import { Text, View } from 'react-native';
import styles from './Login.module.scss';
import { Link } from 'react-router-native';
function Login() {
    return (
        <View style={styles.title}>
            <Text>Login</Text>
            <Link to="/">
                <Text> Home </Text>
            </Link>
        </View>
    );
}

export default Login;
