import { View } from "react-native";
import { Route, Routes, NativeRouter } from "react-router-native";
import { Home } from "./components/pages";
import { publicRoutes } from "./routes";

function AppWrapper() {
  return (
    <NativeRouter>
      <View>
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            return <Route key={index} path={route.path} element={<Page />} />;
          })}
        </Routes>
      </View>
    </NativeRouter>
  );
}

export default AppWrapper;
