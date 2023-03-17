import React, { useState } from "react";
import { Text, View, TextInput, KeyboardAvoidingView } from "react-native";
import { Control, Controller, FieldErrors, FormState } from "react-hook-form";
import { TextInputMask } from "react-native-masked-text";
import DropDownPicker from "react-native-dropdown-picker";
import { Keyboard } from "react-native";

interface Form {
  control: Control<any, any>;
  errors: any;
  name: string;
}

const Form: React.FC<Form> = ({ control, errors, name }: Form) => {
  const [open, setOpen] = useState(false);
  const [values, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Cartão de Crédito", value: "CartaoCredito" },
    { label: "Cartão de Débito", value: "CartaoDebito" },
    { label: "Dinheiro", value: "Dinheiro" },
    { label: "Pix", value: "Pix" },
  ]);
  return (
    <>
      <View className="flex-1 flex flex-col">
        <KeyboardAvoidingView behavior={"position"} className="flex-1">
          <Text className="text-center pt-20 text-5xl text-green-500 font-bold">
            {name}
          </Text>
          <View className="flex justify-between py-5 px-5">
            <Text className="font-bold text-2xl ">Nome</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Digite o nome completo do cliente"
                  className="border-b-4 border-b-green-800 py-2"
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              )}
              name="nome"
              rules={{ required: true }}
            />
            {errors.nome && <Text>Adicione Nome.</Text>}

            <Text className="font-bold text-2xl pt-5">Telefone</Text>

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInputMask
                  className="border-b-4 border-b-green-800 py-2"
                  placeholder="Digite o nome completo do cliente"
                  onBlur={onBlur}
                  type={"cel-phone"}
                  options={{
                    maskType: "BRL",
                    withDDD: true,
                    dddMask: "(99) ",
                  }}
                  value={value}
                  onChangeText={(value) => onChange(value)}
                />
              )}
              name="telefone"
              rules={{ required: true, minLength: 15 }}
            />
            {errors.telefone && <Text>Adicione o Telefone.</Text>}

            <Text className="font-bold text-2xl pt-5">Endereço</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Digite o endereço completo do cliente"
                  className="border-b-4 border-b-green-800 py-2 mb-5"
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              )}
              name="endereco"
              rules={{ required: true }}
            />
            {errors.endereco && <Text>Adicione Endereco.</Text>}

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <DropDownPicker
                  style={{
                    backgroundColor: "#0E7491",
                    height: 80,
                  }}
                  onPress={() => Keyboard.dismiss()}
                  placeholder="Meios de pagamento"
                  onChangeValue={(value) => onChange(value)}
                  open={open}
                  value={values}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                />
              )}
              name="meioPagamento"
              rules={{ required: true }}
            />
            {errors.meioPagamento && <Text>Adicione o meio de pagamento.</Text>}
          </View>
        </KeyboardAvoidingView>
      </View>
    </>
  );
};
export default Form;
