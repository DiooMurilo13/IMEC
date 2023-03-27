import React, { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { Control, Controller } from "react-hook-form";
import ComboModalTP from "./comboBox/ComboBoxTP";
import ComboModal from "./comboBox/ComboModal";
import ComboModalP from "./comboBox/ComboBoxP";
import ComboCamera from "./comboBox/ComboCamera";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface Form {
  control: Control<any, any>;
  errors: any;
  name: string;
  optionClient: any[];
  optionP: any[];
  optionTP: any[];
}

function FormSell({
  control,
  errors,
  name,
  optionClient,
  optionP,
  optionTP,
}: Form) {
  return (
    <>
      <KeyboardAwareScrollView>
        <View className="flex-1">
          <Text className="text-center pt-8 text-5xl text-purple-500 font-bold">
            {name}
          </Text>
          <View className=" justify-between  px-5">
            <Text className="font-bold text-2xl text-purple-500">Cliente</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <ComboModal
                  defaultValue="Cliente"
                  option={optionClient}
                  onPress={(value) => onChange(value)}
                  value={value}
                />
              )}
              name="cliente"
              rules={{ required: true }}
            />
            {errors.cliente && <Text>Selecione o cliente.</Text>}

            <Text className="font-bold text-2xl text-purple-500">Produto</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <ComboModalTP
                  defaultValue="Produto"
                  option={optionP}
                  onPress={(value) => onChange(value)}
                  value={value}
                />
              )}
              name="produto"
              rules={{ required: true }}
            />
            {errors.produto && <Text>Selecione o tipo de produto.</Text>}

            <Text className="font-bold text-2xl text-purple-500">
              Meio de Pagamento
            </Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <ComboModalP
                  defaultValue="meio de pagamento"
                  option={optionTP}
                  onPress={(value) => onChange(value)}
                  value={value}
                />
              )}
              name="meioPagamento"
              rules={{ required: true }}
            />
            {errors.meioPagamento && (
              <Text>Selecione o meio de pagamento.</Text>
            )}
          </View>

          <Text className="mx-5 font-bold text-2xl text-purple-500">
            Descricao
          </Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Digite o nome do produto/serviço"
                className="mx-5 border-b-4 border-b-purple-500 mb-10"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="descricao"
          />
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}
export default FormSell;
