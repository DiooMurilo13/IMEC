import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

const DropdownPicker = ({ options, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    onSelect(option);
  };

  return (
    <View className="bg-blue-700 rounded-2xl p-5">
      <Picker
        placeholder="Meios de Pagamentos"
        selectedValue={selectedOption}
        onValueChange={handleOptionSelect}
        style={styles.dropdown}
      >
        {options.map((option, index) => (
          <Picker.Item
            label={option}
            value={option}
            key={index}
            color={"blue"}
            style={styles.dropdown}
          />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    color: "#F2F2FD",
  },
});

export default DropdownPicker;
