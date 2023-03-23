import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ScreenView } from "../@types/file";
import { Button } from "./Button";

const navigation = useNavigation();
function reloads() {
  navigation.navigate(ScreenView.ADDNEWCLIENT);
}

const HorizontalScrollBarMain: React.FC = () => {
  return (
    <>
      <View className="justify-center items-center flex w-24">
        <Button
          className="bg-gray-400 w-20 h-20"
          onPress={reloads}
          funcao={<Icon name="account-arrow-up" size={30} color="#FAFAFA" />}
        />
        <Text className="text-xl font-bold text-center">Adicionar Cliente</Text>
      </View>
      <View className="justify-center items-center flex w-24">
        <Button
          className="bg-gray-400 w-20 h-20"
          onPress={reloads}
          funcao={<Text className="text-3xl">+</Text>}
        />
        <Text className="text-xl font-bold text-center">Adicionar Cliente</Text>
      </View>
      <View className="justify-center items-center flex w-24">
        <Button
          className="bg-gray-400 w-20 h-20"
          onPress={reloads}
          funcao={<Text className="text-3xl">+</Text>}
        />
        <Text className="text-xl font-bold text-center">Adicionar Cliente</Text>
      </View>
      <View className="justify-center items-center flex w-24">
        <Button
          className="bg-gray-400 w-20 h-20"
          onPress={reloads}
          funcao={<Text className="text-3xl">+</Text>}
        />
        <Text className="text-xl font-bold text-center">Adicionar Cliente</Text>
      </View>
      <View className="justify-center items-center flex w-24">
        <Button
          className="bg-gray-400 w-20 h-20"
          onPress={reloads}
          funcao={<Text className="text-3xl">+</Text>}
        />
        <Text className="text-xl font-bold text-center">Adicionar Cliente</Text>
      </View>
    </>
  );
};

export default HorizontalScrollBarMain;
