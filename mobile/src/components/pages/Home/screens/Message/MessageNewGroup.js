import { useEffect, useLayoutEffect, useState } from 'react';
import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// IMPORT ICON LINK ==> https://icons.expo.fyi/
import { Ionicons } from '@expo/vector-icons';

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

const Item = ({ item, onPress, check }) => (
    <TouchableOpacity style={[styles.item]} onPress={onPress}>
        <View style={styles.bgImage}>
            <Image
                style={styles.image}
                source={{
                    uri: item.uri,
                }}
            />
        </View>
        <Text style={[styles.titleItem]}>{item.name}</Text>
        {check.find((checked) => checked.id === item.id) === undefined ? (
            <></>
        ) : (
            <Ionicons name="checkmark" size={24} color="green" />
        )}
    </TouchableOpacity>
);

const ItemChecked = ({ item, onPress }) => (
    <TouchableOpacity style={[styles.item]} onPress={onPress}>
        <View style={styles.bgImage}>
            <Image
                style={styles.image}
                source={{
                    uri: item.uri,
                }}
            />
        </View>
        <Text style={[styles.titleItem]}>{item.name}</Text>
        <Ionicons name="close-circle" size={24} color="black" />
    </TouchableOpacity>
);

export default function MessageNewGroup({ navigation }) {
    const [search, setSearch] = useState('');
    const [check, setCheck] = useState([]);

    const filteredData = DATA.filter((item) => {
        return item.name.toLowerCase().includes(search.toLowerCase());
    });

    const handleCreateGroup = () => {
        console.log('Create Group');
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerSearchBarOptions: {
                placeholder: 'Tìm kiếm người dùng',
                onChangeText: (event) => setSearch(event.nativeEvent.text),
            },
        });
    }, [navigation, search]);

    const renderItem = ({ item }) => {
        const handleChecked = (value) => {
            const isEmpty = check.find((item) => item.id === value.id) === undefined ? true : false;
            if (isEmpty)
                setCheck((prev) => {
                    return [...prev, value];
                });
        };

        return <Item item={item} check={check} onPress={() => handleChecked(item)} />;
    };

    const renderItemChecked = ({ item }) => {
        const handleRemove = (value) => {
            setCheck(check.filter((item) => item.id !== value.id));
        };

        return <ItemChecked item={item} onPress={() => handleRemove(item)} />;
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={[{ flex: 1, paddingBottom: 10 }, styles.borderBottom]}>
                <Text style={[styles.title]}>Danh danh người dùng </Text>
                <FlatList style={[{ flex: 1 }]} data={filteredData} renderItem={renderItem} />
            </View>
            <View style={[{ flex: 1 }]}>
                <Text style={styles.title}>Danh danh đã chọn {check.length}</Text>
                <FlatList style={{ flex: 1 }} data={check} renderItem={renderItemChecked} />
            </View>
            {check.length >= 2 ? (
                <View style={styles.buttonBottom}>
                    <TouchableOpacity
                        style={styles.buttonNext}
                        onPress={() => navigation.navigate('MessageNewInforGroup', { checked: check })}
                    >
                        <Text style={styles.titleNext}>Tiếp tục</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <></>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    section: {
        flex: 1,
        borderWidth: 1,
    },
    borderBottom: {
        borderBottomWidth: 6,
        borderBottomColor: '#c4c4c4',
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
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
    titleItem: {
        flex: 1,
        fontSize: 20,
    },

    buttonBottom: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    buttonNext: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: 'black',

        width: '100%',

        borderWidth: 1,
        borderRadius: 50,
    },
    titleNext: {
        color: 'white',
        fontSize: 20,
        fontWeight: '700',
    },
});
