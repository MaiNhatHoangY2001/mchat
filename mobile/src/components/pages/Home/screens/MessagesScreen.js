import {
    Text,
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
    TextInput,
    Dimensions,
    StyleSheet,
    FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-native';
import { useDispatch, useSelector } from 'react-redux';

import { SafeAreaView } from 'react-native-safe-area-context';

//link all name animations: https://github.com/oblador/react-native-animatable
//link how to code animation: https://blog.bitsrc.io/top-5-animation-libraries-in-react-native-d00ec8ddfc8d
import * as Animatable from 'react-native-animatable';

//link all icons react-native: https://oblador.github.io/react-native-vector-icons/
import Icon from 'react-native-vector-icons/Ionicons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

import { createAxios } from '../../../../redux/createInstance';
import { logoutSuccess } from '../../../../redux/authSlice';
import { logOut } from '../../../../redux/apiRequest/authApiRequest';

import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//link doc top tabs: https://reactnavigation.org/docs/material-top-tab-navigator/
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Item from './FlatList/Item';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

// Demo Data Flatlist
const Data = [
    {
        id: 0,
        img: 'https://res.cloudinary.com/dpux6zwj3/image/upload/v1667672819/Avata/avata01_gqmzyq.png',
        name: 'Nhật Hoàng',
    },
    {
        id: 1,
        img: 'https://res.cloudinary.com/dpux6zwj3/image/upload/v1667672819/Avata/avata01_gqmzyq.png',
        name: 'Minh Hùng',
    },
    {
        id: 2,
        img: 'https://res.cloudinary.com/dpux6zwj3/image/upload/v1667672819/Avata/avata01_gqmzyq.png',
        name: 'Ngọc Long',
    },
    {
        id: 3,
        img: 'https://res.cloudinary.com/dpux6zwj3/image/upload/v1667672819/Avata/avata01_gqmzyq.png',
        name: 'Đinh Tuấn',
    },
    {
        id: 4,
        img: 'https://res.cloudinary.com/dpux6zwj3/image/upload/v1667672819/Avata/avata01_gqmzyq.png',
        name: 'Minh Hiếu',
    },
    {
        id: 5,
        img: 'https://res.cloudinary.com/dpux6zwj3/image/upload/v1667672819/Avata/avata01_gqmzyq.png',
        name: 'Công Phượng',
    },
];

export default function MessagesScreen() {
    const [flagSearch, setFlagSearch] = useState(false);

    // Get Item
    const renderItem = ({ item }) => {
        <Item item={item} />;
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.mainMessage, { display: !flagSearch ? 'flex' : 'none' }]}>
                <View style={styles.headingChatTab}>
                    <Text style={[styles.headertitle]}>Messages</Text>
                    <TouchableOpacity style={[styles.buttonSearch]} onPress={() => setFlagSearch(true)}>
                        <Icon style={[styles.titleButton]} name="search-circle" />
                    </TouchableOpacity>
                </View>
                <View style={[styles.bodyMessage]}>
                    <Text>Long</Text>
                    <FlatList style={[styles.flatList]} data={Data} renderItem={renderItem} />
                </View>
            </View>
            <View style={{ display: flagSearch ? 'flex' : 'none' }}>
                <View style={styles.headingChatTab}>
                    <TouchableOpacity onPress={() => setFlagSearch(false)}>
                        <View style={[styles.bgButton]}>
                            <Icon style={[styles.titleButton]} name="md-arrow-back-circle" />
                        </View>
                    </TouchableOpacity>
                    <TextInput placeholder="Tìm kiếm" autoFocus style={styles.txtSearch} />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    mainMessage: {
        flex: 1,
    },
    headingChatTab: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,

        borderBottomWidth: 1,
        borderBottomColor: 'rgb(250, 139, 158)',
    },
    headertitle: {
        fontSize: 24,
        fontWeight: '500',
    },
    bgButton: {},
    titleButton: {
        fontSize: 36,
        color: 'rgb(250, 139, 158)',
    },

    bodyMessage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flatList: {
        flex: 1,
        width: '100%',
    },

    txtSearch: {
        backgroundColor: '#EEEEEE',
        width: '80%',
        height: '80%',
        marginLeft: '4%',
        padding: 10,
        paddingLeft: 20,
        borderRadius: 15,
        fontSize: 18,
    },
});
