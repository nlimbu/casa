import { ViewStyle } from "react-native"

export interface LoadingProps {
  /**
   * Style overrides for the icon image
   */
  style?: ViewStyle | ViewStyle[],

  /**
   * Text to display underneath the activity indicator
   */
  loadingText?: string,

  /**
   * color for the activity indicator
   */
  color?: string,

  /**
   * size of the indicator: one of either small or large
   */
  size?: 'small' | 'large',

}
