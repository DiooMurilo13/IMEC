import React, { useState, useEffect } from "react";
import { Button } from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import { ScreenView } from "../../@types/file";
import * as Animatable from "react-native-animatable";
import { View } from "react-native";
import { Database } from "../../firebase/FirebaseHelper";
import { AddValue } from "../../firebase/AddValue";
import { db } from "../../Helpers/db";
import { Text } from "react-native";
import Form from "../../components/Form";
import { useForm } from "react-hook-form";

const AddNewClient: React.FC = () => {
  const navigation = useNavigation();
  const database = new Database();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function handleAdd(data) {
    const value = new AddValue();
    value.addNewClient(
      data.nome,
      data.telefone,
      data.endereco,
      data.meioPagamento,
      "Cadastrou"
    );
    await database.insert(db.clientes, value.clientList, value.histList);
    navigation.navigate(ScreenView.MAIN);
  }

  return (
    <View className="flex-1 bg-cyan-700">
      <Animatable.View
        delay={600}
        animation="fadeInUp"
        className="flex-1 bg-cyan-100 rounded-t-3xl "
      >
        <Form control={control} name={"Cadastro"} errors={errors} />
        <View className=" justify-center items-center mb-5">
          <Button
            className="h-16 w-80 "
            funcao={<Text className="text-2xl font-bold">Cadastro</Text>}
            onPress={handleSubmit(handleAdd)}
          />
        </View>
      </Animatable.View>
    </View>
  );
};

export default AddNewClient;
