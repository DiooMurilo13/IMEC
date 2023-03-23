import React, { useState, useEffect } from "react";
import * as Animatable from "react-native-animatable";
import { ScrollView, Text, View } from "react-native";
import { Database } from "../../firebase/FirebaseHelper";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../Helpers/db";
import { ScreenView } from "../../@types/file";
import { Button } from "../../components/Button";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { CardView } from "../../components/CardView";
import { CardScreen } from "../../components/CardScreen";

const Main: React.FC = () => {
  const database = new Database();
  const navigation = useNavigation();
  const [tipoPagamento, setTipoPagamento] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const getClientes = async () => {
      const tipoPagamento = await database.select(db.tipoPagamento);
      setTipoPagamento(tipoPagamento);
    };

    getClientes();
    navigation.addListener("focus", () => setReload(!reload));
  }, [reload]);

  async function onPress() {
    navigation.navigate(ScreenView.ADDNEWCLIENT);
  }

  //nao componentizei nada aqui, to fazendo aos poucos.

  return (
    <>
      <View className="flex-1 flex-col justify-between bg-slate-200">
        <Animatable.View animation={"fadeInLeft"}>
          <View className="flex h-36 justify-center items-center bg-purple-600">
            <Text className="w-full  text-3xl font-bold px-5 text-white">
              Olá, Bem vindo!
            </Text>
          </View>
          <CardView />
        </Animatable.View>
        <Animatable.View
          animation={"fadeInRight"}
          className="justify-between items-center p-3 flex-row"
        >
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View className="justify-center items-center flex w-24">
              <Button
                className="bg-gray-400 w-20 h-20"
                onPress={onPress}
                funcao={
                  <Icon name="account-arrow-up" size={30} color="#FAFAFA" />
                }
              />
              <Text className="text-xl font-bold text-center">
                Adicionar Cliente
              </Text>
            </View>
          </ScrollView>
        </Animatable.View>

        <Animatable.View
          delay={800}
          animation="fadeInUp"
          className="flex-1 rounded-t-3xl bg-blue-50"
        >
          <View className="flex-1  rounded-t-3xl">
            <ScrollView className="mt-5">
              {tipoPagamento.map((user) => {
                return (
                  <CardScreen
                    key={user.id}
                    descricao={user.descricao}
                    id={user.TipoPagamentoId}
                    onPress={() =>
                      navigation.navigate(ScreenView.CARDHISTORY, {
                        id: user.TipoPagamentoId,
                      })
                    }
                  />
                );
              })}
            </ScrollView>
          </View>
        </Animatable.View>
      </View>
    </>
  );
};

export default Main;
