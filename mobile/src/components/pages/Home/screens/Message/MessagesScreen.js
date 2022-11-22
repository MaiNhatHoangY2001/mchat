import { FlatList, SafeAreaView, StyleSheet, Text, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '../../../../../redux/createInstance';
import { addIndividualChatSuccess } from '../../../../../redux/chatSlice';
import { searchUser } from '../../../../../redux/apiRequest/userApiRequest';
import { setSender } from '../../../../../redux/userSlice';
import {
    addGroupChat,
    getListGroupChat,
    getMsgs,
    getMsgsGroupChat,
} from '../../../../../redux/apiRequest/chatApiRequest';
import { loginSuccess } from '../../../../../redux/authSlice';
import { getGroupChatSuccess, setIsGroupChat } from '../../../../../redux/groupChatSlice';

import { ChatContext } from '../../../../../context/ChatContext';
import { TYPE_IMG, TYPE_MSG, TYPE_NOTIFICATION } from '../../../../../context/TypeChat';
import { useContext, useEffect, useState } from 'react';
import Item from './FlatList/Item';

// GET SIZE SREEN DRIVE
const widthScreen = Dimensions.get('window').width;

export default function MessagesScreen({ navigation }) {
    // Create Hook Item in FlatList
    const [selectedId, setSelectedId] = useState(null);

    const currentUser = useSelector((state) => state.auth.login?.currentUser);
    const currentGroupChat = useSelector((state) => state.groupChat.groupChat?.actor);
    const currentSearch = useSelector((state) => state.user.users?.allUsers);

    const chatContext = useContext(ChatContext);
    const setListFriend = chatContext.setListFriend;
    const sendText4JoinGroup = chatContext.sendText4JoinGroup;
    const chatActors = chatContext.chatActors;
    const setChatActors = chatContext.setChatActors;

    const [usersSearch, setUsersSearch] = useState([]);
    const [textSearchUser, setTextSearchUser] = useState('');
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
                return item1?._id;
            })
            .indexOf(item?._id);
        const newData = [...selectData];

        if (currentIndex === -1) {
            newData.push(item);
        } else {
            newData.splice(currentIndex, 1);
        }
        setSelectData(newData);
    };

    const handleSetSender = async (individualId, sender, userId, isGroupChat) => {
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

    

    const handleClickExit = () => {
        setOpenModal(false);
        setSelectData([]);
    };



    useEffect(() => {
        const search = textSearchUser === '' ? '@' : textSearchUser;
        searchUser(accessToken, dispatch, search, axiosJWT);
        if (currentSearch !== null) {
            setUsersSearch(currentSearch?.filter((user) => user?.profileName !== currentUser?.profileName));
        }
    }, [textSearchUser]);

    // Get Item
    const renderItem = ({ item }) => {
        const backgroundColor = item?._id === selectedId ? '#f9c2ff' : '#ffffff';
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
                    setSelectedId(item?._id);
                    handleSetSender(item?._id, item?.sender || actorGroupChat, item?.user, isGroupChat);
                    navigation.navigate('MessageChat', { item: item });
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
