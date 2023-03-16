import React, { useState, useEffect } from "react";
import { Button } from "../../components/Button";
import { ScreenView } from "../../@types/file";
import * as Animatable from "react-native-animatable";
import { View, ScrollView } from "react-native";
import { Card } from "../../components/Card";
import { Database } from "../../firebase/FirebaseHelper";
import { AddValue } from "../../firebase/AddValue";
import { db } from "../../Helpers/db";
import { Text } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { ICliente } from "./CardHistory";
import { auth } from "../../firebase/Auth";

const Main: React.FC = () => {
  const database = new Database();
  const navigation = useNavigation();
  const [clientes, setClientes] = useState([]);
  const [user, setUser] = useState(null);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const getClientes = async () => {
      setClientes(await database.select(db.clientes));
    };
    console.log("aa");

    getClientes();

    navigation.addListener("focus", () => setReload(!reload));
  }, [reload]);

  function reloads() {
    navigation.navigate(ScreenView.ADDNEWCLIENT);
  }

  return (
    <View className="flex-1 bg-cyan-700">
      <Animatable.View
        delay={600}
        animation="fadeInUp"
        className="flex-1 bg-cyan-100 rounded-t-3xl"
      >
        <View className="flex-1 ">
          <ScrollView>
            {clientes.map((user) => {
              return (
                <Card
                  key={user.id}
                  name={user.nome}
                  onPress={() =>
                    navigation.navigate(ScreenView.CARDHISTORY, { id: user.id })
                  }
                />
              );
            })}
          </ScrollView>
        </View>
        <View className="h-1 justify-end items-end">
          <Button
            className="bg-blue-400 w-20 h-20 mb-10 mr-5"
            onPress={reloads}
            funcao={<Text className="text-3xl">+</Text>}
          />
        </View>
      </Animatable.View>
    </View>
  );
};

export default Main;
