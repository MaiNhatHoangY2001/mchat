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
    return (
        <SafeAreaView>
            <Animatable.View animation="bounceInRight">
                <ImageBackground source={require('../../../../assets/bgcolor-vertical.png')} style={styles.imgBG}>
                    <Text>HOME</Text>
                </ImageBackground>
            </Animatable.View>
        </SafeAreaView>
    );
}

export default Home;
