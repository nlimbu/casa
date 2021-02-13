import { ViewStyle } from "react-native"

export interface RowProps {
  /**
   * Style overrides for the icon image
   */
  style?: ViewStyle | ViewStyle[],

  children?: JSX.Element | JSX.Element[],

  onLayout?: () => {},

}
