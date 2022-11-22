import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';

// IMPORT NAVIGATION TAB
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//link all icons react-native: https://oblador.github.io/react-native-vector-icons/
import Icon from 'react-native-vector-icons/Ionicons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

// IMPORT SCREEN
import CallsScreen from './Call/CallsScreen';
import ProfileScreen from './Profile/ProfileScreen';
import MessagesScreen from './Message/MessagesScreen';

// GET SIZE SCREEN DRIVE
const widthScreen = Dimensions.get('window').width;

const Tab = createBottomTabNavigator();

export default function TabScreen({ navigation }) {
    return (
        <Tab.Navigator
            tabBarPosition="bottom"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'homeMessage') {
                        iconName = focused ? 'home' : 'home-outline';
                        size = focused ? 30 : 24;
                    } else if (route.name === 'call') {
                        iconName = focused ? 'call' : 'call-outline';
                        size = focused ? 30 : 24;
                    } else if (route.name === 'profile') {
                        iconName = focused ? 'information-circle' : 'information-circle-outline';
                        size = focused ? 30 : 24;
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'rgb(250, 139, 158)',
                tabBarInactiveTintColor: 'white',
                tabBarLabelStyle: {
                    fontSize: 16,
                },
                tabBarStyle: {
                    flex: 0.08,
                    paddingBottom: 6,
                    backgroundColor: '#303030',
                },

                // tabBarIcon: ({ focused, color, size }) => {
                //     let iconNameAntDesign, iconNameIcon, iconNameFA;
                //     if (route.name === 'homeMessage') {
                //         iconNameAntDesign = 'message1';
                //         size = focused ? 25 : 22;
                //         color = focused ? 'rgb(250, 139, 158)' : '#fff';
                //     } else if (route.name === 'call') {
                //         iconNameIcon = 'md-call-sharp';
                //         size = focused ? 25 : 22;
                //         color = focused ? 'rgb(250, 139, 158)' : '#fff';
                //     } else if (route.name === 'profile') {
                //         iconNameFA = 'user-circle-o';
                //         size = focused ? 25 : 22;
                //         color = focused ? 'rgb(250, 139, 158)' : '#fff';
                //     }
                //     return (
                //         <View
                //             style={{
                //                 flexDirection: 'row',
                //                 height: '110%',
                //                 width: '130%',
                //                 justifyContent: 'center',
                //             }}
                //         >
                //             <IconAntDesign name={iconNameAntDesign} size={size} color={color} />
                //             <Icon name={iconNameIcon} size={size} color={color} />
                //             <IconFontAwesome name={iconNameFA} size={size} color={color} />
                //         </View>
                //     );
                // },
                // tabBarStyle: {
                //     width: widthScreen,
                //     height: '10%',
                //     backgroundColor: '#303030',
                // },
                // tabBarItemStyle: {
                //     padding: '3%',
                // },
                // tabBarActiveTintColor: 'rgb(250, 139, 158)',
                // tabBarInactiveTintColor: '#fff',
                // tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold' },
            })}
        >
            <Tab.Screen
                options={({ navigation, route }) => ({
                    headerTitle: 'Danh sách',
                    title: 'Tin nhắn',
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.navigate('MessageSearch')}>
                            <View style={styles.bgButton}>
                                <IconFontAwesome style={styles.titleButton} name="search" />
                            </View>
                        </TouchableOpacity>
                    ),
                })}
                name="homeMessage"
                component={MessagesScreen}
            />
            <Tab.Screen name="call" options={{ title: 'Cuộc gọi' }} component={CallsScreen} />
            <Tab.Screen name="profile" options={{ title: 'Thông tin' }} component={ProfileScreen} />
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
