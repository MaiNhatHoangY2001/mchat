import { Dimensions, View } from 'react-native';

// IMPORT NAVIGATION TAB
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//link all icons react-native: https://oblador.github.io/react-native-vector-icons/
import Icon from 'react-native-vector-icons/Ionicons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

// IMPORT SCREEN
import MessageHome from './Message/MessageHome';
import CallsScreen from './Call/CallsScreen';
import ProfileScreen from './Profile/ProfileScreen';

// GET SIZE SCREEN DRIVE
const widthScreen = Dimensions.get('window').width;

const Tab = createBottomTabNavigator();

export default function TabScreen() {
    return (
        <Tab.Navigator
            initialRouteName="Trò chuyện"
            tabBarPosition="bottom"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconNameAntDesign, iconNameIcon, iconNameFA;
                    if (route.name === 'Trò chuyện') {
                        iconNameAntDesign = 'message1';
                        size = focused ? 25 : 22;
                        color = focused ? 'rgb(250, 139, 158)' : '#fff';
                    } else if (route.name === 'call') {
                        iconNameIcon = 'md-call-sharp';
                        size = focused ? 25 : 22;
                        color = focused ? 'rgb(250, 139, 158)' : '#fff';
                    } else if (route.name === 'profile') {
                        iconNameFA = 'user-circle-o';
                        size = focused ? 25 : 22;
                        color = focused ? 'rgb(250, 139, 158)' : '#fff';
                    }
                    return (
                        <View
                            style={{
                                flexDirection: 'row',
                                height: '110%',
                                width: '130%',
                                justifyContent: 'center',
                            }}
                        >
                            <IconAntDesign name={iconNameAntDesign} size={size} color={color} />
                            <Icon name={iconNameIcon} size={size} color={color} />
                            <IconFontAwesome name={iconNameFA} size={size} color={color} />
                        </View>
                    );
                },
                tabBarStyle: {
                    width: widthScreen,
                    height: '10%',
                    backgroundColor: '#303030',
                },
                tabBarItemStyle: {
                    padding: '3%',
                },
                tabBarActiveTintColor: 'rgb(250, 139, 158)',
                tabBarInactiveTintColor: '#fff',
                tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold' },
            })}
        >
            <Tab.Screen name="Trò chuyện" options={{ headerShown: false }} component={MessageHome} />
            <Tab.Screen name="call" options={{ title: 'Cuộc gọi' }} component={CallsScreen} />
            <Tab.Screen name="profile" options={{ title: 'Thông tin' }} component={ProfileScreen} />
        </Tab.Navigator>
    );
}
