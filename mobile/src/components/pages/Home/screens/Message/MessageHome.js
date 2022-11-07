import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import MessagesScreen from '../MessagesScreen';
import MessageChat from './MessageChat';
import MessageSearch from './MessageSearch';

const Stack = createNativeStackNavigator();

export default function HomeMessage() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={({ navigation, route }) => ({
                    headerTitle: 'Danh sách',
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                            <View style={styles.bgButton}>
                                <IconFontAwesome style={styles.titleButton} name="search" />
                            </View>
                        </TouchableOpacity>
                    ),
                })}
                name="Message"
                component={MessagesScreen}
            />
            <Stack.Screen name="Chat" component={MessageChat} />
            <Stack.Screen
                options={({}) => ({
                    headerTitle: () => (
                        <View style={styles.bgInputText}>
                            <TextInput placeholder="Nhập tên người dùng" />
                        </View>
                    ),
                })}
                name="Search"
                component={MessageSearch}
            />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    bgButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(250, 139, 158)',

        width: 36,
        height: 36,

        borderRadius: 50,
    },
    titleButton: {
        fontSize: 18,
        color: '#ffffff',
    },

    bgInputText: {
        flex: 1,
        marginRight: 90,
        paddingVertical: 4,
        paddingHorizontal: 10,

        borderWidth: 1,
        borderRadius: 10,
    },
});
