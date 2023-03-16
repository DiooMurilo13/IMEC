import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styled } from "nativewind";

interface ICardFormProps {
  name?: string;
  funcao?: any;
  onPress?: (
    e?: React.BaseSyntheticEvent<object, any, any>
  ) => Promise<void> | void;
}

function CardStyled({ name, funcao, onPress, ...rest }: ICardFormProps) {
  return (
    <>
      <View className="m-3 text-start">
        <TouchableOpacity
          className=" items-center flex-row justify-center bg-green-500 rounded-2xl py-10"
          {...rest}
          onPress={onPress}
        >
          {!!funcao && funcao}
          {!!name && (
            <Text
              numberOfLines={1}
              className="bg-blue-400 font-bold text-4xl text-start pl-5 items-center w-full"
            >
              {name}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </>
  );
}
const Card = styled(CardStyled);
export { Card };
