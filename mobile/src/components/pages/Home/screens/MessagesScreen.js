import { useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text } from 'react-native';
import Item from './Message/FlatList/Item';

// Demo Data Flatlist
const Data = [
    {
        id: 0,
        img: 'https://res.cloudinary.com/dpux6zwj3/image/upload/v1667672819/Avata/avata01_gqmzyq.png',
        name: 'Nhật Hoàng',
    },
    {
        id: 1,
        img: 'https://res.cloudinary.com/dpux6zwj3/image/upload/v1667672819/Avata/avata01_gqmzyq.png',
        name: 'Minh Hùng',
    },
    {
        id: 2,
        img: 'https://res.cloudinary.com/dpux6zwj3/image/upload/v1667672819/Avata/avata01_gqmzyq.png',
        name: 'Ngọc Long',
    },
    {
        id: 3,
        img: 'https://res.cloudinary.com/dpux6zwj3/image/upload/v1667672819/Avata/avata01_gqmzyq.png',
        name: 'Đinh Tuấn',
    },
    {
        id: 4,
        img: 'https://res.cloudinary.com/dpux6zwj3/image/upload/v1667672819/Avata/avata01_gqmzyq.png',
        name: 'Minh Hiếu',
    },
    {
        id: 5,
        img: 'https://res.cloudinary.com/dpux6zwj3/image/upload/v1667672819/Avata/avata01_gqmzyq.png',
        name: 'Công Phượng',
    },
];

export default function MessagesScreen({ navigation }) {
    // Create Hook Item in FlatList
    const [selectedId, setSelectedId] = useState(null);

    // Get Item
    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? '#f9c2ff' : '#ffffff';

        return (
            <Item
                item={item}
                onPress={() => {
                    setSelectedId(item.id);
                    navigation.navigate('Chat');
                }}
                backgroundColor={{ backgroundColor }}
            />
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList data={Data} renderItem={renderItem} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
