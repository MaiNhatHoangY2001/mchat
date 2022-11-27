import { useEffect, useState } from 'react';
import { FlatList, Modal, Pressable, Touchable } from 'react-native';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// IMPORT ICON LINK ==> https://icons.expo.fyi/
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '../../../../../redux/createInstance';
import { loginSuccess } from '../../../../../redux/authSlice';
import {
    deleteGroupChat,
    getListGroupChat,
    removeUserGroupChat,
    updateGroupChat,
} from '../../../../../redux/apiRequest/chatApiRequest';
import { setSender } from '../../../../../redux/userSlice';
import * as ImagePicker from 'expo-image-picker';
import { uploadFile } from '../../../../../redux/apiRequest/fileApiRequest';


export default function MessageInfoGroup({ navigation, route }) {
    const listGroupChat = useSelector((state) => state.groupChat?.groupChat.actor);
    const currentSender = useSelector((state) => state.user.sender?.user);

    const user = route.params.user;
    const currentUserId = user?._id;
    const accessToken = user?.accessToken;
    const dispatch = useDispatch();
    let axiosJWTLogin = createAxios(user, dispatch, loginSuccess);

    const [currentListGroupChat, setCurrentListGroupChat] = useState(listGroupChat);
    const [currentGroupChat, setCurrentGroupChat] = useState(
        currentListGroupChat.filter((groupChat) => groupChat.groupName === currentSender?.profileName)[0],
    );
    const [adminGroup, setAdminGroup] = useState(currentGroupChat?.groupAdmin._id);
    const [isListUser, setListUser] = useState(currentGroupChat?.user);

    const [groupName, setGroupName] = useState(currentGroupChat.groupName);

    // MODAL CHANGE IMAGE IN GROUP
    const [urlImage, setUrlImage] = useState("");
    const [image, setImage] = useState({});

    // modal open and close
    const [modalRemoveGroup, setModalRemoveGroup] = useState(false);
    const [modalLeaveGroup, setModalLeaveGroup] = useState(false);

    const [showFormEditName, SetFormEditName] = useState(false);

    const isAdmin = user._id === currentGroupChat.groupAdmin._id ? true : false;

    const handleRemoveUser = async (currentUser) => {
        setListUser(isListUser.filter((user) => user._id !== currentUser._id));
        const apiGroupChat = {
            idGroup: currentGroupChat._id,
            idUser: currentUser._id,
        };
        await removeUserGroupChat(accessToken, dispatch, apiGroupChat, axiosJWTLogin);
    };


    const handleSetKeyAdmin = async (userAdmin) => {
        setAdminGroup(userAdmin?._id);
        const apiSetAdmin = {
            groupAdmin: userAdmin,
        };
        await updateGroupChat(accessToken, dispatch, currentGroupChat._id, apiSetAdmin, axiosJWTLogin);
    };


    const configImageToFile = (files) => {
        let localUri = files.uri;
        let filename = localUri.split('/').pop();

        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        return { type: type, uri: localUri, name: filename };
    };

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [4, 3],
            base64: true,
            quality: 1,
        });

        // console.log(result);

        if (!result.cancelled) {
            const files = result;
            const file = configImageToFile(files);
            setUrlImage(file.uri);
            setImage(file);
        }
    };

    const handleClickApply = async () => {
        if (currentGroupChat.groupName !== groupName.trim()) {
            const apiSetGroupName = {
                groupName: groupName.trim(),
            };

            //update group name in chat
            const updateSenderName = {
                ...currentSender,
                profileName: groupName.trim(),
            };
            await dispatch(setSender(updateSenderName))
            await updateGroupChat(accessToken, dispatch, currentGroupChat._id, apiSetGroupName, axiosJWTLogin);
            getListGroupChat(accessToken, currentUserId, dispatch, axiosJWTLogin);
        }


        if (currentGroupChat?.groupImage !== urlImage) {
            //upload image to cloud
            const bodyFormData = new FormData();
            bodyFormData.append('file', image);
            const uploadImage = await uploadFile(accessToken, dispatch, axiosJWTLogin, bodyFormData);
            setUrlImage((uploadImage.url)[0]);


            window.setTimeout(async function () {
                //set group chat profile img
                const apiSetGroupProfileImg = {
                    groupImage: (uploadImage.url)[0],
                };

                //update group profile img in chat
                const updateSenderProfileImg = {
                    ...currentSender,
                    profileImg: (uploadImage.url)[0],
                };
                await dispatch(setSender(updateSenderProfileImg))


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
        navigation.goBack();
        // handleClose();
    };

    // EVENT OUT GROUP
    const handleOutGroup = async () => {
        const userOutGroup = {
            _id: currentUserId,
            profileName: user.profileName,
        };

        handleRemoveUser(userOutGroup);
        dispatch(setSender(null));
        await getListGroupChat(accessToken, currentUserId, dispatch, axiosJWTLogin);
        setModalLeaveGroup(!modalLeaveGroup);
        navigation.navigate('MessagesScreen');
    };

    // EVENT REMOVE GROUP
    const handleClickRemoveGroup = async () => {
        await deleteGroupChat(accessToken, dispatch, currentGroupChat._id, axiosJWTLogin);
        dispatch(setSender(null));
        await getListGroupChat(accessToken, currentUserId, dispatch, axiosJWTLogin);
        setModalLeaveGroup(!modalLeaveGroup);
        navigation.navigate('MessagesScreen');
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
                        <Ionicons name="close-circle" size={24} color="black" onPress={() => handleRemoveUser(item)} />
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
        setAdminGroup(currentGroupChat?.groupAdmin._id);
        setListUser(currentGroupChat?.user);
        setUrlImage(currentGroupChat?.groupImage);
    }, [currentListGroupChat]);



    return (
        <View style={styles.container}>
            <View style={{ borderBottomWidth: 10, borderBottomColor: '#c4c4c4', paddingTop: 20 }}>
                <View style={{ ustifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: 100, height: 100 }}>
                        <Image style={{ flex: 1 }} source={{ uri: urlImage || currentGroupChat.groupImage }} />
                    </View>
                    <TouchableOpacity
                        style={{
                            backgroundColor: 'blue',
                            padding: 10,
                            paddingHorizontal: 20,
                            marginTop: 10,
                            borderRadius: 50,
                        }}
                    >
                        <Text style={{ fontSize: 16, fontWeight: '600', color: 'white' }} onPress={pickImage}>Cập nhật ảnh đại diện</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20, paddingHorizontal: 20 }}>
                    {showFormEditName ? (
                        <>
                            <TextInput
                                style={{
                                    flex: 1,
                                    fontSize: 18,
                                    borderWidth: 1,
                                    paddingVertical: 4,
                                    paddingHorizontal: 20,
                                    borderRadius: 10,
                                    marginRight: 10,
                                }}
                                value={groupName}
                                onChangeText={setGroupName}
                                placeholder="Nhập Tên Nhóm"
                            />

                            <TouchableOpacity onPress={() => SetFormEditName(!showFormEditName)}>
                                <Ionicons name="close-circle" size={30} color="black" />
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            <Text style={{ fontSize: 20, marginRight: 10 }} numberOfLines={1}>
                                {groupName}
                            </Text>
                            <TouchableOpacity onPress={() => SetFormEditName(!showFormEditName)}>
                                <AntDesign name="edit" size={24} color="black" />
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </View>
            <View style={{ flex: 1, padding: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.title}>{isListUser.length} Thành Viên</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('AddUserToGroup', { currentGroupChat })}>
                        <AntDesign name="pluscircle" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <FlatList data={isListUser} renderItem={renderItem} />
            </View>
            <View
                style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: 10 }}
            >

                <TouchableOpacity
                    style={{ padding: 10, paddingHorizontal: 20, backgroundColor: 'green', borderRadius: 10 }}
                    onPress={() =>
                        handleClickApply()}
                >
                    <Text style={{ fontSize: 18, fontWeight: '600', color: 'white' }}>Xác nhận</Text>
                </TouchableOpacity>
                {isAdmin ? (
                    <>
                        <TouchableOpacity
                            style={{ padding: 10, paddingHorizontal: 20, backgroundColor: 'red', borderRadius: 10 }}
                            onPress={() => setModalRemoveGroup(!modalRemoveGroup)}
                        // onPress={() => handleClickRemoveGroup()}
                        >
                            <Text style={{ fontSize: 18, fontWeight: '600', color: 'white' }}>Xóa nhóm</Text>
                        </TouchableOpacity>


                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalRemoveGroup}
                            onRequestClose={() => {
                                setModalRemoveGroup(!modalRemoveGroup);
                            }}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Text style={styles.modalText}>Xác nhận xóa nhóm</Text>
                                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                        <Pressable
                                            style={[
                                                styles.button,
                                                styles.buttonClose,
                                                { marginHorizontal: 10, backgroundColor: 'red' },
                                            ]}
                                            onPress={() => setModalRemoveGroup(!modalRemoveGroup)}
                                        >
                                            <Text style={[styles.textStyle, { marginHorizontal: 10 }]}>Thoát</Text>
                                        </Pressable>
                                        <Pressable
                                            style={[styles.button, styles.buttonClose, { marginHorizontal: 10 }]}
                                            onPress={() => handleClickRemoveGroup()}
                                        >
                                            <Text style={[styles.textStyle, { marginHorizontal: 10 }]}>Xác nhận</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    </>
                ) : (
                    <>
                        <TouchableOpacity
                            style={{ padding: 10, paddingHorizontal: 20, backgroundColor: 'blue', borderRadius: 10 }}
                            // onPress={() => handleOutGroup()}
                            onPress={() => setModalLeaveGroup(!modalLeaveGroup)}
                        >
                            <Text style={{ fontSize: 18, fontWeight: '600', color: 'white' }}>Rời nhóm</Text>
                        </TouchableOpacity>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalLeaveGroup}
                            onRequestClose={() => {
                                setModalLeaveGroup(!modalLeaveGroup);
                            }}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Text style={styles.modalText}>Xác nhận rời nhóm</Text>
                                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                        <Pressable
                                            style={[
                                                styles.button,
                                                styles.buttonClose,
                                                { marginHorizontal: 10, backgroundColor: 'red' },
                                            ]}
                                            onPress={() => setModalLeaveGroup(!modalLeaveGroup)}
                                        >
                                            <Text style={[styles.textStyle, { marginHorizontal: 10 }]}>Thoát</Text>
                                        </Pressable>
                                        <Pressable
                                            style={[styles.button, styles.buttonClose, { marginHorizontal: 10 }]}
                                            onPress={() => handleOutGroup()}
                                        >
                                            <Text style={[styles.textStyle, { marginHorizontal: 10 }]}>Xác nhận</Text>
                                        </Pressable>

                                    </View>
                                </View>
                            </View>
                        </Modal>
                    </>
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
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    textInput: {
        fontSize: 20,
        paddingVertical: 4,
        paddingHorizontal: 20,

        width: '100%',
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

    modalView: {
        margin: 20,
        marginVertical: '100%',
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
        fontSize: 16,
        marginBottom: 15,
        textAlign: 'center',
    },
});
