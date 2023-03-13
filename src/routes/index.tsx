import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CadastroScreen from "../screen/Login/CadastroScreen";

import Home from "../screen/Login/Home";
import LoginScreen from "../screen/Login/LoginScreen";
import Main from "../screen/Main/Main";

const Stack = createNativeStackNavigator();

export default function RoutesLogin() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CadastroScreen"
        component={CadastroScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
