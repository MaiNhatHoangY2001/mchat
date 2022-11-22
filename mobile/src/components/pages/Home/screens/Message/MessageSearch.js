import { useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// IMPORT ICON LINK ==> https://icons.expo.fyi/
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';

const DATA = [
    {
        id: 0,
        name: 'Ngoc Long',
    },
    {
        id: 1,
        name: 'Nhat Hoang',
    },
    {
        id: 2,
        name: 'Minh Hung',
    },
    {
        id: 3,
        name: 'Minh Hieu',
    },
    {
        id: 4,
        name: 'Dinh Tuan',
    },
    {
        id: 5,
        name: 'Con Cho',
    },
];

const Item = ({ item }) => (
    <TouchableOpacity style={[styles.item]}>
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
            <TouchableOpacity>
                <Text>New Group</Text>
            </TouchableOpacity>
            <FlatList style={{ width: '100%' }} data={filteredData} renderItem={renderItem} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 20,
    },
});
