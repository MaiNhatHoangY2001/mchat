import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// IMPORT ICON LINK ==> https://icons.expo.fyi/
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '../../../../../redux/createInstance';
import { loginSuccess } from '../../../../../redux/authSlice';
import { updateGroupChat } from '../../../../../redux/apiRequest/chatApiRequest';



export default function MessageInfoGroup({ navigation, route }) {
    const listGroupChat = useSelector((state) => state.groupChat?.groupChat.actor);
    const currentSender = useSelector((state) => state.user.sender?.user);


    const user = route.params.user;
    const accessToken = user?.accessToken;
    const dispatch = useDispatch();
    let axiosJWTLogin = createAxios(user, dispatch, loginSuccess);





    const [currentListGroupChat, setCurrentListGroupChat] = useState(listGroupChat);
    const [currentGroupChat, setCurrentGroupChat] = useState(
        currentListGroupChat.filter((groupChat) => groupChat.groupName === currentSender?.profileName)[0],
    );
    const [changeNameGroup, setChangeNameGroup] = useState(currentGroupChat?.groupName);
    const [adminGroup, setAdminGroup] = useState(currentGroupChat?.groupAdmin._id);
    const [isListUser, setListUser] = useState(currentGroupChat?.user);

    const [groupName, setGroupName] = useState(currentGroupChat.groupName);

    // MODAL CHANGE IMAGE IN GROUP
    const [urlImage, setUrlImage] = useState(currentGroupChat?.groupImage);
    const [image, setImage] = useState({});



    const isAdmin = user._id === currentGroupChat.groupAdmin._id ? true : false;

    const handleRemoveUser = (item) => async () => {
        setListUser(isListUser.filter((user) => user._id !== item._id));
        const apiGroupChat = {
            idGroup: currentGroupChat._id,
            idUser: item._id,
        };
        await removeUserGroupChat(accessToken, dispatch, apiGroupChat, axiosJWTLogin);
    };

    const setNameGroup = (event) => {
        setChangeNameGroup(event.target.value);
    };

    const handleSetKeyAdmin = async (userAdmin) => {
        setAdminGroup(userAdmin?._id);
        const apiSetAdmin = {
            groupAdmin: userAdmin,
        };
        await updateGroupChat(accessToken, dispatch, currentGroupChat._id, apiSetAdmin, axiosJWTLogin);

    };

    const handleClickApply = async () => {
        if (currentGroupChat.groupName !== changeNameGroup.trim()) {
            const apiSetGroupName = {
                groupName: changeNameGroup.trim(),
            };

            //update group name in chat
            const updateSenderName = {
                ...currentSender,
                profileName: changeNameGroup.trim(),
            };
            setCurrentSender(updateSenderName);
            await updateGroupChat(accessToken, dispatch, currentGroupChat._id, apiSetGroupName, axiosJWTLogin);
            getListGroupChat(accessToken, currentUserId, dispatch, axiosJWTLogin);
        }

        if (currentGroupChat?.groupImage !== urlImage) {
            //upload image to cloud
            const bodyFormData = new FormData();
            bodyFormData.append('file', image);
            const uploadImage = await uploadFile(accessToken, dispatch, axiosJWTLogin, bodyFormData);
            setUrlImage(uploadImage.url);

            window.setTimeout(async function () {
                //set group chat profile img
                const apiSetGroupProfileImg = {
                    groupImage: uploadImage.url[0],
                };

                //update group profile img in chat
                const updateSenderProfileImg = {
                    ...currentSender,
                    profileImg: uploadImage.url,
                };
                await setCurrentSender(updateSenderProfileImg);

                await updateGroupChat(
                    accessToken,
                    dispatch,
                    currentGroupChat._id,
                    apiSetGroupProfileImg,
                    axiosJWTLogin,
                );

                getListGroupChat(accessToken, currentUserId, dispatch, axiosJWTLogin);
            }, 1000);
        }

        handleClose();
    };



    const handleChangeImageGroup = (event) => {
        if (event.target.files && event.target.files[0]) {
            setUrlImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
        }
    };

    // EVENT OUT GROUP
    const handleOutGroup = () => {
        const userOutGroup = {
            _id: currentUserId,
            profileName: user.profileName,
        };

        handleRemoveUser(userOutGroup)();
        dispatch(setSender(null));
        dispatch(getListGroupChat(accessToken, currentUserId, dispatch, axiosJWTLogin));
        handleClose();
    };

    // EVENT REMOVE GROUP
    const handleClickRemoveGroup = async () => {
        await deleteGroupChat(accessToken, dispatch, currentGroupChat._id, axiosJWTLogin);
        dispatch(setSender(null));
        await getListGroupChat(accessToken, currentUserId, dispatch, axiosJWTLogin);
        handleClose();
    };

    const renderItem = ({ item }) => {
        return <Item item={item} idAdmin={currentGroupChat.groupAdmin._id} isAdmin={isAdmin} user={user} />;
    };

    const Item = ({ item, idAdmin, isAdmin, user }) => (
        <View style={[styles.item]}>
            <View style={styles.bgImage}>
                <Image
                    style={styles.image}
                    source={{
                        uri: item.profileImg,
                    }}
                />
            </View>
            <Text style={[styles.titleItem]}>
                {item.profileName} <Text style={{ fontSize: 14 }}>{idAdmin === item._id ? ' (Nhóm trưởng)' : ''}</Text>
            </Text>
            {isAdmin && user?._id !== item._id ? (
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => handleSetKeyAdmin(item)}>
                        <Ionicons name="key" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginLeft: 10 }}>
                        <Ionicons name="close-circle" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            ) : (
                <></>
            )}
        </View>
    );

    useEffect(() => {
        setCurrentGroupChat(
            currentListGroupChat.filter((groupChat) => groupChat.groupName === currentSender?.profileName)[0],
        );
        setChangeNameGroup(currentGroupChat?.groupName);
        setAdminGroup(currentGroupChat?.groupAdmin._id);
        setListUser(currentGroupChat?.user);
        setUrlImage(currentGroupChat?.groupImage);
    }, [currentListGroupChat, currentGroupChat]);

    return (
        <View style={styles.container}>
            <View>
                <ScrollView style={{ borderBottomWidth: 10, borderBottomColor: '#c4c4c4' }}>
                    <View style={{ paddingVertical: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: 100, height: 100 }}>
                            <Image style={{ flex: 1 }} source={{ uri: currentGroupChat.groupImage }} />
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
                        <TextInput
                            value={groupName}
                            onChangeText={setGroupName}
                            style={styles.textInput}
                            placeholder="Nhập Tên Nhóm"
                        />
                    </View>
                </ScrollView>
            </View>
            <View style={{ flex: 1, padding: 10 }}>
                <Text style={styles.title}>{isListUser.length} Thành Viên</Text>
                <FlatList data={isListUser} renderItem={renderItem} />
            </View>
            <View
                style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: 10 }}
            >
                {isAdmin ? (
                    <TouchableOpacity
                        style={{ padding: 10, paddingHorizontal: 20, backgroundColor: 'red', borderRadius: 10 }}
                    >
                        <Text style={{ fontSize: 18, fontWeight: '600', color: 'white' }}>Xóa nhóm</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        style={{ padding: 10, paddingHorizontal: 20, backgroundColor: 'blue', borderRadius: 10 }}
                    >
                        <Text style={{ fontSize: 18, fontWeight: '600', color: 'white' }}>Rời nhóm</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        fontSize: 18,
    },
});
