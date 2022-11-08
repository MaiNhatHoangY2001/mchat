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
        } else {
            setEmitUserPhone();
        }
    }, []);

    useEffect(() => {
        setEmitUserPhone();
        vis(function () {
            //document.title = vis() ? 'Visible' : 'Not visible';
            if (vis()) addUserActive2Socket(user?.phoneNumber);
            else removeUserActive2Socket(user?.phoneNumber);
        });
    }, []);

    const setEmitUserPhone = () => {
        const handler = (users) => {
            setUsersActive(users);
            saveToLocalStorage(users, 'phones');
        };
        if (user?.accessToken) {
            socket.current.on('user-active', handler);
        }
    };

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
        setUsersActive(() => {
            const phones = getFromLocalStorage('phones');
            const usersNumber = phones.filter((item) => item !== phoneNumber);
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

    // Detect if browser tab is active or user has switched away
    const vis = (function () {
        var stateKey,
            eventKey,
            keys = {
                hidden: 'visibilitychange',
                webkitHidden: 'webkitvisibilitychange',
                mozHidden: 'mozvisibilitychange',
                msHidden: 'msvisibilitychange',
            };
        for (stateKey in keys) {
            if (stateKey in document) {
                eventKey = keys[stateKey];
                break;
            }
        }
        return function (c) {
            if (c) document.addEventListener(eventKey, c);
            return !document[stateKey];
        };
    })();

    const contextValue = { addUserActive2Socket, removeUserActive2Socket, usersActive, setActiveUser };

    return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
}

export { UserContextProvider, UserContext };
