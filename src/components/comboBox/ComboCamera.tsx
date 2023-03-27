import React, { useEffect, useRef, useState } from "react";
import { Text, View, FlatList, Modal } from "react-native";
import { Button } from "../Button";
import Search from "../Search";
import { CardScreenTP } from "../CardScreenTP";
import CameraComponent from "../Camera";
import { Camera } from "expo-camera";

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

function ComboCamera({ value, onPress, defaultValue }: Form) {
  const [modalVisible, setModalVisible] = useState(false);

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
              {value ? "Foto selecionada!" : `${defaultValue}`}
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
            <CameraComponent onPress={HandlePress} />
          </View>
        </Modal>
      </View>
    </>
  );
}
export default ComboCamera;
