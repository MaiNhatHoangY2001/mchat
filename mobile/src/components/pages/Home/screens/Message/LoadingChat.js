import SkeletonContent from 'react-native-skeleton-content';
import {
    Button,
    Image,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    ScrollViewBase,
    ScrollViewComponent,
    StyleSheet,
    Text,
    View,
} from 'react-native';

function LoadingChat() {
    return (
        <>
            <View style={styles.user}>
                <SkeletonContent
                    containerStyle={styles.senderImage}
                    circle
                    containerClassName="avatar-skeleton"
                    isLoading={true}
                />
                <View style={styles.contain}>
                    <SkeletonContent containerStyle={styles.chatText} width={350} isLoading={true} />
                </View>
            </View>
            <View style={styles.sender}>
                <SkeletonContent
                    containerStyle={styles.senderImage}
                    circle
                    containerClassName="avatar-skeleton"
                    isLoading={true}
                />
                <View style={styles.contain}>
                    <SkeletonContent containerStyle={styles.chatText} width={350} isLoading={true} />
                </View>
            </View>
            <View style={styles.user}>
                <SkeletonContent
                    containerStyle={styles.senderImage}
                    circle
                    containerClassName="avatar-skeleton"
                    isLoading={true}
                />
                <View style={styles.contain}>
                    <SkeletonContent containerStyle={styles.chatText} width={350} isLoading={true} />
                </View>
            </View>
            <View style={styles.sender}>
                <SkeletonContent
                    containerStyle={styles.senderImage}
                    circle
                    containerClassName="avatar-skeleton"
                    isLoading={true}
                />
                <View style={styles.contain}>
                    <SkeletonContent containerStyle={styles.chatText} width={350} isLoading={true} />
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    // Styles profile Sender
    profileSender: {
        flex: 1,
        flexDirection: 'row',
        marginRight: 90,
    },
    avata: {
        marginRight: 10,
    },
    image: {
        width: 50,
        height: 50,
        resizeMode: 'center',
        borderRadius: 50,
    },
    textContent: {
        flex: 1,
        justifyContent: 'space-between',
    },
    name: {
        fontSize: 20,
        fontWeight: '500',
    },
    active: {
        fontSize: 14,
        fontWeight: '400',
        color: '#34C759',
    },

    // Styles Main
    container: {
        flex: 1,
    },
    chatAvata: {
        width: '100%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chatImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },

    contentChat: {
        flex: 1,
        minHeight: 455,
        justifyContent: 'flex-end',
    },
    sender: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        padding: 10,
    },
    user: {
        flexDirection: 'row-reverse',
        alignItems: 'flex-end',
        padding: 10,
    },
    contain: {
        padding: 10,
        backgroundColor: '#f3a3ad',

        borderRadius: 10,
        elevation: 5,
    },
    userImage: {
        resizeMode: 'center',
        marginLeft: 10,

        width: 40,
        height: 40,

        borderRadius: 50,
    },
    senderImage: {
        resizeMode: 'center',
        marginRight: 10,

        width: 40,
        height: 40,

        borderRadius: 50,
    },
    chatName: {
        fontSize: 14,
        color: '#606060',
    },
    chatText: {
        fontSize: 16,
    },
});

export default LoadingChat;
