import { useState, useEffect } from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// IMPORT ICON LINK ==> https://icons.expo.fyi/
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { searchUser } from '../../../../../redux/apiRequest/userApiRequest';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../../../../../redux/authSlice';
import { createAxios } from '../../../../../redux/createInstance';
import { setSender } from '../../../../../redux/userSlice';
import { setIsGroupChat } from '../../../../../redux/groupChatSlice';
import { getMsgs } from '../../../../../redux/apiRequest/chatApiRequest';




export default function MessageSearch({ navigation }) {

    const currentUser = useSelector((state) => state.auth.login?.currentUser);
    const currentSearch = useSelector((state) => state.user.users?.allUsers);

    const dispatch = useDispatch();
    const accessToken = currentUser?.accessToken;

    let axiosJWT = createAxios(currentUser, dispatch, loginSuccess);


    const [textSearch, setTextSearch] = useState('');
    const [usersSearch, setUsersSearch] = useState([]);


    const handleGetUser = (sender) => {
        const actor = { sender: currentUser._id, user: sender._id };

        getMsgs(currentUser.accessToken, dispatch, actor, axiosJWT);
        dispatch(setSender(sender));
        dispatch(setIsGroupChat(false));
        navigation.navigate('MessageChat', { item: { sender } });
    };

    const Item = ({ item }) => (
        <TouchableOpacity style={[styles.item]} onPress={() => handleGetUser(item)}>
            <View style={styles.bgImage}>
                <Image
                    style={styles.image}
                    source={{
                        uri: item?.profileImg,
                    }}
                />
            </View>
            <Text style={[styles.title]}>{item?.profileName}</Text>
        </TouchableOpacity>
    );


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

    useEffect(() => {
        const search = textSearch === '' ? '@' : textSearch;
        searchUser(accessToken, dispatch, search, axiosJWT);
        if (currentSearch !== null) {
            setUsersSearch(currentSearch?.filter((user) => user?.profileName !== currentUser?.profileName));
        }
    }, [textSearch]);

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

            <FlatList style={{ width: '100%' }} data={usersSearch} renderItem={renderItem} />
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
