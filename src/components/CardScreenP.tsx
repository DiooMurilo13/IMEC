import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styled } from "nativewind";
import { TextInput } from "react-native";
import { condition } from "../Helpers/Interfaces/Condition";
import { Database } from "../firebase/FirebaseHelper";
import { useNavigation } from "@react-navigation/native";
import { Where } from "../firebase/Where";
import { db } from "../Helpers/db";

interface ICardFormProps {
  descricao?: string;
  id?: number;
  onPress?: (
    e?: React.BaseSyntheticEvent<object, any, any>
  ) => Promise<void> | void;
}

function CardStyledTPs({ descricao, id, onPress, ...rest }: ICardFormProps) {
  return (
    <>
      <View className="m-3 text-start">
        <TouchableOpacity
          className="flex-col h-28  bg-blue-700 rounded-3xl pl-5"
          {...rest}
          onPress={onPress}
        >
          <View className="flex-row justify-between pr-10 flex-1 items-center ">
            <Text className="font-bold text-2xl text-myColor-300">
              {descricao.toUpperCase()}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}
const CardScreenP = styled(CardStyledTPs);
export { CardScreenP };
