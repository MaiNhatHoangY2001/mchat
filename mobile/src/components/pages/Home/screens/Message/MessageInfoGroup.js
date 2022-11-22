import { useState } from 'react';
import { FlatList } from 'react-native';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// IMPORT ICON LINK ==> https://icons.expo.fyi/
import { Ionicons } from '@expo/vector-icons';

const Item = ({ item, idAdmin, isAdmin, idUser }) => (
    <View style={[styles.item]}>
        <View style={styles.bgImage}>
            <Image
                style={styles.image}
                source={{
                    uri: item.profileImg,
                }}
            />
        </View>
        <Text style={[styles.titleItem]}>
            {item.profileName} <Text style={{ fontSize: 14 }}>{idAdmin === item._id ? ' (Nhóm trưởng)' : ''}</Text>
        </Text>
        {isAdmin && idUser !== item._id ? (
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity>
                    <Ionicons name="key" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginLeft: 10 }}>
                    <Ionicons name="close-circle" size={24} color="black" />
                </TouchableOpacity>
            </View>
        ) : (
            <></>
        )}
    </View>
);

export default function MessageInfoGroup({ navigation, route }) {
    const group = route.params.group;
    const user = route.params.user;
    const members = route?.params.members;

    const isAdmin = user._id === group.groupAdmin._id ? true : false;

    const [groupName, setGroupName] = useState(group.groupName);

    const renderItem = ({ item }) => {
        return <Item item={item} idAdmin={group.groupAdmin._id} isAdmin={isAdmin} idUser={user._id} />;
    };

    return (
        <View style={styles.container}>
            <View>
                <ScrollView style={{ borderBottomWidth: 10, borderBottomColor: '#c4c4c4' }}>
                    <View style={{ paddingVertical: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: 100, height: 100 }}>
                            <Image style={{ flex: 1 }} source={{ uri: group.groupImage }} />
                        </View>
                        <TouchableOpacity
                            style={{
                                backgroundColor: 'blue',
                                padding: 10,
                                paddingHorizontal: 20,
                                marginTop: 20,
                                borderRadius: 50,
                            }}
                        >
                            <Text style={{ fontSize: 16, fontWeight: '600', color: 'white' }}>
                                Cập nhật ảnh đại diện
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bgInputText}>
                        <TextInput
                            value={groupName}
                            onChangeText={setGroupName}
                            style={styles.textInput}
                            placeholder="Nhập Tên Nhóm"
                        />
                    </View>
                </ScrollView>
            </View>
            <View style={{ flex: 1, padding: 10 }}>
                <Text style={styles.title}>{members.length} Thành Viên</Text>
                <FlatList data={members} renderItem={renderItem} />
            </View>
            <View
                style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: 10 }}
            >
                {isAdmin ? (
                    <TouchableOpacity
                        style={{ padding: 10, paddingHorizontal: 20, backgroundColor: 'red', borderRadius: 10 }}
                    >
                        <Text style={{ fontSize: 18, fontWeight: '600', color: 'white' }}>Xóa nhóm</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        style={{ padding: 10, paddingHorizontal: 20, backgroundColor: 'blue', borderRadius: 10 }}
                    >
                        <Text style={{ fontSize: 18, fontWeight: '600', color: 'white' }}>Rời nhóm</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    bgInputText: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    textInput: {
        fontSize: 16,
        paddingVertical: 4,
        paddingHorizontal: 20,

        width: '100%',

        borderWidth: 1,
        borderRadius: 50,
    },

    title: {
        fontSize: 20,
        fontWeight: '600',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 10,
    },
    bgImage: {
        width: 40,
        height: 40,

        marginRight: 10,
    },
    image: {
        flex: 1,
        borderRadius: 100,
    },
    titleItem: {
        flex: 1,
        fontSize: 18,
    },
});
