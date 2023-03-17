import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ActivityIndicator, StatusBar, View } from "react-native";
import RoutesLogin from "./src/routes";
import RoutesIsLogged from "./src/routes/RouteIsLogged";
import { auth } from "./src/firebase/Auth";
import { Database } from "./src/firebase/FirebaseHelper";

const App: React.FC = () => {
  const database = new Database();
  const [initialize, setInitialize] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    database.validaLogar();
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
      <StatusBar backgroundColor="rgb(147 51 234)" hidden={false} />
      {user ? <RoutesIsLogged /> : <RoutesLogin />}
    </NavigationContainer>
  );
};

export default App;
