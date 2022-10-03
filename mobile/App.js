import AppWrapper from "./src/AppWrapper";
//import GlobalStyles from "./src/components/GlobalStyles";
// import { store, persistor } from "./redux/store";
// import { PersistGate } from "redux-persist/integration/react";
// import Loading from "./components/Layout/Loading/Loading";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <GlobalStyles>
          <AppWrapper />
        </GlobalStyles>
      </PersistGate>
    </Provider>
  );
}
