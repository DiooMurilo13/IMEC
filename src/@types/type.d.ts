import { ScreenView } from "./file";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends ScreenView {
      [ScreenView.HOME]: string | params;
      [ScreenView.LOGINSCREEN]: string | params;
      [ScreenView.CADASTROSCREEN]: string | params;
      [ScreenView.MAIN]: string | params;
      [ScreenView.CARDHISTORY]: string | params;
      [ScreenView.ADDNEWCLIENT]: string | params;
    }
  }
}

declare module "expo-camera" {
  export type CameraConstantsType = {
    Type: {
      front: CameraType;
      back: CameraType;
    };
    FlashMode: {
      on: CameraFlashMode;
      off: CameraFlashMode;
      auto: CameraFlashMode;
      torch: CameraFlashMode;
    };
  };
}
