import React, { useEffect, useState } from "react";
import { Text, View, FlatList, Modal } from "react-native";
import { Button } from "../Button";
import Search from "../Search";
import { CardScreenTP } from "../CardScreenTP";

interface Form {
  option: any[];
  onPress: (
    e?: React.BaseSyntheticEvent<object, any, any>
  ) => void | Promise<void>;
  value: {
    descricao: string;
  };
  defaultValue: string;
}

function ComboModalP({ option, value, onPress, defaultValue }: Form) {
  const [obj, setObj] = useState([]);
  const [objFiltrado, setObjFiltrado] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setObj(option);
    setObjFiltrado(option);
  }, [option]);

  const handleSearch = (nome) => {
    const usuariosFiltradosa = obj.filter((usuario) =>
      usuario.descricao.toLowerCase().includes(nome.toLowerCase())
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
          className="h-20 w-full rounded-lg"
          funcao={
            <Text className="text-2xl font-bold text-myColor-100">
              {value ? value.descricao : `Selecione o ${defaultValue}`}
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
              <Search onSearch={handleSearch} name={"Produto..."} />
            </View>
            <FlatList
              data={objFiltrado}
              renderItem={({ item }) => (
                <CardScreenTP
                  key={item.id} // add a unique "key" prop here
                  descricao={item.descricao}
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
export default ComboModalP;
