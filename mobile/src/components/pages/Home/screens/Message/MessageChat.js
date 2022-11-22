import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '../../../../../redux/createInstance';
import { loginSuccess } from '../../../../../redux/authSlice';
import {
    Button,
    Image,
    ImageBackground,
    Keyboard,
    KeyboardAvoidingView,
    SafeAreaView,
    ScrollView,
    ScrollViewBase,
    ScrollViewComponent,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

import { uploadFile } from '../../../../../redux/apiRequest/fileApiRequest';

import { UserContext } from '../../../../../context/UserContext';
import { ChatContext } from '../../../../../context/ChatContext';
import { TYPE_IMG, TYPE_MSG, TYPE_NOTIFICATION } from '../../../../../context/TypeChat';
import { setSender } from '../../../../../redux/userSlice';

import * as ImagePicker from 'expo-image-picker';

import {
    addUserGroupChat,
    deleteGroupChat,
    getListGroupChat,
    getMsgs,
    getMsgsGroupChat,
    removeUserGroupChat,
    updateGroupChat,
    updateMsg,
} from '../../../../../redux/apiRequest/chatApiRequest';
import styles from './MessageChat_Styles';
// import LoadingChat from './LoadingChat';

export default function MessageChat({ navigation, route }) {
    const dataSender = route.params.item;
    const isUser = route.params.item.sender === undefined ? false : true;

    const user = useSelector((state) => state.auth.login?.currentUser);
    const sender = useSelector((state) => state.user.sender?.user);
    const chat = useSelector((state) => state.chat.message?.content);
    const individualChat = useSelector((state) => state.chat.individualChat);
    const isGroupChat = useSelector((state) => state.groupChat?.groupChat.isGroupChat);
    const listGroupChat = useSelector((state) => state.groupChat?.groupChat.actor);
    // const urlImage = useSelector((state) => state.file?.upload?.url.url);

    const chatContext = useContext(ChatContext);
    const createChat = chatContext.createChat;
    const setSendData = chatContext.setSendData;
    const sendData = chatContext.sendData;
    const setIndividualChatId = chatContext.setIndividualChatId;

    const userContext = useContext(UserContext);
    const setActiveUser = userContext.setActiveUser;

    const bottomRef = useRef(null);

    const [currentSender, setCurrentSender] = useState(sender);

    const [currentListGroupChat, setCurrentListGroupChat] = useState(listGroupChat);
    const [currentGroupChat, setCurrentGroupChat] = useState(
        currentListGroupChat.filter((groupChat) => groupChat.groupName === currentSender?.profileName)[0],
    );
    const [changeNameGroup, setChangeNameGroup] = useState(currentGroupChat?.groupName);
    const [adminGroup, setAdminGroup] = useState(currentGroupChat?.groupAdmin._id);
    const [isListUser, setListUser] = useState(currentGroupChat?.user);

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');

    const dispatch = useDispatch();

    const currentUserId = user?._id;
    const currentSenderId = currentSender?._id;
    const accessToken = user?.accessToken;

    const scrollViewRef = useRef();

    let axiosJWTLogin = createAxios(user, dispatch, loginSuccess);

    const handleOpen = async () => {
        setOpen(true);
        const list = await getListGroupChat(accessToken, currentUserId, dispatch, axiosJWTLogin);
        setCurrentListGroupChat(list);
    };
    const handleClose = async () => {
        setOpen(false);
    };

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

    const handleSetKeyAdmin = (userAdmin) => async () => {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message !== '') {
            createChat(TYPE_MSG, message, []);
            setMessage('');
        }
    };

    const addMsgImgWithInfo = (url) => {
        createChat(TYPE_IMG, '', url);
    };

    const convertTime = (time) => {
        const formattedDate = moment(time).utcOffset('+0700').format('HH:mm DD [tháng] MM, YYYY');

        return formattedDate;
    };
    //POP THE EMOJI PICKER UP
    const [inputStr, setInputStr] = useState('');
    const [showPicker, setShowPicker] = useState(false);
    const emojiPicker = (event, emojiObject) => {
        setInputStr((prevInput) => prevInput + emojiObject.emoji);
        setShowPicker(false);
    };

    const [isMessageQuestion, setMessageQuestion] = useState('');

    const typeChat = (type, mess) => {
        switch (type) {
            case TYPE_MSG:
                return <Text style={styles.chatText}>{mess.message.content}</Text>;
            case TYPE_IMG:
                return imgChat(mess.message?.imageContent.length, mess.message?.imageContent);
            case TYPE_NOTIFICATION:
                const content = mess.message.content;
                const question = content.split('/');
                if (mess.sender === currentUserId)
                    return <Text style={styles.chatText}>Bạn đã gửi tin nhắn tham gia nhóm</Text>;
                else
                    return formQuestion(
                        question,
                        isMessageQuestion === '' ? question[1] : isMessageQuestion,
                        mess.message._id,
                    );
            default:
                return <></>;
        }
    };

    const formQuestion = (question, key, id) => {
        switch (key) {
            case 'Y':
                return <Text style={styles.chatText}>Bạn đã tham gia nhóm gì đó ....</Text>;
            case 'N':
                return <Text style={styles.chatText}>Bạn từ chối đã tham gia nhóm gì đó ....</Text>;
            case '=':
                return (
                    <View>
                        <Text style={styles.chatText}>{question[0]}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Button size="small" onPress={() => handleAnswer(question, 'Y', id)} title={'có'} />

                            <Button size="small" onPress={() => handleAnswer(question, 'N', id)} title={'Không'} />
                        </View>
                    </View>
                );
            default:
                return <></>;
        }
    };

    const handleAnswer = async (question, answer, id) => {
        setMessageQuestion(answer);
        const newAnswer = question[0] + '/' + answer + '/' + question[2];
        const content = {
            content: newAnswer,
        };
        if (answer === 'Y') {
            const apiGroupChat = {
                idGroup: question[2],
                idUser: currentUserId,
            };
            await addUserGroupChat(accessToken, dispatch, apiGroupChat, axiosJWTLogin);
            await getListGroupChat(accessToken, currentUserId, dispatch, axiosJWTLogin);
        }
        updateMsg(accessToken, dispatch, id, content, axiosJWTLogin);
    };

    const imgChat = (length, images) => {
        const chatImage = (srcGroup) => (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                {images?.map((img, index) => {
                    return (
                        <View key={index} style={{ width: 300 / 3, height: 300 / 3 }}>
                            <Image style={{ flex: 1, margin: 2 }} alt="not fount" source={{ uri: img + srcGroup }} />
                        </View>
                    );
                })}
            </View>
        );

        if (length > 0) {
            switch (length) {
                case 1:
                    return chatImage('');
                default:
                    return (
                        <View
                        // className={cx('groupImage')}
                        >
                            {chatImage('?w=164&h=164&fit=crop&auto=format')}
                        </View>
                    );
            }
        } else return <Image alt="not fount" width={'20px'} source={''} />;
    };

    // MODAL CHANGE IMAGE IN GROUP
    const [urlImage, setUrlImage] = useState(currentGroupChat?.groupImage);
    const [image, setImage] = useState({});
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

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [4, 3],
            base64: true,
            quality: 1,
            allowsMultipleSelection: true,
        });

        // console.log(result);

        if (!result.cancelled) {
            const files = result;
            const bodyFormData = new FormData();
            if (files.uri !== undefined) {
                bodyFormData.append('file', configImageToFile(files));
            } else {
                if (files.selected.length > 0) {
                    for (const element of files.selected) bodyFormData.append('file', configImageToFile(element));
                }
            }

            const uploadImage = await uploadFile(accessToken, dispatch, axiosJWTLogin, bodyFormData);
            window.setTimeout(async function () {
                //wait upload image on google cloud
                await addMsgImgWithInfo(uploadImage.url);
            }, 1000);
        }
    };

    const configImageToFile = (files) => {
        let localUri = files.uri;
        let filename = localUri.split('/').pop();

        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        return { type: type, uri: localUri, name: filename };
    };

    useEffect(() => {
        setIndividualChatId(individualChat.idChat);
    }, [individualChat.idChat]);

    useEffect(() => {
        setSendData(chat);
    }, [chat]);

    useEffect(() => {
        setCurrentSender(sender);
    }, [sender]);

    useEffect(() => {
        // 👇️ scroll to bottom every time messages change
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [sendData]);

    useEffect(() => {
        setCurrentGroupChat(
            currentListGroupChat.filter((groupChat) => groupChat.groupName === currentSender?.profileName)[0],
        );
        setChangeNameGroup(currentGroupChat?.groupName);
        setAdminGroup(currentGroupChat?.groupAdmin._id);
        setListUser(currentGroupChat?.user);
        setUrlImage(currentGroupChat?.groupImage);
    }, [currentListGroupChat, currentGroupChat]);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <View style={styles.profileSender}>
                    <View style={styles.avata}>
                        {isUser ? (
                            <Image style={styles.image} source={{ uri: dataSender.sender.profileImg }} />
                        ) : (
                            <Image style={styles.image} source={{ uri: dataSender.groupImage }} />
                        )}
                    </View>
                    <View style={styles.textContent}>
                        <Text style={styles.name}>{isUser ? dataSender.sender.profileName : dataSender.groupName}</Text>
                        <Text style={styles.active}>Online</Text>
                    </View>
                </View>
            ),
        });
    }, [navigation]);

    return (
        <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }} enabled>
            <ImageBackground
                style={styles.container}
                resizeMode="cover"
                source={{
                    uri: 'https://res.cloudinary.com/dpux6zwj3/image/upload/v1667673550/Avata/bgcolor_t3meet.png',
                }}
            >
                <ScrollView
                    style={{ flex: 1 }}
                    ref={scrollViewRef}
                    onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
                >
                    <View style={[styles.chatAvata]}>
                        {isUser ? (
                            <Image style={styles.chatImage} source={{ uri: dataSender.sender.profileImg }} />
                        ) : (
                            <Image style={styles.chatImage} source={{ uri: dataSender.groupImage }} />
                        )}
                    </View>
                    <View style={styles.contentChat}>
                        {sendData?.map((mess, index) => {
                            const nameSender = mess.message.userGroupChat?.profileName || currentSender?.profileName;
                            const nameUser = user?.profileName;
                            const isUser = mess.sender === currentUserId;

                            return (
                                <React.Fragment key={index}>
                                    <View style={isUser ? styles.user : styles.sender}>
                                        <Image
                                            style={isUser ? styles.userImage : styles.senderImage}
                                            source={{
                                                uri: isGroupChat
                                                    ? mess.message.userGroupChat?.profileImg
                                                    : isUser
                                                    ? currentSender?.profileImg
                                                    : currentSender?.profileImg,
                                            }}
                                        />
                                        <View style={styles.contain}>
                                            <Text style={styles.chatName}>
                                                {mess.sender === currentUserId ? nameUser : nameSender}
                                            </Text>
                                            {typeChat(mess.message?.type_Msg, mess)}
                                        </View>
                                    </View>
                                </React.Fragment>
                            );
                        })}
                    </View>
                </ScrollView>
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.Button} onPress={pickImage}>
                        <Text>icon</Text>
                    </TouchableOpacity>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Nhập gì đi cha"
                        onChangeText={(value) => setMessage(value)}
                        value={message}
                    />
                    <TouchableOpacity style={styles.Button} onPress={handleSubmit}>
                        <Text>Send</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </KeyboardAvoidingView>
    );
}
