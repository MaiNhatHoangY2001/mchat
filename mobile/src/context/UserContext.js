import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { url } from '../redux/createInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { createContext, useEffect, useRef, useState } = require('react');

const UserContext = createContext();

function UserContextProvider({ children }) {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const socket = useRef(
        io(url, {
            'Access-Control-Allow-Credentials': true,
        }),
    );

    const [usersActive, setUsersActive] = useState([]);

    useEffect(() => {
        const setActive = async () => {
            const phones = await getFromLocalStorage('@phones');
            if (phones !== null) {
                setUsersActive(phones);
            }
        };
        setActive();
    }, []);

    useEffect(() => {
        const handler = async (users) => {
            await saveToLocalStorage(users, '@phones');

            setUsersActive(users);
        };
        if (user?.accessToken) {
            socket.current.on('user-active', handler);
        }
    }, [usersActive]);

    const addUserActive2Socket = (phoneNumber) => {
        setUsersActive((prev) => {
            let usersNumber;

            if (!prev.includes(phoneNumber)) {
                usersNumber = [...prev, phoneNumber];
            } else {
                usersNumber = prev;
            }

            socket.current.emit('user', usersNumber);

            saveToLocalStorage(usersNumber, '@phones');

            return usersNumber;
        });
    };

    const removeUserActive2Socket = (phoneNumber) => {
        setUsersActive((prev) => {
            const usersNumber = prev.filter((item) => item !== phoneNumber);

            socket.current.emit('user', usersNumber);

            saveToLocalStorage(usersNumber, '@phones');

            return usersNumber;
        });
    };

    const saveToLocalStorage = async (phoneNumbers, name) => {
        try {
            await AsyncStorage.setItem(name, JSON.stringify(phoneNumbers));
        } catch (error) {
            console.log(error);
        }
    };

    const getFromLocalStorage = async (name) => {
        try {
            const phoneNumbers = await AsyncStorage.getItem(name);
            if (phoneNumbers !== null) {
                // We have data!!
                return JSON.parse(phoneNumbers);
            }
            return [];
        } catch (error) {
            console.log(error);
        }
    };

    const setActiveUser = async (actor, isGroupChat) => {
        const actors = usersActive;
        if (!isGroupChat) {
            
            return actors.some((phone) => phone === (actor?.sender?.phoneNumber || actor?.phoneNumber));
        }

        return actors.some((phone) => {
            const actorInGroupChat = actor?.user?.filter((user) => user?.phoneNumber === phone);
            let phoneActor1 = user?.phoneNumber;

            if (Array.isArray(actorInGroupChat)) {
                phoneActor1 = actorInGroupChat[0]?.phoneNumber;
            }

            //return false if group chat have current user active
            if (phoneActor1 === user?.phoneNumber) {
                return false;
            }

            return phone === phoneActor1;
        });
    };

    const contextValue = { addUserActive2Socket, removeUserActive2Socket, usersActive, setActiveUser };

    return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
}

export { UserContextProvider, UserContext };
