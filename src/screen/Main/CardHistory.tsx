import React, { useState, useEffect } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import { Text, View } from "react-native";
import { Database } from "../../firebase/FirebaseHelper";

export interface ICliente {
  reload: boolean;
  id: any;
}

const CardHistory: React.FC<ICliente> = () => {
  const database = new Database();
  const [clienteHistory, setClienteHistory] = useState([]);
  const route = useRoute<RouteProp<Record<string, ICliente>, string>>();

  useEffect(() => {
    const getClientes = async () => {
      setClienteHistory(
        await database.select(`Clientes/${route.params.id}/historico`)
      );
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
