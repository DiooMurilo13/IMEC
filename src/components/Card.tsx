import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styled } from "nativewind";
import { TextInput } from "react-native";

interface ICardFormProps {
  descricao?: string;
  name?: string;
  funcao?: any;
  onPress?: (
    e?: React.BaseSyntheticEvent<object, any, any>
  ) => Promise<void> | void;
  data?: string;
}

function CardStyled({
  descricao,
  name,
  funcao,
  onPress,
  data,
  ...rest
}: ICardFormProps) {
  return (
    <>
      <View className="m-3 text-start">
        <TouchableOpacity
          className="flex-col h-28 justify-between bg-blue-700 rounded-3xl pl-5"
          {...rest}
          onPress={onPress}
        >
          <View className="mt-3">
            <Text className="font-bold text-2xl text-myColor-100 ">
              {descricao}
            </Text>
          </View>
          <View className="flex-row justify-between pr-5">
            <Text className="font-bold text-lg text-myColor-300 ">
              {name.toUpperCase()}
            </Text>
            <Text className="text-lg font-bold text-green-500">R$ 350,00</Text>
          </View>
          <View className="mb-3">
            <Text className="font-bold text-lg text-myColor-200 ">{data}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}
const Card = styled(CardStyled);
export { Card };
