import React, { useEffect, useState } from "react";
import { Text, View, FlatList, Modal } from "react-native";
import { Button } from "../Button";
import Search from "../Search";
import { Card } from "../Card";

interface Form {
  option: any[];
  onPress: (
    e?: React.BaseSyntheticEvent<object, any, any>
  ) => void | Promise<void>;
  value: {
    nome: string;
  };
  defaultValue: string;
}

function ComboModal({ option, value, onPress, defaultValue }: Form) {
  const [obj, setObj] = useState([]);
  const [objFiltrado, setObjFiltrado] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setObj(option);
    setObjFiltrado(option);
  }, [option]);

  const handleSearch = (nome) => {
    const usuariosFiltradosa = obj.filter((usuario) =>
      usuario.nome.toLowerCase().includes(nome.toLowerCase())
    );
    setObjFiltrado(
      usuariosFiltradosa.length > 0 ? usuariosFiltradosa : obj // do caralho esse if aq
    );
  };
  function HandlePress(item) {
    onPress(item);
    setModalVisible(false);
  }

  return (
    <>
      <View className="bg-cyan-100">
        <Button
          onPress={() => setModalVisible(true)}
          className="h-20 w-full"
          funcao={
            <Text className="text-2xl font-bold text-myColor-100">
              {value ? value.nome : `Selecione o ${defaultValue}`}
            </Text>
          }
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View className="flex-1 rounded-t-xl bg-cyan-100">
            <View className="mt-10">
              <Search onSearch={handleSearch} name={"Cliente..."} />
            </View>
            <FlatList
              data={objFiltrado}
              renderItem={({ item }) => (
                <Card
                  key={item.id} // add a unique "key" prop here
                  descricao={item.nome}
                  name={item.endereco}
                  data={item.dataCadastro}
                  onPress={() => HandlePress(item)}
                />
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        </Modal>
      </View>
    </>
  );
}
export default ComboModal;
