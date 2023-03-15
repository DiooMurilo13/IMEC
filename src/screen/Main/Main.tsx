import React, { useState, useEffect } from "react";
import { Button } from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import { ScreenView } from "../../@types/file";
import * as Animatable from "react-native-animatable";
import { View, ScrollView } from "react-native";
import { Card } from "../../components/Card";
import { Database } from "../../firebase/FirebaseHelper";
import { AddValue } from "../../firebase/AddValue";
import { db } from "../../Helpers/db";
import { Where } from "../../firebase/Where";
import { condition } from "../../Helpers/Interfaces/Condition";

const Main: React.FC = () => {
  const database = new Database();

  const where = new Where();
  where.add("Nome", condition.EQUALS, "Pedro");
  where.add("Nome", condition.NOT_EQUALS, "jose");

  const navigation = useNavigation();
  const [clientes, setClientes] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const getClientes = async () => {
      setClientes(await database.select(db.clientes, where.list));
    };

    setReload(false);
    getClientes();
  }, [reload]);

  async function teste() {
    const value = new AddValue();
    value.addNewClient("Pedro", "sobrenome", 60000000);
    value.addNewHist("cadastrou");

    database.insert(db.clientes, value.clientList, value.histList);
  }

  async function signOff() {
    database.deslogar();
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
                  name={user.Nome}
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
            name="deslogar"
            className="bg-cyan-400 w-20 h-20 mb-10 mr-5"
            onPress={teste}
          />
        </View>
      </Animatable.View>
    </View>
  );
};

export default Main;
