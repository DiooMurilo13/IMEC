import React, { useState, useEffect } from "react";
import * as Animatable from "react-native-animatable";
import { View, ScrollView } from "react-native";
import { Text } from "react-native";
import { Database } from "../../firebase/FirebaseHelper";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../Helpers/db";
import { ScreenView } from "../../@types/file";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { auth } from "../../firebase/Auth";
import { CardView } from "../../components/CardView";

const Main: React.FC = () => {
  const database = new Database();
  const navigation = useNavigation();
  const [clientes, setClientes] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const getClientes = async () => {
      setClientes(await database.select(db.clientes));
    };
    getClientes();
    navigation.addListener("focus", () => setReload(!reload));
  }, [reload]);

  function reloads() {
    navigation.navigate(ScreenView.ADDNEWCLIENT);
  }

  return (
    <View className="flex-1 flex-col justify-between bg-slate-200">
      <Animatable.View animation={"fadeInLeft"} delay={600}>
        <View className="flex h-36 justify-center items-center bg-purple-600">
          <Text className="w-full  text-3xl font-bold px-5 text-white">
            Olá, Bem vindo!
          </Text>
        </View>
        <CardView />
      </Animatable.View>
      <View className="justify-between items-center p-3 flex-row">
        <ScrollView horizontal={true}>
          <View className="justify-center items-center flex w-24">
            <Button
              className="bg-gray-400 w-20 h-20"
              onPress={reloads}
              funcao={<Text className="text-3xl">+</Text>}
            />
            <Text className="text-xl font-bold text-center">
              Adicionar Cliente
            </Text>
          </View>
          <View className="justify-center items-center flex w-24">
            <Button
              className="bg-gray-400 w-20 h-20"
              onPress={reloads}
              funcao={<Text className="text-3xl">+</Text>}
            />
            <Text className="text-xl font-bold text-center">
              Adicionar Cliente
            </Text>
          </View>
          <View className="justify-center items-center flex w-24">
            <Button
              className="bg-gray-400 w-20 h-20"
              onPress={reloads}
              funcao={<Text className="text-3xl">+</Text>}
            />
            <Text className="text-xl font-bold text-center">
              Adicionar Cliente
            </Text>
          </View>
          <View className="justify-center items-center flex w-24">
            <Button
              className="bg-gray-400 w-20 h-20"
              onPress={reloads}
              funcao={<Text className="text-3xl">+</Text>}
            />
            <Text className="text-xl font-bold text-center">
              Adicionar Cliente
            </Text>
          </View>
          <View className="justify-center items-center flex w-24">
            <Button
              className="bg-gray-400 w-20 h-20"
              onPress={reloads}
              funcao={<Text className="text-3xl">+</Text>}
            />
            <Text className="text-xl font-bold text-center">
              Adicionar Cliente
            </Text>
          </View>
        </ScrollView>
      </View>

      <Animatable.View
        delay={600}
        animation="fadeInUp"
        className="flex-1 rounded-t-3xl bg-slate-400"
      >
        <View className="flex-1">
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
      </Animatable.View>
    </View>
  );
};

export default Main;
