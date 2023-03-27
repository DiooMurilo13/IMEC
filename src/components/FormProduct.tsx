import React, { useState } from "react";
import { Text, View, TextInput, KeyboardAvoidingView } from "react-native";
import { Control, Controller, FieldErrors, FormState } from "react-hook-form";

interface Form {
  control: Control<any, any>;
  errors: any;
  name: string;
}

function FormProduct({ control, errors, name }: Form) {
  return (
    <>
      <View className="flex-1">
        <Text className="text-center pt-20 text-5xl text-purple-500 font-bold">
          {name}
        </Text>
        <View className=" justify-between py-10 px-5">
          <Text className="font-bold text-2xl text-purple-500">Nome</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Digite o nome do produto/serviço"
                className="border-b-4 border-b-purple-500"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="nome"
            rules={{ required: true }}
          />
        </View>
        {errors.nome && <Text>Adicione Nome.</Text>}
      </View>
    </>
  );
}
export default FormProduct;
