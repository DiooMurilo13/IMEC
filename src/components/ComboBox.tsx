import DropDownPicker from "react-native-dropdown-picker";
import React, { useState } from "react";
import { styled } from "nativewind";

const ComboBox: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Cartão de Crédito", value: "CartaoCredito" },
    { label: "Cartão de Débito", value: "CartaoDebito" },
    { label: "Dinheiro", value: "Dinheiro" },
    { label: "Pix", value: "Pix" },
  ]);

  return (
    <DropDownPicker
      style={{
        backgroundColor: "#0E7491",
        height: 80,
      }}
      placeholder="Meios de pagamento"
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
    />
  );
};

export default ComboBox;
