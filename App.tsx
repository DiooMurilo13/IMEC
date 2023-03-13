import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ActivityIndicator, StatusBar, View } from "react-native";
import RoutesLogin from "./src/routes";
import { auth, validaLogar } from "./src/firebase/Auth";
import RoutesIsLogged from "./src/routes/RouteIsLogged";

const App: React.FC = () => {
  const [initialize, setInitialize] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    validaLogar();
    const deslog = auth.onAuthStateChanged((_user) => {
      setUser(_user);
      if (initialize) {
        setInitialize(false);
      }
    });
    return deslog;
  }, []);

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="rgb(14,116,144)" hidden={false} />
      {user ? <RoutesIsLogged /> : <RoutesLogin />}
    </NavigationContainer>
  );
};

export default App;
