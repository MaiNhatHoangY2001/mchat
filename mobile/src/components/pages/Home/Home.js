// IMPORT REACT NATIVE
import { Dimensions, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// IMPORT STACK NAVIGATION
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// IMPORT SCREEN
import TabScreen from './screens/TabScreen';
import MessageChat from './screens/Message/MessageChat';
import MessageSearch from './screens/Message/MessageSearch';
import MessageNewGroup from './screens/Message/MessageNewGroup';
import MessageNewInforGroup from './screens/Message/MessageNewInforGroup';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-native';
import { createAxios } from '../../../redux/createInstance';
import { loginSuccess } from '../../../redux/authSlice';
import { useEffect } from 'react';
import { getListGroupChat, getListIndividualChat } from '../../../redux/apiRequest/chatApiRequest';

// IMPORT ICON LINK ==> https://icons.expo.fyi/
import { Ionicons } from '@expo/vector-icons';
import MessageInfoGroup from './screens/Message/MessageInfoGroup';
import AddUserToGroup from './screens/Message/AddUserToGroup';

// KHAI BAO STACK NAVIGATION
const Stack = createNativeStackNavigator();

// GET SIZE MOBILE
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function Home() {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const currentUser = useSelector((state) => state.auth.login?.currentUser);
    let axiosJWT = createAxios(currentUser, dispatch, loginSuccess);

    const accessToken = currentUser?.accessToken;
    const id = currentUser?._id;

    useEffect(() => {
        getListIndividualChat(accessToken, id, dispatch, axiosJWT);
        getListGroupChat(accessToken, id, dispatch, axiosJWT);
    }, []);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen options={{ headerShown: false }} name="HomeChat" component={TabScreen} />
                    <Stack.Screen name="MessageChat" component={MessageChat} />
                    <Stack.Screen
                        options={{ title: 'Thông tin nhóm' }}
                        name="MessageInfoGroup"
                        component={MessageInfoGroup}
                    />
                    <Stack.Screen
                        options={{
                            title: 'Thêm thành viên vào nhóm',
                            headerSearchBarOptions: {
                                placeholder: 'Tìm kiếm người dùng',
                                onChangeText: {},
                            },
                        }}
                        name="AddUserToGroup"
                        component={AddUserToGroup}
                    />
                    <Stack.Screen
                        options={{
                            title: 'Tạo nhóm (chọn thành viên)',
                            headerSearchBarOptions: {
                                placeholder: 'Tìm kiếm người dùng',
                                onChangeText: {},
                            },
                        }}
                        name="MassageNewGroup"
                        component={MessageNewGroup}
                    />
                    <Stack.Screen
                        style={{ flex: 1 }}
                        options={() => ({
                            headerTitle: () => (
                                <View style={styles.bgSearch}>
                                    <TextInput style={styles.inputSearch} placeholder="Tìm Kiếm" />
                                    <TouchableOpacity>
                                        <Ionicons name="search" size={20} color="black" />
                                    </TouchableOpacity>
                                </View>
                            ),
                        })}
                        name="MessageSearch"
                        component={MessageSearch}
                    />
                    <Stack.Screen
                        options={(navigate) => ({
                            title: 'Tạo Nhóm (thêm thông tin)',
                            headerRight: () => (
                                <TouchableOpacity>
                                    <Ionicons name="checkmark" size={30} color="green" />
                                </TouchableOpacity>
                            ),
                        })}
                        name="MessageNewInforGroup"
                        component={MessageNewInforGroup}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    bgSearch: {
        flex: 0.9,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: -15,
        marginRight: 20,
        paddingVertical: 4,
        paddingHorizontal: 16,

        borderWidth: 1,
        borderRadius: 100,
    },
    inputSearch: {
        flex: 1,
    },
});
