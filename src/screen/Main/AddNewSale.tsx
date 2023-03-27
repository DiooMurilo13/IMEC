import React, { useEffect, useState } from "react";
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
import FormSell from "../../components/FormSell";
import CameraComponent from "../../components/Camera";

function AddNewSale() {
  const navigation = useNavigation();
  const [optionClient, setOptionClient] = useState([]);
  const [optionP, setOptionP] = useState([]);
  const [optionTP, setOptionTP] = useState([]);
  const [imgUrl, setImgUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const addValue = new AddValue();

  const database = new Database();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const get = async () => {
      const client = await database.select(db.cliente);
      const tipoProduto = await database.select(db.tipoProduto);
      const tipoPagamento = await database.select(db.tipoPagamento);

      setOptionClient(client);
      setOptionP(tipoProduto);
      setOptionTP(tipoPagamento);
    };
    get();
  }, []);

  async function handleAdd(data) {
    addValue.newList();
    addValue.addNewOperation(
      data.cliente.ClienteId,
      data.meioPagamento.TipoPagamentoId,
      data.produto.TipoProdutoId,
      data.descricao
    );
    const insert = await database.insert(
      db.operacao,
      addValue.operationList,
      addValue.histList
    );

    console.log(insert);
  }

  return (
    <View className="flex-1 bg-purple-600">
      <Animatable.View
        delay={600}
        animation="fadeInUp"
        className="flex-1 bg-cyan-100 rounded-t-2xl mt-5 "
      >
        <Text>{progress}</Text>
        <FormSell
          control={control}
          name={"Venda"}
          errors={errors}
          optionClient={optionClient}
          optionP={optionP}
          optionTP={optionTP}
        />

        <View className="items-center mb-5">
          <Button
            className="h-20 w-80 mt-10"
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

export default AddNewSale;
