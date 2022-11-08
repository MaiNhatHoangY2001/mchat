import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { url } from '../redux/createInstance';

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
        const phones = getFromLocalStorage('phones');

        if (phones !== null) {
            setUsersActive(phones);
        }
    }, []);

    useEffect(() => {
        const handler = (users) => {
            setUsersActive(users);
            saveToLocalStorage(users, 'phones');
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

            saveToLocalStorage(usersNumber, 'phones');

            return usersNumber;
        });
    };

    const removeUserActive2Socket = (phoneNumber) => {
        setUsersActive((prev) => {
            const usersNumber = prev.filter((item) => item !== phoneNumber);

            socket.current.emit('user', usersNumber);

            saveToLocalStorage(usersNumber, 'phones');

            return usersNumber;
        });
    };

    const saveToLocalStorage = (phoneNumbers, name) => {
        localStorage.setItem(name, JSON.stringify(phoneNumbers));
    };

    const getFromLocalStorage = (name) => {
        return JSON.parse(localStorage.getItem(name));
    };

    const setActiveUser = (actor, isGroupChat) => {
        if (!isGroupChat) {
            return usersActive.some((phone) => phone === (actor?.sender?.phoneNumber || actor?.phoneNumber));
        }

        return usersActive.some((phone) => {
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
