import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { styled } from "nativewind";

interface ILoginFormProps {
  name?: string;
  funcao?: any;
  onPress: (
    e?: React.BaseSyntheticEvent<object, any, any>
  ) => Promise<void> | void;
}

function ButtonStyled({ name, funcao, onPress, ...rest }: ILoginFormProps) {
  return (
    <>
      <TouchableOpacity
        className="items-center justify-center bg-blue-700 rounded-full"
        {...rest}
        onPress={onPress}
      >
        {!!funcao && funcao}
        {!!name && <Text>{name}</Text>}
      </TouchableOpacity>
    </>
  );
}
const Button = styled(ButtonStyled);
export { Button };
