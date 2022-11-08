import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import GlobalStyles from './components/GlobalStyles';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import Loading from './components/Layout/Loading/Loading';
import { ChatContextProvider } from './context/ChatContext';
import { UserContextProvider } from './context/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <PersistGate loading={<Loading />} persistor={persistor}>
            <UserContextProvider>
                <ChatContextProvider>
                    <GlobalStyles>
                        <App />
                    </GlobalStyles>
                </ChatContextProvider>
            </UserContextProvider>
        </PersistGate>
    </Provider>,
);
