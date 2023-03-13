import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CardHistory from "../screen/Main/CardHistory";
import Main from "../screen/Main/Main";

const Stack = createNativeStackNavigator();

export default function RoutesIsLogged() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={Main}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CardHistory"
        component={CardHistory}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
