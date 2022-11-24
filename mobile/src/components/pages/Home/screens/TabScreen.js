import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';

// IMPORT NAVIGATION TAB
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//link all icons react-native: https://oblador.github.io/react-native-vector-icons/
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

// IMPORT SCREEN
import ProfileScreen from './Profile/ProfileScreen';
import MessagesScreen from './Message/MessagesScreen';

const Tab = createBottomTabNavigator();

export default function TabScreen({ navigation }) {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Trò chuyện') {
                        iconName = focused ? 'chatbox-ellipses' : 'chatbox-ellipses-outline';
                    } else if (route.name === 'ProfileScreen') {
                        iconName = focused ? 'information-circle' : 'information-circle-outline';
                    }
                    size = focused ? 30 : 24;

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'rgb(250, 139, 158)',
                tabBarInactiveTintColor: '#fff',
                tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
                tabBarStyle: {
                    flex: 0.09,
                    backgroundColor: '#303030',
                    paddingBottom: 10,
                },
                tabBarItemStyle: {},
            })}
        >
            <Tab.Screen
                options={({ navigation, route }) => ({
                    headerTitle: 'Danh sách',
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.navigate('MessageSearch')}>
                            <View style={styles.bgButton}>
                                <IconFontAwesome style={styles.titleButton} name="search" />
                            </View>
                        </TouchableOpacity>
                    ),
                })}
                name="Trò chuyện"
                component={MessagesScreen}
            />
            <Tab.Screen name="ProfileScreen" options={{ title: 'Thông tin' }} component={ProfileScreen} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    bgButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(250, 139, 158)',
        marginRight: 10,

        width: 36,
        height: 36,

        borderRadius: 50,
    },
    titleButton: {
        fontSize: 18,
        color: '#ffffff',
    },
});
