import {
    Text,
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
    TextInput,
    Dimensions,
    StyleSheet,
    Button,
    ScrollView,
} from 'react-native';
import React, { useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-native';
import { useDispatch, useSelector } from 'react-redux';

import { SafeAreaView } from 'react-native-safe-area-context';

//link all name animations: https://github.com/oblador/react-native-animatable
//link how to code animation: https://blog.bitsrc.io/top-5-animation-libraries-in-react-native-d00ec8ddfc8d
import * as Animatable from 'react-native-animatable';

//link all icons react-native: https://oblador.github.io/react-native-vector-icons/
import { Ionicons } from '@expo/vector-icons';
import IconIon from 'react-native-vector-icons/Ionicons';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconFeather from 'react-native-vector-icons/Feather';

import { createAxios } from '../../../../../redux/createInstance';
import { logoutSuccess } from '../../../../../redux/authSlice';
import { logOut } from '../../../../../redux/apiRequest/authApiRequest';

import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//link doc top tabs: https://reactnavigation.org/docs/material-top-tab-navigator/
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { UserContext } from '../../../../../context/UserContext';
import { useState } from 'react';

import * as ImagePicker from 'expo-image-picker';


const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

export default function ProfileScreen() {
    const currentUser = useSelector((state) => state.auth.login?.currentUser);
    const userId = currentUser?._id;
    const accessToken = currentUser?.accessToken;

    const userContext = useContext(UserContext);
    const removeUserActive2Socket = userContext.removeUserActive2Socket;

    const navigate = useNavigate();
    const dispatch = useDispatch();
    let axiosJWTLogout = createAxios(currentUser, dispatch, logoutSuccess);

    const [isShowFormInput, setShowFormInput] = useState(false);
    const [isShowFormChangePW, setShowFormChangePW] = useState(false);
    const [inputName, setInputName] = useState(currentUser?.profileName);

    const handleLogout = () => {
        logOut(dispatch, navigate, userId, accessToken, axiosJWTLogout);
        removeUserActive2Socket(currentUser?.phoneNumber);
    };

    const handleChangeImage = () => {
        console.log('Change Image');
    };

    const handleChangeName = () => {
        console.log('Change Name');
    };

    const handleClickApply = async () => {
        if (currentUser?.profileName !== inputName.trim()) {
            const apiSetProfileName = {
                profileName: inputName.trim(),
            };

            const currentLogin = { ...currentUser, profileName: inputName.trim() };

            await updateUser(accessToken, dispatch, currentUser._id, apiSetProfileName, axiosJWTLogin);
            dispatch(loginSuccess(currentLogin));
        }

        if (currentUser?.profileImg !== urlImage) {
            //upload image to cloud
            const bodyFormData = new FormData();
            bodyFormData.append('file', image);
            const uploadImage = await uploadFile(accessToken, dispatch, axiosJWTLogin, bodyFormData);

            window.setTimeout(async function () {
                //set group chat profile img
                const apiSetGroupProfileImg = {
                    profileImg: uploadImage.url[0],
                };

                setUrlImage(uploadImage.url[0]);
                const currentLogin = { ...currentUser, profileImg: uploadImage.url[0] };

                await updateUser(accessToken, dispatch, currentUser._id, apiSetGroupProfileImg, axiosJWTLogin);
                dispatch(loginSuccess(currentLogin));
            }, 1000);
        }
    };

    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
        }
    }, [currentUser]);

    return (
        <ScrollView style={{ backgroundColor: '#fff' }}>
            <View style={{ alignItems: 'center', paddingVertical: 30 }}>
                <View style={{ width: 120, height: 120 }}>
                    <Image
                        source={{ uri: currentUser?.profileImg }}
                        style={{ flex: 1, borderRadius: 100 }}
                        resizeMode="contain"
                    />
                    <TouchableOpacity style={{ position: 'absolute', bottom: 0, right: 0 }} onPress={handleChangeImage}>
                        <IconFeather name="edit-3" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>

            {isShowFormChangePW ? (
                <>
                    <View style={{}}>
                        <View
                            style={{
                                paddingHorizontal: 20,
                                paddingVertical: 10,
                                borderBottomWidth: 1,
                                borderBottomColor: '#c4c4c4',
                            }}
                        >
                            <TextInput
                                secureTextEntry={true}
                                style={{ borderWidth: 1, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 }}
                                placeholder="Nhập Mật khẩu hiện tại"
                            />
                            <Text style={{ color: 'red', paddingTop: 4 }}>Mật khẩu không chính xác</Text>
                        </View>
                        <View
                            style={{
                                paddingHorizontal: 20,
                                paddingVertical: 10,
                                borderBottomWidth: 1,
                                borderBottomColor: '#c4c4c4',
                            }}
                        >
                            <TextInput
                                secureTextEntry={true}
                                style={{ borderWidth: 1, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 }}
                                placeholder="Nhập Mật khẩu mới"
                            />
                            <Text style={{ color: 'red', paddingTop: 4 }}>Mật khẩu không chính xác</Text>
                        </View>
                        <View
                            style={{
                                paddingHorizontal: 20,
                                paddingVertical: 10,
                            }}
                        >
                            <TextInput
                                secureTextEntry={true}
                                style={{ borderWidth: 1, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 }}
                                placeholder="Nhập lại mật khẩu"
                            />
                            <Text style={{ color: 'red', paddingTop: 4 }}>Mật khẩu không chính xác</Text>
                        </View>
                        <View style={{ paddingHorizontal: 50, paddingVertical: 10 }}>
                            <Button title="Xác nhận" onPress={() => setShowFormChangePW(!isShowFormChangePW)} />
                        </View>
                    </View>
                </>
            ) : (
                <View style={{ alignItems: 'center', height: '50%' }}>
                    <View style={styles.viewInfoLine}>
                        <IconAntDesign name="user" size={30} color="black" />
                        {isShowFormInput ? (
                            <>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        flex: 1,
                                        paddingHorizontal: 10,
                                    }}
                                >
                                    <TextInput
                                        value={inputName}
                                        onChangeText={setInputName}
                                        style={{ flex: 1, fontSize: 18, paddingVertical: 4, paddingHorizontal: 10 }}
                                        placeholder="Nhập tên người dùng"
                                    />
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <TouchableOpacity style={{ marginRight: 10 }} onPress={handleChangeName}>
                                        <Ionicons name="checkmark-circle" size={34} color="black" />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => setShowFormInput(!isShowFormInput)}>
                                        <Ionicons name="close-circle" size={34} color="black" />
                                    </TouchableOpacity>
                                </View>
                            </>
                        ) : (
                            <>
                                <View
                                    style={{
                                        width: '70%',
                                        backgroundColor: '#fff',
                                        marginLeft: '5%',
                                        marginRight: '5%',
                                    }}
                                >
                                    <Text style={styles.txtInfo}>{inputName}</Text>
                                    <Text style={styles.txtSystem}>Tên của bạn</Text>
                                </View>
                                <TouchableOpacity onPress={() => setShowFormInput(!isShowFormInput)}>
                                    <IconFeather name="edit-3" size={30} color="black" />
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                    <View style={[styles.viewInfoLine, { borderTopColor: 'lightgray', borderTopWidth: 1 }]}>
                        <IconIon name="phone-portrait-outline" size={30} color="black" />
                        <View style={{ flex: 1, backgroundColor: '#fff', marginLeft: '5%', marginRight: '5%' }}>
                            <Text style={styles.txtInfo}>{currentUser?.phoneNumber}</Text>
                            <Text style={styles.txtSystem}>Số điện thoại của bạn</Text>
                        </View>
                    </View>
                    <View style={[styles.viewInfoLine, { borderTopColor: 'lightgray', borderTopWidth: 1 }]}>
                        <TouchableOpacity
                            style={{
                                backgroundColor: '#f4cccc',
                                paddingVertical: 6,
                                paddingHorizontal: 20,
                                borderRadius: 10,
                            }}
                            onPress={() => setShowFormChangePW(!isShowFormChangePW)}
                        >
                            <Text style={{ fontSize: 16 }}>Đổi mật khẩu</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                backgroundColor: '#305ee4',
                                paddingVertical: 6,
                                paddingHorizontal: 20,
                                borderRadius: 10,
                            }}
                            // onPress={() => setShowFormChangePW(!isShowFormChangePW)}
                        >
                            <Text style={{ fontSize: 16, color: '#fff' }}>Xác nhận</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            <View style={{ paddingVertical: 20 }}>
                <TouchableOpacity
                    style={{
                        padding: 10,
                        borderRadius: 10,
                        marginHorizontal: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgb(250, 139, 158)',
                    }}
                    onPress={() => handleLogout()}
                >
                    <Text style={{ color: '#fff', fontSize: 17, fontWeight: 'bold' }}>Đăng xuất</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    btnLogout: {
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        elevation: 2, // Android
        backgroundColor: 'rgb(250, 139, 158)',
        borderRadius: 12,
        padding: '3%',
        width: 120,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgAva: {
        width: 150,
        height: 150,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 100,
    },
    viewInfoLine: {
        // backgroundColor: 'red',
        width: widthScreen,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    txtInfo: {
        fontSize: 20,
    },
    txtSystem: {
        fontSize: 15,
        color: 'lightgray',
    },
});
