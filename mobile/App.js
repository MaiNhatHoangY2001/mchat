import AppWrapper from './src/AppWrapper';
import { store, persistor } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { ChatContextProvider } from './src/context/ChatContext';
import { UserContextProvider } from './src/context/UserContext';

export default function App() {
    return (
        <Provider store={store}>
            <UserContextProvider>
                <ChatContextProvider>
                    <PersistGate persistor={persistor}>
                        <AppWrapper />
                    </PersistGate>
                </ChatContextProvider>
            </UserContextProvider>
        </Provider>
    );
}
