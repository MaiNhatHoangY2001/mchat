import { useContext, useEffect, useState } from 'react';
import {
    FlatList,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

// IMPORT ICON LINK ==> https://icons.expo.fyi/
import { Ionicons } from '@expo/vector-icons';
import { addGroupChat, getMsgsGroupChat } from '../../../../../redux/apiRequest/chatApiRequest';
import { getGroupChatSuccess, setIsGroupChat } from '../../../../../redux/groupChatSlice';
import { setSender } from '../../../../../redux/userSlice';
import { ChatContext } from '../../../../../context/ChatContext';
import { createAxios } from '../../../../../redux/createInstance';
import { loginSuccess } from '../../../../../redux/authSlice';

const Item = ({ item }) => (
    <TouchableOpacity style={[styles.item]}>
        <View style={styles.bgImage}>
            <Image
                style={styles.image}
                source={{
                    uri: item?.sender?.profileImg,
                }}
            />
        </View>
        <Text style={[styles.titleItem]}>{item?.sender?.profileName}</Text>
    </TouchableOpacity>
);

export default function MessageNewInforGroup({ navigation, route }) {
    const currentGroupChat = useSelector((state) => state.groupChat.groupChat?.actor);
    const currentUser = useSelector((state) => state.auth.login?.currentUser);

    const chatContext = useContext(ChatContext);
    const { sendText4JoinGroup } = chatContext;

    const dispatch = useDispatch();
    const accessToken = currentUser?.accessToken;
    let axiosJWT = createAxios(currentUser, dispatch, loginSuccess);

    const members = route.params.checked;

    const [image, setImage] = useState(
        'https://res.cloudinary.com/dpux6zwj3/image/upload/v1667061870/Avata/computer-science-1331579_1280_nomqbh.png',
    );
    const [nameGroup, setNameGroup] = useState('');

    const renderItem = ({ item }) => {
        return <Item item={item} />;
    };

    const handleCreateGroupChat = async (listFriend) => {
        if (listFriend.length > 1) {
            let name;
            if (nameGroup === '') {
                name = listFriend?.reduce((list, friend) => {
                    return `${list}, ${friend.sender.profileName}`;
                }, `${currentUser.profileName}`);
            } else name = nameGroup.trim();

            const isHaveGroupChat = currentGroupChat.some((group) => group.groupName === name);
            if (isHaveGroupChat) {
                console.log('Đã tồn tại nhóm');
            } else {
                const apiNewGroupChat = {
                    groupName: name,
                    chatStatus: '0',
                    user: [currentUser._id],
                    groupAdmin: currentUser._id,
                    newMsg: {
                        type_Msg: 0,
                        content: '',
                        imageContent: [],
                        profileName: currentUser?.profileName,
                    },
                };

                const newGroupChat = await addGroupChat(accessToken, dispatch, apiNewGroupChat, axiosJWT);
                dispatch(getGroupChatSuccess([...currentGroupChat, newGroupChat]));

                const sender = {
                    _id: newGroupChat._id,
                    profileName: newGroupChat.groupName,
                    profileImg: newGroupChat?.groupImage,
                };
                dispatch(setSender(sender));
                //reload chat when create new group
                const apiSent = {
                    groupId: newGroupChat._id,
                };
                getMsgsGroupChat(accessToken, dispatch, apiSent, axiosJWT);
                //send text join group to friend
                sendText4JoinGroup(listFriend, name, newGroupChat._id);
                dispatch(setIsGroupChat(true));
                navigation.navigate('MessageChat', { item: { sender } });
            }
        }
    };

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => handleCreateGroupChat(members)}>
                    <Ionicons name="checkmark" size={30} color="green" />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <View>
                <ScrollView style={{ borderBottomWidth: 10, borderBottomColor: '#c4c4c4' }}>
                    <View style={{ paddingVertical: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: 100, height: 100 }}>
                            <Image style={{ flex: 1 }} source={{ uri: image }} />
                        </View>
                        <TouchableOpacity
                            style={{
                                backgroundColor: 'blue',
                                padding: 10,
                                paddingHorizontal: 20,
                                marginTop: 20,
                                borderRadius: 50,
                            }}
                        >
                            <Text style={{ fontSize: 16, fontWeight: '600', color: 'white' }}>
                                Cập nhật ảnh đại diện
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bgInputText}>
                        <TextInput style={styles.textInput} placeholder="Nhập Tên Nhóm" />
                    </View>
                </ScrollView>
            </View>
            <View style={{ flex: 1, padding: 10 }}>
                <Text style={styles.title}>{members.length} Thành Viên</Text>
                <FlatList data={members} renderItem={renderItem} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },

    bgInputText: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    textInput: {
        fontSize: 16,
        paddingVertical: 4,
        paddingHorizontal: 20,

        width: '100%',

        borderWidth: 1,
        borderRadius: 50,
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
        width: 45,
        height: 45,

        marginRight: 10,
    },
    image: {
        flex: 1,
        borderRadius: 100,
    },
    titleItem: {
        fontSize: 18,
    },

    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});
