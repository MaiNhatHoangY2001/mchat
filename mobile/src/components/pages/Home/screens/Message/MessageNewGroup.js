import { StyleSheet, Text, View } from 'react-native';

export default function MessageNewGroup() {
    return (
        <View style={styles.container}>
            <Text>New Group</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
