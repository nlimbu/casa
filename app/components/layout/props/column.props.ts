import { ViewStyle } from "react-native"

export interface ColumnProps {
  /**
   * Style overrides for the icon image
   */
  style?: ViewStyle | ViewStyle[],

  children?: JSX.Element | JSX.Element[],

}
