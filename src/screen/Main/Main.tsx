import React from "react";
import { Text, View, KeyboardAvoidingView } from "react-native";
import { useForm } from "react-hook-form";
import * as Animatable from "react-native-animatable";
import LoginForm from "../../components/LoginForm";
import { Button } from "../../components/Button";
import { auth, cadastrar, logar } from "../../firebase/Auth";
import { useNavigation } from "@react-navigation/native";
import { ScreenView } from "../../@types/file";

const Main: React.FC = () => {
  const navigation = useNavigation();

  async function signOff() {
    await auth.signOut();
    navigation.navigate(ScreenView.HOME);
  }

  return (
    <View>
      <Text>Testeee</Text>
      <Button onPress={signOff} name="bah" />
    </View>
  );
};

export default Main;
