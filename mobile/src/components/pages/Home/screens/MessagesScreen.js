import { FlatList, SafeAreaView, StyleSheet, Text } from 'react-native';
import Item from './Message/FlatList/Item';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '../../../../redux/createInstance';
import { addIndividualChatSuccess } from '../../../../redux/chatSlice';
import { searchUser } from '../../../../redux/apiRequest/userApiRequest';
import { setSender } from '../../../../redux/userSlice';
import { addGroupChat, getListGroupChat, getMsgs, getMsgsGroupChat } from '../../../../redux/apiRequest/chatApiRequest';
import { loginSuccess } from '../../../../redux/authSlice';
import { getGroupChatSuccess, setIsGroupChat } from '../../../../redux/groupChatSlice';

import { ChatContext } from '../../../../context/ChatContext';
import { TYPE_IMG, TYPE_MSG, TYPE_NOTIFICATION } from '../../../../context/TypeChat';
import { useContext, useEffect, useState } from 'react';

export default function MessagesScreen({ navigation }) {
    // Create Hook Item in FlatList
    const [selectedId, setSelectedId] = useState(null);

    const currentUser = useSelector((state) => state.auth.login?.currentUser);
    const currentIndividualChat = useSelector((state) => state.chat.individualChat?.actor);
    const currentGroupChat = useSelector((state) => state.groupChat.groupChat?.actor);
    const currentSearch = useSelector((state) => state.user.users?.allUsers);

    const chatContext = useContext(ChatContext);
    const setListFriend = chatContext.setListFriend;
    const sendText4JoinGroup = chatContext.sendText4JoinGroup;

    const [usersSearch, setUsersSearch] = useState([]);
    const [textSearchUser, setTextSearchUser] = useState('');
    const [chatActors, setChatActors] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [searchGroup, setSearchGroup] = useState('');
    const [nameGroup, setNameGroup] = useState('');

    const dispatch = useDispatch();
    const accessToken = currentUser?.accessToken;

    const [selectData, setSelectData] = useState([]);

    let axiosJWT = createAxios(currentUser, dispatch, loginSuccess);

    const activeButtonStyles = {
        backgroundColor: 'rgba(243, 163, 173, 1)',
        color: 'white',
        pointerEvents: 'none',
        userSelect: 'none',
    };

    const setDataSelect = (event) => {
        setSearchGroup(event.target.value);
    };

    const handleToggle = (item) => () => {
        const currentIndex = selectData
            .map((item1) => {
                return item1._id;
            })
            .indexOf(item._id);
        const newData = [...selectData];

        if (currentIndex === -1) {
            newData.push(item);
        } else {
            newData.splice(currentIndex, 1);
        }
        setSelectData(newData);
    };

    const handleClick = async (individualId, sender, userId, isGroupChat) => {
        if (!isGroupChat) {
            const apiSent = {
                sender: sender?._id,
                user: userId,
            };
            getMsgs(accessToken, dispatch, apiSent, axiosJWT);
            dispatch(addIndividualChatSuccess(individualId));
            dispatch(setIsGroupChat(false));
        } else {
            const apiSent = {
                groupId: sender?._id,
            };
            getMsgsGroupChat(accessToken, dispatch, apiSent, axiosJWT);
            getListGroupChat(accessToken, currentUser?._id, dispatch, axiosJWT);
            dispatch(setIsGroupChat(true));
        }

        dispatch(setSender(sender));
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
                dispatch(
                    setSender({
                        _id: newGroupChat._id,
                        profileName: newGroupChat.groupName,
                        profileImg: newGroupChat?.groupImage,
                    }),
                );
                //reload chat when create new group
                const apiSent = {
                    groupId: newGroupChat._id,
                };
                getMsgsGroupChat(accessToken, dispatch, apiSent, axiosJWT);
                //send text join group to friend
                sendText4JoinGroup(listFriend, name, newGroupChat._id);
                dispatch(setIsGroupChat(true));
                handleClickExit();
            }
        }
    };

    const handleClickExit = () => {
        setOpenModal(false);
        setSelectData([]);
    };

    useEffect(() => {
        if (currentIndividualChat !== null) {
            const listChat = currentIndividualChat?.concat(currentGroupChat);
            const listSort = listChat?.sort(function (a, b) {
                return new Date(b?.message[0]?.time) - new Date(a?.message[0]?.time);
            });
            setChatActors(listSort);
            //set actor chat in context
            setListFriend(currentIndividualChat);
        }
    }, [currentIndividualChat, currentGroupChat]);

    useEffect(() => {
        const search = textSearchUser === '' ? '@' : textSearchUser;
        searchUser(accessToken, dispatch, search, axiosJWT);
        if (currentSearch !== null) {
            setUsersSearch(currentSearch?.filter((user) => user?.profileName !== currentUser?.profileName));
        }
    }, [textSearchUser]);

    // Get Item
    const renderItem = ({ item }) => {
        const backgroundColor = item._id === selectedId ? '#f9c2ff' : '#ffffff';
        const actorGroupChat = {
            _id: item?._id,
            profileName: item?.groupName,
            profileImg: item?.groupImage,
        };
        const isGroupChat = item?.sender?._id === undefined;

        return (
            <Item
                item={item}
                onPress={() => {
                    setSelectedId(item._id);
                    handleClick(item?._id, item?.sender || actorGroupChat, item?.user, isGroupChat);
                    navigation.navigate('Chat', { item: item });
                }}
                backgroundColor={{ backgroundColor }}
            />
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList data={chatActors} renderItem={renderItem} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
