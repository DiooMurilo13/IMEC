import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import { ScreenView } from "../../@types/file";
import { Button } from "../../components/Button";

const Home: React.FC = () => {
  const navigation = useNavigation();

  return (
    <>
      <View className="flex flex-1 flex-col bg-cyan-700">
        <View className="flex flex-1 flex-row items-center justify-center">
          <Animatable.Image
            animation={"flipInY"}
            source={require("../../../img/logo.png")}
            className={"w-80"}
            resizeMode="contain"
          />
        </View>
        <Text className="text-center text-green-500 text-5xl font-bold bottom-14">
          Bem Vindo(A)
        </Text>

        <Animatable.View
          delay={600}
          animation="fadeInUp"
          className="flex flex-col rounded-t-3xl bg-cyan-100 h-2/6"
        >
          <Text className="flex-1 justify-center items-center text-center top-14  text-5xl text-green-500 font-bold">
            ScaleBuilder
          </Text>
          <View className="flex-1 justify-between flex-row">
            <Button
              className="w-2/5 h-2/4 ml-5"
              onPress={() => navigation.navigate(ScreenView.LOGINSCREEN)}
              funcao={<Text className="text-2xl font-bold ">Login</Text>}
            />

            <Button
              className=" w-2/5 h-2/4 mr-5"
              onPress={() => navigation.navigate(ScreenView.CADASTROSCREEN)}
              funcao={<Text className="text-2xl font-bold ">Cadastro</Text>}
            />
          </View>
        </Animatable.View>
      </View>
    </>
  );
};
export default Home;
