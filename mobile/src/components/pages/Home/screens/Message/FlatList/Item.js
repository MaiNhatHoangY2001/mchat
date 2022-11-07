import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Item({ item, onPress, backgroundColor }) {
    const imgage = item.img;
    return (
        <TouchableOpacity style={[styles.container, backgroundColor]} onPress={onPress}>
            <View style={styles.avata}>
                <Image
                    style={styles.image}
                    source={{
                        uri: 'https://res.cloudinary.com/dpux6zwj3/image/upload/v1667672819/Avata/avata01_gqmzyq.png',
                    }}
                />
            </View>
            <View style={styles.content}>
                <View style={styles.contentText}>
                    <Text style={[styles.name]}>{item.name}</Text>
                    <Text style={[styles.chat]}>Tin nhắn mới nhất</Text>
                </View>
                <View style={styles.contentSub}>
                    <Text style={styles.time}>9:30</Text>
                    <View style={styles.active}></View>
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
    active: {
        backgroundColor: '#34C759',

        width: 10,
        height: 10,

        borderRadius: 100,
    },
});
