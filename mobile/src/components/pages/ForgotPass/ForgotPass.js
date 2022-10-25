import { Text, View, Image, ImageBackground, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import styles from './ForgotPass.module.scss';
import { Link } from 'react-router-native';

import { SafeAreaView } from 'react-native-safe-area-context';

//link all icons react-native: https://oblador.github.io/react-native-vector-icons/
import Icon from 'react-native-vector-icons/Ionicons';

function ForgotPass() {
    return (
        <SafeAreaView>
            <Text>Forgot pass</Text>
        </SafeAreaView>
    );
}

export default ForgotPass;
