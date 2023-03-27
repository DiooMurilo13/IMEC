import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddNewClient from "../screen/Main/AddNewClient";
import CardHistory from "../screen/Main/CardHistory";
import Main from "../screen/Main/Main";
import AddNewProduct from "../screen/Main/AddNewProduct";
import AddNewSale from "../screen/Main/AddNewSale";

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
      <Stack.Screen
        name="AddNewClient"
        component={AddNewClient}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddNewProduct"
        component={AddNewProduct}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddNewSale"
        component={AddNewSale}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
