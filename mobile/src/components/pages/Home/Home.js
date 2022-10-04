import { Text, View } from 'react-native';
import styles from './Home.module.scss';
import { Link } from 'react-router-native';
function Home() {
    return (
        <View style={styles.title}>
            <Text>GROW</Text>
            <Text>YOUR BUSINESS</Text>
            <Link to="/login">
                <Text> Đăng ký ngay </Text>
            </Link>
        </View>
    );
}

export default Home;
