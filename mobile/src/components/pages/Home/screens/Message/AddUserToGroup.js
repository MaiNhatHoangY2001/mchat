import { useContext, useLayoutEffect, useState } from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// IMPORT ICON LINK ==> https://icons.expo.fyi/
import { Ionicons } from '@expo/vector-icons';
import { ChatContext } from '../../../../../context/ChatContext';

const Item = ({ item, onPress, check }) => {
    const isGroupChat = item?.sender?._id === undefined;

    return isGroupChat ? (
        <></>
    ) : (
        <TouchableOpacity style={[styles.item]} onPress={onPress}>
            <View style={styles.bgImage}>
                <Image
                    style={styles.image}
                    source={{
                        uri: item?.sender?.profileImg,
                    }}
                />
            </View>
            <Text style={[styles.titleItem]}>{item?.sender?.profileName}</Text>
            {check.find((checked) => checked?._id === item?._id) === undefined ? (
                <></>
            ) : (
                <Ionicons name="checkmark" size={24} color="green" />
            )}
        </TouchableOpacity>
    );
};

const ItemChecked = ({ item, onPress }) => (
    <TouchableOpacity style={[styles.item]} onPress={onPress}>
        <View style={styles.bgImage}>
            <Image
                style={styles.image}
                source={{
                    uri: item?.sender?.profileImg,
                }}
            />
        </View>
        <Text style={[styles.titleItem]}>{item?.sender?.profileName}</Text>
        <Ionicons name="close-circle" size={24} color="black" />
    </TouchableOpacity>
);

export default function AddUserToGroup({ navigation, route }) {
    const chatContext = useContext(ChatContext);
    const { sendText4JoinGroup } = chatContext;
    const { chatActors } = chatContext;

    const currentGroupChat = route.params.currentGroupChat;

    const [search, setSearch] = useState('');
    const [check, setCheck] = useState([]);

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
            const isEmpty = check.find((item) => item?._id === value?._id) === undefined ? true : false;
            if (isEmpty)
                setCheck((prev) => {
                    return [...prev, value];
                });
        };

        return <Item item={item} check={check} onPress={() => handleChecked(item)} />;
    };

    const renderItemChecked = ({ item }) => {
        const handleRemove = (value) => {
            setCheck(check.filter((item) => item?._id !== value?._id));
        };

        return <ItemChecked item={item} onPress={() => handleRemove(item)} />;
    };

    const handleSubmitAddUser = () => {
        if (check.length > 0) {
            sendText4JoinGroup(check, currentGroupChat?.groupName, currentGroupChat?._id);
            navigation.goBack();
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={[{ flex: 1, padding: 10 }, styles.borderBottom]}>
                <Text style={[styles.title]}>Danh danh người dùng </Text>
                <FlatList style={[{ flex: 1 }]} data={chatActors} renderItem={renderItem} />
            </View>
            <View style={[{ flex: 1, padding: 10 }]}>
                <Text style={styles.title}>Danh danh đã chọn {check.length}</Text>
                <FlatList style={{ flex: 1 }} data={check} renderItem={renderItemChecked} />
            </View>
            <View style={styles.buttonBottom}>
                <TouchableOpacity style={styles.buttonNext} onPress={handleSubmitAddUser}>
                    <Text style={styles.titleNext}>Xác nhận</Text>
                </TouchableOpacity>
            </View>
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
        fontSize: 18,
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
        width: 40,
        height: 40,

        marginRight: 10,
    },
    image: {
        flex: 1,
        borderRadius: 100,
    },
    titleItem: {
        flex: 1,
        fontSize: 16,
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
