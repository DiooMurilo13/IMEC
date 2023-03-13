import React, { useState, useEffect } from "react";
import { condition, Get, MyWhere } from "../../firebase/Auth";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import { Text, View } from "react-native";

export interface ICliente {
  id: any;
  Nome: string;
  Sobrenome: string;
  Celular: number;
}

const CardHistory: React.FC<ICliente> = () => {
  const navigation = useNavigation();
  const [clienteHistory, setClienteHistory] = useState([]);
  const route = useRoute<RouteProp<Record<string, ICliente>, string>>();

  useEffect(() => {
    const getClientes = async () => {
      setClienteHistory(await Get(`Clientes/${route.params.id}/Historico`));
    };

    getClientes();
  }, []);

  return (
    <View className="flex-1 bg-cyan-700">
      <Animatable.View
        animation="fadeInUp"
        className="flex-1 bg-cyan-100 rounded-t-3xl"
      >
        <View>
          {clienteHistory.map((user) => {
            return <Text key={user.id}>{user?.Acao}</Text>;
          })}
        </View>
      </Animatable.View>
    </View>
  );
};

export default CardHistory;
