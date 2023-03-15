import React from "react";
import { Text, View, KeyboardAvoidingView } from "react-native";
import { useForm } from "react-hook-form";
import * as Animatable from "react-native-animatable";
import LoginForm from "../../components/LoginForm";
import { Button } from "../../components/Button";
import { auth } from "../../firebase/Auth";
import { Database } from "../../firebase/FirebaseHelper";

const CadastroScreen: React.FC = () => {
  const database = new Database();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: "",
      password: "",
    },
  });

  async function onSubmit(data) {
    await database.cadastrar(data);
    await auth.signOut();
  }

  return (
    <View className="flex-1 flex-col justify-between bg-cyan-700">
      <Animatable.View
        className="flex h-1/5 items-start pl-5 pb-10 justify-end "
        animation={"fadeInLeft"}
      >
        <Text className="text-4xl font-bold">Bem Vindo(A)</Text>
      </Animatable.View>

      <Animatable.View
        delay={600}
        animation="fadeInUp"
        className="flex-1 bg-cyan-100 rounded-t-3xl"
      >
        <KeyboardAvoidingView
          className="flex-1"
          enabled={true}
          behavior={"height"}
        >
          <LoginForm name="Cadastro" control={control} errors={errors} />

          <View className="flex h-1/3 items-center justify-center text-center">
            <Button
              className="w-3/4 h-2/5"
              funcao={<Text className="text-2xl font-bold">Cadastrar</Text>}
              onPress={handleSubmit(onSubmit)}
            />
          </View>
        </KeyboardAvoidingView>
      </Animatable.View>
    </View>
  );
};

export default CadastroScreen;
