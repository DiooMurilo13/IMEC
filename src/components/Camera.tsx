import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { Camera, CameraType } from "expo-camera";

interface IProps {
  onPress: (e?: any) => void | Promise<void>;
}

function CameraComponent({ onPress }: IProps) {
  const [type, setType] = useState<CameraType>(Camera.Constants.Type.back);
  const [temPerm, setPerm] = useState(null);
  const [cameraRef, setCameraRef] = useState<Camera>(null);

  useEffect(() => {
    async function teste() {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status === "granted") {
        setPerm("granted");
      }
    }

    teste();
  }, []);

  if (temPerm === null) {
    return <View />;
  }
  if (temPerm === false) {
    return <Text>Acesso negado</Text>;
  }

  return (
    <View className="flex-1">
      <Camera
        className="flex-1"
        type={type}
        ref={(ref) => {
          setCameraRef(ref);
        }}
      >
        <View className="flex-1 bg-transparent flex-row">
          <TouchableOpacity
            className="w-2/5 flex-end justify-end"
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
          <TouchableOpacity
            className="w-3/6 flex-end justify-end"
            onPress={async () => {
              if (cameraRef) {
                let photo = await cameraRef.takePictureAsync();
                onPress(photo);
              }
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
              Tirar Foto
            </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

export default CameraComponent;
