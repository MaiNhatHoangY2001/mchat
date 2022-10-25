import { Text, View, Image, ImageBackground, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import styles from './Home.module.scss';
import { Link } from 'react-router-native';

import { SafeAreaView } from 'react-native-safe-area-context';

//link all name animations: https://github.com/oblador/react-native-animatable
//link how to code animation: https://blog.bitsrc.io/top-5-animation-libraries-in-react-native-d00ec8ddfc8d
import * as Animatable from 'react-native-animatable';

//link all icons react-native: https://oblador.github.io/react-native-vector-icons/
import Icon from 'react-native-vector-icons/Ionicons';

function Home() {
    // const [animationName, setAnimationName] = useState('zoomIn');
    // const [linkScreen, setLinkScreen] = useState('');

    return (
        <SafeAreaView style={styles.container}>
            <Animatable.View
                animation="zoomIn"
                // iterationCount={5}
                direction="alternate"
            >
                <ImageBackground source={require('../../../../assets/bgcolor-vertical.png')} style={styles.imgBG}>
                    <View>
                        <Image
                            source={require('../../../../assets/logo-no-bg.png')}
                            style={{ width: 180, height: 150, resizeMode: 'contain' }}
                        />
                        <Text style={styles.txtLine}>LINE</Text>
                    </View>
                    <View>
                        <Image
                            source={require('../../../../assets/Illustration.png')}
                            style={{ height: 270, resizeMode: 'contain' }}
                        />
                    </View>
                    <View>
                        <Link
                            to="/login"
                            style={{
                                shadowColor: 'rgba(0,0,0, .4)', // IOS
                                shadowOffset: { height: 1, width: 1 }, // IOS
                                shadowOpacity: 2, // IOS
                                shadowRadius: 1, //IOS
                                backgroundColor: '#fff',
                                elevation: 4, // Android
                                backgroundColor: '#fff',
                                borderRadius: 12,
                                borderColor: 'rgb(250, 139, 158)',
                                borderWidth: 2,
                                borderStyle: 'solid',
                                padding: '3%',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            // onPress={() => {
                            //     setLinkScreen('/login');
                            //     setAnimationName('fadeOut');
                            // }}
                        >
                            <Text style={{ color: 'rgb(250, 139, 158)', fontSize: 17, fontWeight: 'bold' }}>
                                Đăng nhập bằng số điện thoại
                            </Text>
                        </Link>
                    </View>
                </ImageBackground>
            </Animatable.View>
        </SafeAreaView>
    );
}

export default Home;
