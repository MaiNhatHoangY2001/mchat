import { useEffect, useState } from 'react';
import {
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

export default function MessageChat({ navigation, route }) {
    const dataSender = route.params.item;
    const isUser = route.params.item.sender === undefined ? false : true;

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
        <ImageBackground
            style={styles.container}
            resizeMode="cover"
            source={{
                uri: 'https://res.cloudinary.com/dpux6zwj3/image/upload/v1667673550/Avata/bgcolor_t3meet.png',
            }}
        >
            <ScrollView>
                <View style={[styles.chatAvata]}>
                    {isUser ? (
                        <Image style={styles.chatImage} source={{ uri: dataSender.sender.profileImg }} />
                    ) : (
                        <Image style={styles.image} source={{ uri: dataSender.groupImage }} />
                    )}
                </View>
                <View style={styles.contentChat}>
                    <View style={styles.user}>
                        <Image
                            style={styles.userImage}
                            source={{
                                uri: 'https://res.cloudinary.com/dpux6zwj3/image/upload/v1667672819/Avata/avata01_gqmzyq.png',
                            }}
                        />
                        <View style={styles.contain}>
                            <Text style={styles.chatText}>Content Chat</Text>
                        </View>
                    </View>
                    <View style={styles.sender}>
                        <Image
                            style={styles.senderImage}
                            source={{
                                uri: 'https://res.cloudinary.com/dpux6zwj3/image/upload/v1667672819/Avata/avata01_gqmzyq.png',
                            }}
                        />
                        <View style={styles.contain}>
                            {isUser ? <></> : <Text style={styles.chatName}>Name</Text>}

                            <Text style={styles.chatText}>Content Chat</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
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
