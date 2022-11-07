import { StyleSheet, Text, View } from 'react-native';

export default function Item({ item }) {
    return (
        <View style={styles.container}>
            <Text> {item.name} </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        margin: 10,
    },
});
