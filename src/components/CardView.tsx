import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styled } from "nativewind";
import { TextInput } from "react-native";

interface ICardFormProps {
  value?: string;
  funcao?: any;
  onPress?: (
    e?: React.BaseSyntheticEvent<object, any, any>
  ) => Promise<void> | void;
}

function CardStyled({ value, funcao, onPress, ...rest }: ICardFormProps) {
  return (
    <>
      <View className="m-3 text-start">
        <TouchableOpacity
          className="justify-center bg-gray-100 rounded-xl py-10 -mt-12"
          {...rest}
          onPress={onPress}
        >
          <View className="flex flex-row justify-between">
            <View className="flex-1">
              <Text className="text-gray-300 font-bold text-2xl text-start pl-5 items-center w-full">
                Saldo
              </Text>
              <Text className="text-gray-300  text-lg text-start pl-5 items-center w-full">
                R$ <Text className="text-2xl text-green-500">{"1000,00"}</Text>
              </Text>
            </View>
            <View className="flex-1 pl-14">
              <Text className="text-gray-300 font-bold text-2xl text-left pl-5 items-center w-full">
                Custos
              </Text>
              <Text className="text-gray-300 text-lg text-start pl-5 items-center w-full">
                R$ <Text className="text-2xl text-red-500">-{"390,00"}</Text>
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}
const CardView = styled(CardStyled);
export { CardView };
