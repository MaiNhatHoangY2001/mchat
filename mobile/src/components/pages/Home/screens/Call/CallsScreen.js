// import { Text, View, Image, ImageBackground, TouchableOpacity, TextInput, Dimensions, StyleSheet } from 'react-native';
// import React, { useEffect, useRef, useState } from 'react';
// import { Link, useNavigate } from 'react-router-native';
// import { useDispatch, useSelector } from 'react-redux';

// import io from 'socket.io-client';
// import { url } from '../../../../../redux/createInstance';

// import { SafeAreaView } from 'react-native-safe-area-context';

// //link all name animations: https://github.com/oblador/react-native-animatable
// //link how to code animation: https://blog.bitsrc.io/top-5-animation-libraries-in-react-native-d00ec8ddfc8d
// import * as Animatable from 'react-native-animatable';

// //link all icons react-native: https://oblador.github.io/react-native-vector-icons/
// import Icon from 'react-native-vector-icons/Ionicons';
// import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
// import IconAntDesign from 'react-native-vector-icons/AntDesign';

// import { createAxios } from '../../../../../redux/createInstance';
// import { logoutSuccess } from '../../../../../redux/authSlice';
// import { logOut } from '../../../../../redux/apiRequest/authApiRequest';

// import { NavigationContainer } from '@react-navigation/native';
// // import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// //link doc top tabs: https://reactnavigation.org/docs/material-top-tab-navigator/
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// //https://docs.expo.dev/versions/latest/sdk/video
// //npx expo install expo-av
// import { Video, AVPlaybackStatus } from 'expo-av';

// //npm i @cometchat-pro/react-native-calls
// // import cometChat from '@cometchat-pro/react-native-calls';

// const widthScreen = Dimensions.get('window').width;
// const heightScreen = Dimensions.get('window').height;

// const socket = io(url);
// export default function CallsScreen() {
//     const currentUser = useSelector((state) => state.auth.login?.currentUser);

//     const myVideo = useRef(null);
//     // const [status, setStatus] = useState({});

//     // const [callType, setCallType] = useState(null);
//     // const [callSettings, setCallSettings] = useState(null);
//     // const [call, setCall] = useState(null);
//     // const [isSomeoneCalling, setIsSomeoneCalling] = useState(false);

//     useEffect(() => {
//         console.log('connect: ' +socket.connected);
//         console.log('current socket id: ' +socket.id);
//     })
    

//     return (
//         <SafeAreaView style={styles.container}>
//             {/* <Text>calls screen</Text> */}
//             <Video
//                 ref={myVideo}
//                 style={styles.video}
//                 // source={{
//                 //     uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//                 // }}
//                 // useNativeControls //options: play, pause,...
//                 resizeMode="cover"
//                 // onPlaybackStatusUpdate={(status) => setStatus(() => status)}
//             />
//         </SafeAreaView>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: 'lightgray',
//     },
//     video: {
//         width: '90%',
//         height: '50%',
//         borderColor: 'red',
//         borderStyle: 'solid',
//         borderWidth: 1,
//         alignSelf: 'center'
//     }
// });
