import React from "react";
import { Text, View, TextInput } from "react-native";
import { Control, Controller, FieldErrors, FormState } from "react-hook-form";

interface ILoginFormProps {
  control: Control<any, any>;
  errors: any;
  name: string;
}

const LoginForm: React.FC<ILoginFormProps> = ({
  control,
  errors,
  name,
}: ILoginFormProps) => {
  return (
    <>
      <View className="flex-1 flex flex-col">
        <Text className="text-center pt-10 text-5xl text-green-500 font-bold">
          {name}
        </Text>
        <View className="flex justify-between py-5 px-5">
          <Text className="font-bold text-2xl ">E-mail</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Digite seu E-mail"
                className="border-b-4 border-b-green-800 py-2"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="login"
            rules={{ required: true }}
          />
          {errors.login && <Text>Adicione Login.</Text>}

          <Text className="font-bold text-2xl pt-5">Senha</Text>

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Digite sua senha"
                className="border-b-4 border-b-green-800 py-2"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="password"
            rules={{ required: true }}
          />
          {errors.password && <Text>Adicione Senha.</Text>}
        </View>
      </View>
    </>
  );
};
export default LoginForm;
