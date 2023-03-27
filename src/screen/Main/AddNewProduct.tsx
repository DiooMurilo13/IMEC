import React from "react";
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
import FormProduct from "../../components/FormProduct";

function AddNewProduct() {
  const navigation = useNavigation();
  const database = new Database();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function handleAdd(data) {
    const value = new AddValue();
    value.newList();
    await value.addNewProduct(
      data.nome //lembrar de pegar esse cara inteiro e jogar pra dentro do firebaseHelper
    );

    await database.insert(db.tipoProduto, value.productList, value.histList);
    navigation.navigate(ScreenView.MAIN);
  }

  return (
    <View className="flex-1 bg-purple-600">
      <Animatable.View
        delay={600}
        animation="fadeInUp"
        className="flex-1 bg-cyan-100 rounded-t-3xl mt-5 "
      >
        <FormProduct
          control={control}
          name={"Produto/Serviço"}
          errors={errors}
        />
        <View className=" justify-center items-center mb-5">
          <Button
            className="h-20 w-80 "
            funcao={
              <Text className="text-2xl font-bold text-myColor-100">
                Cadastro
              </Text>
            }
            onPress={handleSubmit(handleAdd)}
          />
        </View>
      </Animatable.View>
    </View>
  );
}

export default AddNewProduct;
