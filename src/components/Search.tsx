import React, { useState } from "react";
import { TextInput, Button, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Search = ({ onSearch, name }) => {
  const [nome, setNome] = useState("");

  const handleNomeChange = (text) => {
    setNome(text);
    onSearch(text);
  };

  return (
    <View className="p-4 flex-row items-center justify-between mx-3 mb-5 border-black border-2 rounded-2xl">
      <TextInput
        className=" items-center font-bold text-2xl text-start justify-center flex-1"
        placeholderTextColor={"black"}
        placeholder={`Nome do ${name}`}
        caretHidden={true}
        value={nome}
        onChangeText={handleNomeChange}
      />
      <Icon name="magnify" size={30} />
    </View>
  );
};

export default Search;
