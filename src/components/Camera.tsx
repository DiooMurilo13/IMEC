import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { Camera, CameraType } from "expo-camera";

const CameraComponent: React.FC = () => {
  const [type, setType] = useState<CameraType>(Camera.Constants.Type.back);
  const [temPerm, setPerm] = useState(null);

  useEffect(() => {
    async function teste() {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status === "granted") {
        setPerm("granted");
      }
    }

    teste();
  });

  if (temPerm === null) {
    return <View />;
  }
  if (temPerm === false) {
    return <Text>Acesso negado</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type}>
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            style={{ flex: 0.1, alignSelf: "flex-end", alignItems: "center" }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
              Flip
            </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

export default CameraComponent;
