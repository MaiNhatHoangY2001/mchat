import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useContext, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { TYPE_IMG, TYPE_MSG, TYPE_NOTIFICATION } from '../../../../../../context/TypeChat';
import { UserContext } from '../../../../../../context/UserContext';

export default function Item({ item, onPress, backgroundColor }) {
    const currentUser = useSelector((state) => state.auth.login?.currentUser);
    const currentSender = useSelector((state) => state.user.sender?.user);

    const [status, setStatus] = useState(false);

    const userContext = useContext(UserContext);
    const setActiveUser = userContext.setActiveUser;

    // const imgage = item.img;

    const isActorSenderActive = currentSender?._id === (item?.sender?._id || item?._id);
    const isGroupChat = item?.sender?._id === undefined;
   

    const newMessage = (mess) => {
        const typeMess = mess?.type_Msg;
        const content = mess?.content;
        const profileName = currentUser?.profileName === mess?.profileName ? 'Bạn' : mess?.profileName;
        switch (typeMess) {
            case TYPE_MSG:
                return `${profileName}: ${content}`;
            case TYPE_IMG:
                return `${profileName}: Gửi hình ảnh`;
            case TYPE_NOTIFICATION:
                return `${profileName}: Gửi tin nhắn thông báo`;
            default:
                return `${profileName}: ${content}`;
        }
    };

    useEffect(() => {
        setActiveUser(item, isGroupChat).then((value) => {
            setStatus(value);
        });
    }, [setActiveUser]);

    return (
        <TouchableOpacity style={[styles.container, backgroundColor]} onPress={onPress}>
            <View style={styles.avata}>
                <Image
                    style={styles.image}
                    source={{
                        uri: item?.sender?.profileImg || item?.groupImage,
                    }}
                />
            </View>
            <View style={styles.content}>
                <View style={styles.contentText}>
                    <Text style={[styles.name]}>{item?.sender?.profileName || item?.groupName}</Text>
                    <Text style={[styles.chat]}>{newMessage(item?.newMsg)}</Text>
                </View>
                <View style={styles.contentSub}>
                    {/* <Text style={styles.time}>{item?.status}</Text> */}
                    <View style={[styles.dot, status ? styles.active : styles.disable]}></View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
    },
    avata: {
        marginRight: 10,
        padding: 2,

        width: 52,
        height: 52,

        borderWidth: 1,
        borderRadius: 100,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'center',

        borderRadius: 100,
    },

    content: {
        flex: 1,
        flexDirection: 'row',
    },
    contentText: {
        flex: 1,
        justifyContent: 'space-between',
    },
    name: {
        fontSize: 20,
        fontWeight: '400',
    },
    chat: {
        fontSize: 18,
        fontWeight: '400',
        color: '#9E9F9F',
    },
    contentSub: {
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    time: {
        fontSize: 14,
        fontWeight: '400',
        color: '#9E9F9F',
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 100,
    },
    active: {
        backgroundColor: '#00ff66',
    },
    disable: {
        backgroundColor: '#c4c4c4',
    },
});
