import AppWrapper from './src/AppWrapper';
import { store, persistor } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <AppWrapper />
            </PersistGate>
        </Provider>
    );
}
