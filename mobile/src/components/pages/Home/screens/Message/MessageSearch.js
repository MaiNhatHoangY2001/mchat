import { useState, useEffect } from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// IMPORT ICON LINK ==> https://icons.expo.fyi/
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const DATA = [
    {
        id: 0,
        name: 'Ngoc Long',
        uri: 'https://res.cloudinary.com/dpux6zwj3/image/upload/v1667672819/Avata/avata01_gqmzyq.png',
    },
    {
        id: 1,
        name: 'Nhat Hoang',
        uri: 'https://res.cloudinary.com/dpux6zwj3/image/upload/v1667672819/Avata/avata01_gqmzyq.png',
    },
    {
        id: 2,
        name: 'Minh Hung',
        uri: 'https://res.cloudinary.com/dpux6zwj3/image/upload/v1667672819/Avata/avata01_gqmzyq.png',
    },
    {
        id: 3,
        name: 'Minh Hieu',
        uri: 'https://res.cloudinary.com/dpux6zwj3/image/upload/v1667672819/Avata/avata01_gqmzyq.png',
    },
    {
        id: 4,
        name: 'Dinh Tuan',
        uri: 'https://res.cloudinary.com/dpux6zwj3/image/upload/v1667672819/Avata/avata01_gqmzyq.png',
    },
    {
        id: 5,
        name: 'Con Cho',
        uri: 'https://res.cloudinary.com/dpux6zwj3/image/upload/v1667672819/Avata/avata01_gqmzyq.png',
    },
];

const Item = ({ item }) => (
    <TouchableOpacity style={[styles.item]}>
        <View style={styles.bgImage}>
            <Image
                style={styles.image}
                source={{
                    uri: item.uri,
                }}
            />
        </View>
        <Text style={[styles.title]}>{item.name}</Text>
    </TouchableOpacity>
);

export default function MessageSearch({ navigation }) {
    const [textSearch, setTextSearch] = useState('');

    const filteredData = DATA.filter((item) => {
        return item.name.toLowerCase().includes(textSearch.toLowerCase());
    });

    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <View style={styles.bgSearch}>
                    <TextInput style={styles.inputSearch} onChangeText={setTextSearch} placeholder="Tìm Kiếm" />
                    <TouchableOpacity>
                        <Ionicons name="search" size={20} color="black" />
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [navigation, textSearch]);

    const renderItem = ({ item }) => {
        return <Item item={item} />;
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.bgAddGroup}>
                <TouchableOpacity style={styles.buttonAddGroup} onPress={() => navigation.navigate('MassageNewGroup')}>
                    <View style={styles.bgIcon}>
                        <AntDesign name="addusergroup" size={28} color="black" />
                    </View>
                    <Text style={[styles.title, styles.bool]}>New Group</Text>
                </TouchableOpacity>
            </View>
            <FlatList style={{ width: '100%' }} data={filteredData} renderItem={renderItem} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },

    bgAddGroup: {
        paddingVertical: 10,

        width: '100%',

        borderBottomWidth: 10,
        borderBottomColor: 'rgba(238, 238, 238, 1)',
    },
    bgIcon: {
        justifyContent: 'center',
        alignItems: 'center',

        width: 36,
        height: 36,

        marginRight: 20,
    },
    buttonAddGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },

    bgSearch: {
        flex: 0.9,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: -15,
        marginRight: 20,
        paddingVertical: 4,
        paddingHorizontal: 16,

        borderWidth: 1,
        borderRadius: 100,
    },
    inputSearch: {
        flex: 1,
        fontSize: 16,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    bgImage: {
        width: 50,
        height: 50,

        marginRight: 10,
    },
    image: {
        flex: 1,
        borderRadius: 100,
    },
    title: {
        fontSize: 20,
    },
    bool: {
        fontWeight: '600',
    },
});
