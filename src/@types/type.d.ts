import { ScreenView } from "./file";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends ScreenView {
      [ScreenView.HOME]: string;
      [ScreenView.LOGINSCREEN]: string;
      [ScreenView.CADASTROSCREEN]: string;
      [ScreenView.MAIN]: string;
    }
  }
}
