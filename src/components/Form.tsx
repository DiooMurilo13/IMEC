import React, { useState } from "react";
import { Text, View, TextInput, KeyboardAvoidingView } from "react-native";
import { Control, Controller, FieldErrors, FormState } from "react-hook-form";
import { TextInputMask } from "react-native-masked-text";
import DropDownPicker from "react-native-dropdown-picker";
import { Keyboard } from "react-native";
import ComboBox from "./ComboBox";

interface Form {
  control: Control<any, any>;
  errors: any;
  name: string;
}

const Form: React.FC<Form> = ({ control, errors, name }: Form) => {
  return (
    <>
      <View className="flex-1">
        <KeyboardAvoidingView behavior={"padding"} className="flex-1">
          <Text className="text-center pt-20 text-5xl text-purple-500 font-bold">
            {name}
          </Text>
        </KeyboardAvoidingView>
        <View className=" justify-between py-5 px-5 mb-40">
          <Text className="font-bold text-2xl text-purple-500">Nome</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Digite o nome completo do cliente"
                className="border-b-4 border-b-purple-500 py-2"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="nome"
            rules={{ required: true }}
          />
          {errors.nome && <Text>Adicione Nome.</Text>}

          <Text className="font-bold text-2xl pt-5 text-purple-500">
            Telefone
          </Text>

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInputMask
                className="border-b-4 border-b-purple-500 py-2"
                placeholder="Digite o nome completo do cliente"
                onBlur={onBlur}
                type={"cel-phone"}
                options={{
                  maskType: "BRL",
                  withDDD: true,
                  dddMask: "(99) ",
                }}
                value={value}
                onChangeText={(value) => onChange(value)}
              />
            )}
            name="telefone"
            rules={{ required: true, minLength: 15 }}
          />
          {errors.telefone && <Text>Adicione o Telefone.</Text>}

          <Text className="font-bold text-2xl pt-5 text-purple-500">
            Endereço
          </Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Digite o endereço completo do cliente"
                className="border-b-4 border-b-purple-500 py-2 mb-5"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="endereco"
            rules={{ required: true }}
          />
          {errors.endereco && <Text>Adicione Endereco.</Text>}
        </View>
      </View>
    </>
  );
};
export default Form;
