import classNames from 'classnames/bind';
import styles from '../Content.module.scss';
import 'react-loading-skeleton/dist/skeleton.css';
import io from 'socket.io-client';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios, url } from '../../../../redux/createInstance';
import { loginSuccess, logoutSuccess } from '../../../../redux/authSlice';
import {
    addIndividualChat4NewUser,
    addMessage,
    getListIndividualChat,
    getMsgs,
    getMsgsGroupChat,
} from '../../../../redux/apiRequest/chatApiRequest';
import { popupCenter } from '../PopupCenter';
import LoadingChat from '../../Loading/LoadingChat';
import { uploadFile } from '../../../../redux/apiRequest/fileApiRequest';
import Push from 'push.js';
import moment from 'moment';
import Data from './DataHeaderButtonChat';
import ReactTooltip from 'react-tooltip';
import Picker from 'emoji-picker-react';
import { ImageList, ImageListItem } from '@mui/material';

const cx = classNames.bind(styles);

const TYPE_MSG = 0;
const TYPE_IMG = 1;

function Chat({ setRightBar }) {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const sender = useSelector((state) => state.user.sender?.user);
    const chat = useSelector((state) => state.chat.message?.content);
    const individualChat = useSelector((state) => state.chat.individualChat);
    const isGroupChat = useSelector((state) => state.groupChat?.groupChat.isGroupChat);
    // const urlImage = useSelector((state) => state.file?.upload?.url.url);

    const socket = useRef();
    const bottomRef = useRef(null);

    const [individualChatId, setIndividualChatId] = useState('');
    const [message, setMessage] = useState('');
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

    const itemData = [
        {
            img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
            title: 'Breakfast',
        },
        {
            img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
            title: 'Burger',
        },
        {
            img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
            title: 'Camera',
        },
        {
            img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
            title: 'Coffee',
        },
        // {
        //     img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
        //     title: 'Hats',
        // },
        // {
        //     img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
        //     title: 'Honey',
        // },
        // {
        //     img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
        //     title: 'Basketball',
        // },
        // {
        //     img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
        //     title: 'Fern',
        // },
        // {
        //     img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
        //     title: 'Mushrooms',
        // },
        // {
        //     img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
        //     title: 'Tomato basil',
        // },
        // {
        //     img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
        //     title: 'Sea star',
        // },
        // {
        //     img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
        //     title: 'Bike',
        // },
    ];

    const dispatch = useDispatch();

    const currentUserId = user?._id;
    const currentSenderId = sender?._id;
    const accessToken = user?.accessToken;

    let axiosJWTLogin = createAxios(user, dispatch, loginSuccess);

    const callPopupFunction = () => {
        popupCenter({ url: '../call', title: 'xtf', w: 500, h: 650 });
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

    const createChat = (typeChat, mess, imageContent) => {
        const time = new Date();
        const newChat = {
            sender: currentUserId,
            receiver: currentSenderId,
            message: {
                type_Msg: typeChat,
                content: mess,
                imageContent: imageContent,
                time: time,
            },
            isNewChat: false,
            isGroupChat: isGroupChat,
            senderName: sender.profileName,
        };

        if (sendData.length <= 0) {
            newChat.isNewChat = true;
        }

        addMsg(typeChat, mess, imageContent);

        socket.current.emit('on-chat', newChat);
        //delete receiver property
        delete newChat.receiver;
        delete newChat.isNewChat;
        delete newChat.senderName;
        delete newChat.isGroupChat;
        //add chat on content
        setSendData((prev) => [...prev, newChat]);
    };

    const addMsg = (typeChat, mess, imageContent) => {
        if (!isGroupChat) {
            if (sendData.length <= 0) {
                addChat4NewUser(typeChat, mess, imageContent);
            } else {
                addMsgWithInfo(typeChat, mess, imageContent);
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

    const addMsgWithInfo = (typeChat, mess, imageContent) => {
        const msg = {
            type_Msg: typeChat,
            content: mess,
            imageContent: imageContent,
            individualChat: individualChatId,
        };

        addMessage(msg, accessToken, dispatch, axiosJWTLogin);
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
    //SAVE MSG WHEN RELOAD PAGE
    useEffect(() => {
        if (!isGroupChat) {
            const apiSent = {
                sender: currentSenderId,
                user: currentUserId,
            };
            if (window.performance) {
                if (performance.navigation.type == 1) {
                    getMsgs(accessToken, dispatch, apiSent, axiosJWTLogin);
                }
            }
        } else {
            const apiSent = {
                groupId: currentSenderId,
            };
            getMsgsGroupChat(accessToken, dispatch, apiSent, axiosJWTLogin);
        }
    }, []);

    useEffect(() => {
        setIndividualChatId(individualChat.idChat);
    }, [individualChat.idChat]);

    useEffect(() => {
        setSendData(chat);
    }, [chat]);

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

    useEffect(() => {
        // 👇️ scroll to bottom every time messages change
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [sendData]);

    return (
        <>
            <div className={cx('headerChat')}>
                <div className={cx('infoFriend')}>
                    <img src={`https://demoaccesss3week2.s3.ap-southeast-1.amazonaws.com/avata01.png`} alt="avata" />
                    <div className={cx('infoText')}>
                        {<p className={cx('name')}>{sender?.profileName}</p>}
                        <span className={cx('active')}>Đang hoạt động</span>
                    </div>
                </div>

                <ul className={cx('ListButton')}>
                    {Data.map((item, index) => {
                        const image = item.urc;
                        const toolTip = item.title;
                        const alt = item.alt;

                        return (
                            <React.Fragment key={index}>
                                <li
                                    data-tip={toolTip}
                                    data-for="button"
                                    data-iscapture="true"
                                    className={cx('button')}
                                    onClick={() => callPopupFunction()}
                                >
                                    <img src={image} alt={alt} />
                                </li>
                                <ReactTooltip id="button" place="left" />
                            </React.Fragment>
                        );
                    })}
                </ul>
            </div>

            <div className={cx('bodyCenter')}>
                <div className={cx('infoFriendChat')}>
                    <img src={`https://demoaccesss3week2.s3.ap-southeast-1.amazonaws.com/avata01.png`} alt="avata" />
                    <p>{sender?.profileName}</p>
                </div>

                <div className={cx('containChat')}>
                    <div className={cx('timeChat')}>
                        <p className={cx('time')}>19:53, 7 Tháng 10, 2022</p>
                    </div>

                    {sendData === null ? (
                        <LoadingChat />
                    ) : (
                        sendData?.map((mess, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <div className={cx(mess.sender === currentUserId ? 'userSend' : 'friendSend')}>
                                        <img
                                            className={cx('imgChat')}
                                            src={`https://demoaccesss3week2.s3.ap-southeast-1.amazonaws.com/avata01.png`}
                                            alt="avata"
                                        />
                                        <div
                                            data-tip={convertTime(mess.message.time)}
                                            data-for="registerTip"
                                            className={cx('boxTextChat')}
                                        >
                                            {mess.message?.type_Msg === TYPE_MSG ? (
                                                <p className={cx('textChat')}>{mess.message.content}</p>
                                            ) : (
                                                <>
                                                    {mess.message?.imageContent.length > 0 ? (
                                                        (mess.message?.imageContent).map((img, index) => {
                                                            return (
                                                                <img
                                                                    key={index}
                                                                    alt="not fount"
                                                                    width={'20px'}
                                                                    src={img}
                                                                />
                                                            );
                                                        })
                                                    ) : (
                                                        <img key={index} alt="not fount" width={'20px'} src={''} />
                                                    )}
                                                </>
                                            )}
                                            {/* {convertTime(mess.message.time)} */}
                                        </div>
                                        <div className={cx('boxEdite')}>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                        </div>
                                    </div>
                                    <ReactTooltip id="registerTip" place="left" effect="solid" />
                                </React.Fragment>
                            );
                        })
                    )}
                    <div className={cx('friendSend')}>
                        <img
                            className={cx('imgChat')}
                            src={`https://demoaccesss3week2.s3.ap-southeast-1.amazonaws.com/avata01.png`}
                            alt="avata"
                        />
                        <div data-tip={'test'} data-for="registerTip" className={cx('boxTextChat')}>
                            <div className={cx('groupImage')}>
                                {itemData.map((item) => (
                                    <img src={`${item.img}?w=164&h=164&fit=crop&auto=format`} alt={item.title} />
                                ))}
                            </div>
                        </div>
                        <div className={cx('boxEdite')}>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>

                    <div ref={bottomRef} />
                </div>
            </div>

            <form onSubmit={handleSubmit} className={cx('inputChat')} encType={'multipart/form-data'}>
                <input
                    type="file"
                    id="selectedFile"
                    name="myImage"
                    accept="image/*"
                    multiple
                    onChange={async (event) => {
                        const bodyFormData = new FormData();
                        const files = event.target.files;

                        for (let index = 0; index < files.length; index++) {
                            bodyFormData.append('file', files[index]);
                        }
                        const image = await uploadFile(accessToken, dispatch, axiosJWTLogin, bodyFormData);
                        window.setTimeout(function () {
                            //wait upload image on google cloud
                            addMsgImgWithInfo(image.url);
                        }, 1000);
                    }}
                    style={{ display: 'none' }}
                />

                {/* Button image */}
                <div
                    className={cx('buttonInput')}
                    type="button"
                    onClick={() => document.getElementById('selectedFile').click()}
                >
                    <img
                        src={`https://res.cloudinary.com/dpux6zwj3/image/upload/v1666526090/samples/Icon/photo_yn6nra.png`}
                        alt="file"
                    />
                </div>

                {/* Butotn file */}
                <div className={cx('buttonInput')} type="button">
                    <img
                        src={`https://res.cloudinary.com/dpux6zwj3/image/upload/v1666602452/samples/Icon/document_mzbsif.png`}
                        alt="file"
                    />
                </div>
                <div className={cx('inputText')}>
                    <input type="text" placeholder="Aa" value={message} onChange={(e) => setMessage(e.target.value)} />
                    <img
                        className={cx('iconPicker')}
                        src={`https://res.cloudinary.com/dxwhrjno5/image/upload/v1666631419/Images/220-2207946_png-file-svg-white-emoji-icon-png-transparent_pr7qbl.jpg`}
                        alt="file"
                        onClick={() => setShowPicker((val) => !val)}
                    />
                    {showPicker && (
                        <Picker
                            pickerStyle={{ width: '25%', position: 'absolute', top: 5 }}
                            onEmojiClick={{ emojiPicker }}
                        />
                    )}
                </div>

                <div type="submit" className={cx('buttonInput')}>
                    {message === '' ? (
                        <img
                            src={`https://res.cloudinary.com/dpux6zwj3/image/upload/v1666528392/samples/Icon/like1_tz3tql.png`}
                            alt="like and send"
                        />
                    ) : (
                        <img
                            src={`https://res.cloudinary.com/dpux6zwj3/image/upload/v1666602121/samples/Icon/send2_llk6si.png`}
                            alt="like and send"
                        />
                    )}
                </div>
            </form>
        </>
    );
}

export default Chat;
