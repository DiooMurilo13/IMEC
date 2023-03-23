import React, { useState, useEffect } from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import { FlatList, View } from "react-native";
import { Database } from "../../firebase/FirebaseHelper";
import { db } from "../../Helpers/db";
import { Card } from "../../components/Card";
import Search from "../../components/Search";
import { Where } from "../../firebase/Where";
import { condition } from "../../Helpers/Interfaces/Condition";

export interface ICliente {
  id: string | number | any;
}
interface Props {
  item: {
    id: string;
    desc: string;
    nome: string;
    dataCadastro: string;
  };
}

function CardHistory() {
  const where = new Where();
  const database = new Database();
  const [clienteHistory, setClienteHistory] = useState([]);
  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
  const route = useRoute<RouteProp<Record<string, ICliente>, string>>();
  where.add(db.tipoPagamentoId, condition.EQUALS, route.params.id);

  useEffect(() => {
    const getClientes = async () => {
      const clientes = await database.select(
        db.operacao,
        where.list,
        db.clientes
      );
      setClienteHistory(clientes); //tive que fazer isso por que quando eu fiz da forma de inserir clientehistory como default value de usuariosfiltrados, deu ruim é isso rs
      setUsuariosFiltrados(clientes);
    };

    getClientes();
  }, []);

  const handleSearch = (nome) => {
    const usuariosFiltradosa = clienteHistory.filter((usuario) =>
      usuario.nome.toLowerCase().includes(nome.toLowerCase())
    );
    setUsuariosFiltrados(
      usuariosFiltradosa.length > 0 ? usuariosFiltradosa : clienteHistory // do caralho esse if aq
    );
  };
  const renderItem = ({ item }: Props) => (
    <Card
      descricao={item.desc}
      key={item.id}
      name={item.nome}
      data={item.dataCadastro}
    />
  );

  return (
    <View className="flex-1 bg-purple-600">
      <Animatable.View
        delay={600}
        animation="fadeInUp"
        className="flex-1 bg-cyan-100 rounded-t-3xl mt-5"
      >
        <View className="mt-14"></View>
        <Search onSearch={handleSearch} />
        <View className="flex-1">
          <FlatList
            data={usuariosFiltrados}
            renderItem={renderItem}
            keyExtractor={(item) => item?.id?.toString()}
            contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </Animatable.View>
    </View>
  );
}

export default CardHistory;
