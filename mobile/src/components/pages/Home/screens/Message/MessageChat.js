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
import { TYPE_FILE, TYPE_IMG, TYPE_MSG, TYPE_NOTIFICATION, TYPE_REMOVE_MSG } from '../../../../../context/TypeChat';
import { setSender } from '../../../../../redux/userSlice';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { Ionicons } from '@expo/vector-icons';

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
import { FontAwesome } from '@expo/vector-icons';
// import LoadingChat from './LoadingChat';

export default function MessageChat({ navigation, route }) {
    const dataSender = route.params.item;
    const isUser = route.params.item.sender === undefined ? false : true;

    const user = useSelector((state) => state.auth.login?.currentUser);
    const sender = useSelector((state) => state.user.sender?.user);
    const chat = useSelector((state) => state.chat.message?.content);
    const individualChat = useSelector((state) => state.chat.individualChat);
    const isGroupChat = useSelector((state) => state.groupChat?.groupChat.isGroupChat);
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



    const [open, setOpen] = useState(false);

    const [message, setMessage] = useState('');

    const dispatch = useDispatch();

    const currentUserId = user?._id;
    const currentSenderId = currentSender?._id;
    const accessToken = user?.accessToken;

    const scrollViewRef = useRef();

    let axiosJWTLogin = createAxios(user, dispatch, loginSuccess);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return isGroupChat ? (
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate('MessageInfoGroup', {
                                user: user,
                            })
                        }
                    >
                        <Ionicons name="menu" size={24} color="black" />
                    </TouchableOpacity>
                ) : (
                    <></>
                );
            },
        });
    }, [navigation]);



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
            case TYPE_REMOVE_MSG:
                return <Text style={[styles.chatText, { opacity: 0.4 }]}>{mess.message.content}</Text>;
            case TYPE_FILE:
                return fileChat(mess?.message?.imageContent);
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

    const addMsgFileWithInfo = (url) => {
        createChat(TYPE_FILE, '', url);
    }


    const pickFile = async () => {
        // No permissions request is necessary for launching the image library
        let result = await DocumentPicker.getDocumentAsync({});


        const bodyFormData = new FormData();
        bodyFormData.append('file', { type: result?.mimeType, uri: result?.uri, name: result?.name });


        const uploadImage = await uploadFile(accessToken, dispatch, axiosJWTLogin, bodyFormData);
        window.setTimeout(async function () {
            //wait upload image on google cloud
            await addMsgFileWithInfo(uploadImage.url);
        }, 1000);
    };

    const fileChat = (url) => {
        const stringUrl = `${url}`;

        const fileName = stringUrl?.replace("https://storage.googleapis.com/cloud-storage-mchat/", "");


        return <View
        >
            <Text>{fileName}</Text>
            <Button
                title="Download"
                onPress={() => {
                    makeDowload(url);
                }} />
        </View>
    }

    const makeDowload = async (url) => {
        const downloadInstance = FileSystem.createDownloadResumable(
            url,
            FileSystem.documentDirectory + "file.pdf"
        );

        await downloadInstance.downloadAsync();
    }

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
                        <Ionicons name="image" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.Button} onPress={pickFile}>
                        <FontAwesome name="file-text" size={20} color="black" />
                    </TouchableOpacity>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Aa"
                        onChangeText={(value) => setMessage(value)}
                        value={message}
                    />
                    <TouchableOpacity style={styles.Button} onPress={handleSubmit}>
                        <Ionicons name="send" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </KeyboardAvoidingView>
    );
}
