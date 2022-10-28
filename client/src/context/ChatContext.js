import { createContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { addIndividualChat4NewUser, addMessage, getListIndividualChat } from '../redux/apiRequest/chatApiRequest';
import { loginSuccess } from '../redux/authSlice';
import { createAxios, url } from '../redux/createInstance';

const ChatContext = createContext();

function ChatContextProvider({ children }) {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const sender = useSelector((state) => state.user.sender?.user);
    const isGroupChat = useSelector((state) => state.groupChat?.groupChat.isGroupChat);

    const dispatch = useDispatch();
    const socket = useRef();

    const currentUserId = user?._id;
    const currentSenderId = sender?._id;
    const accessToken = user?.accessToken;

    let axiosJWTLogin = createAxios(user, dispatch, loginSuccess);

    const [individualChatId, setIndividualChatId] = useState('');

    const [sendData, setSendData] = useState([
        {
            type_Msg: null,
            sender: null,
            message: {
                content: null,
                time: null,
                imageContent: [],
            },
        },
    ]);

    const createChat = (typeChat, mess, imageContent, individualId = individualChatId, groupChat = isGroupChat) => {
        const time = new Date();
        const newChat = {
            sender: currentUserId,
            receiver: currentSenderId,
            message: {
                type_Msg: typeChat,
                content: mess,
                imageContent: imageContent,
                time: time,
                userGroupChat: {
                    _id: currentUserId,
                    profileName: user.profileName,
                },
            },
            isNewChat: false,
            isGroupChat: groupChat,
            senderName: sender.profileName,
        };

        if (sendData.length <= 0) {
            newChat.isNewChat = true;
        }

        addMsg(typeChat, mess, imageContent, individualId, groupChat);

        socket.current.emit('on-chat', newChat);
        //delete receiver property
        delete newChat.receiver;
        delete newChat.isNewChat;
        delete newChat.senderName;
        delete newChat.isGroupChat;
        delete newChat.userGroupChat;
        //add chat on content
        setSendData((prev) => [...prev, newChat]);
    };

    const addMsg = (typeChat, mess, imageContent, individualId, isGroupChat) => {
        if (!isGroupChat) {
            if (sendData.length <= 0) {
                addChat4NewUser(typeChat, mess, imageContent);
            } else {
                addMsgWithInfo(typeChat, mess, imageContent, individualId);
            }
        } else {
            addMsgWithInfoGroupChat(typeChat, mess, imageContent);
        }
    };

    //
    const addChat4NewUser = (typeChat, mess, imageContent) => {
        const msg = {
            type_Msg: typeChat,
            content: mess,
            imageContent: imageContent,
        };
        const indiviSender = {
            sender: currentUserId,
            status: 'Active',
            chatStatus: 0,
            user: currentSenderId,
        };
        const indiviUser = {
            sender: currentSenderId,
            status: 'Active',
            chatStatus: 0,
            user: currentUserId,
        };

        addIndividualChat4NewUser(accessToken, msg, indiviUser, indiviSender, dispatch, axiosJWTLogin);
        window.setTimeout(function () {
            //add chat finish before get one second
            getListIndividualChat(accessToken, currentUserId, dispatch, axiosJWTLogin);
        }, 1000);
    };

    const addMsgWithInfoGroupChat = (typeChat, mess, imageContent) => {
        const msg = {
            type_Msg: typeChat,
            content: mess,
            imageContent: imageContent,
            groupChat: currentSenderId,
            userGroupChat: currentUserId,
        };

        addMessage(msg, accessToken, dispatch, axiosJWTLogin);
    };

    const addMsgWithInfo = (typeChat, mess, imageContent, individualId) => {
        const msg = {
            type_Msg: typeChat,
            content: mess,
            imageContent: imageContent,
            individualChat: individualId,
        };
        addMessage(msg, accessToken, dispatch, axiosJWTLogin);
    };

    //SOCKET CHAT
    useEffect(() => {
        const handler = (chatMessage) => {
            if (chatMessage.isNewChat) {
                window.setTimeout(function () {
                    //add chat finish before get one second
                    getListIndividualChat(accessToken, currentUserId, dispatch, axiosJWTLogin);
                }, 1000);
            }

            if (chatMessage.isGroupChat) {
                if (chatMessage.receiver === currentSenderId && chatMessage.sender !== currentUserId) {
                    setSendData((prev) => {
                        return [...prev, chatMessage];
                    });
                }
            } else {
                if (chatMessage.sender === currentSenderId && chatMessage.receiver === currentUserId) {
                    setSendData((prev) => {
                        return [...prev, chatMessage];
                    });
                }
            }

            // //displaying a notification
            // if (chatMessage.receiver === currentUserId) {
            //     Push.create(chatMessage.senderName, {
            //         body: chatMessage.message.content,
            //         silent: true,
            //     });
            //     Push.clear();
            // }
        };
        if (user?.accessToken) {
            socket.current = io(url, {
                'Access-Control-Allow-Credentials': true,
            });

            socket.current.on('user-chat', handler);
            return () => socket.current.off('user-chat', handler);
        }
    }, [sendData]);

    const contextValue = {
        createChat,
        setIndividualChatId,
        sendData,
        setSendData,
        individualChatId,
    };

    return <ChatContext.Provider value={contextValue}>{children}</ChatContext.Provider>;
}

export { ChatContextProvider, ChatContext };
