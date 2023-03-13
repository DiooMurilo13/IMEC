import React, { useState, useEffect } from "react";
import { Button } from "../../components/Button";
import { Add, deslogar, Get } from "../../firebase/Auth";
import { useNavigation } from "@react-navigation/native";
import { ScreenView } from "../../@types/file";
import { useForm } from "react-hook-form";
import * as Animatable from "react-native-animatable";
import LoginForm from "../../components/LoginForm";
import { auth, cadastrar } from "../../firebase/Auth";
import { Text, View, KeyboardAvoidingView, ScrollView } from "react-native";
import { Card } from "../../components/Card";
import { db } from "../../Helpers/db";

interface IUser {
  email: string | undefined;
}

const Main: React.FC = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState<IUser>(null);
  const [clientes, setClientes] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const getClientes = async () => {
      setClientes(await Get("Clientes"));
    };
    const deslog = auth.onAuthStateChanged((_user) => {
      setUser(_user);
    });
    setReload(false);
    getClientes();
    return deslog;
  }, [reload]);

  async function signOff() {
    deslogar();
  }

  async function addClient() {
    const values = [
      {
        Nome: "pia3",
        Sobrenome: "PIA3",
        Celular: 11,
      },
      {
        Nome: "pia4",
        Sobrenome: "PIA43",
        Celular: 11,
      },
    ];

    await Add(db.Clientes, values);
  }

  return (
    <View className="flex-1 bg-cyan-700">
      <Animatable.View
        delay={600}
        animation="fadeInUp"
        className="flex-1 bg-cyan-100 rounded-t-3xl"
      >
        <View className="flex-1 my-10">
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
        <Button name="addclient" className="p-10" onPress={addClient} />
        <Button name="deslogar" className="p-10" onPress={signOff} />
      </Animatable.View>
    </View>
  );
};

export default Main;
