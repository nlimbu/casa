import React from "react"
import { View, ViewStyle, TextStyle, TouchableOpacity } from "react-native"
import { HeaderProps } from "./header.props"
import { Button } from "../button/button"
import { Text } from "../text/text"
import { Icon } from "../icon/icon"
import { spacing } from "../../theme"
import { translate } from "../../i18n/"
import FAIcon from 'react-native-vector-icons/FontAwesome5'
// static styles
const ROOT: ViewStyle = {
  flexDirection: "row",
  paddingHorizontal: spacing[4],
  alignItems: "center",
  paddingVertical: 10,
  justifyContent: "flex-start",
}
const TITLE: TextStyle = { textAlign: "center" }
const TITLE_MIDDLE: ViewStyle = { flex: 1, justifyContent: "center" }
const LEFT: ViewStyle = { width: 32 }
const RIGHT: ViewStyle = { width: 32 }

/**
 * Header that appears on many screens. Will hold navigation buttons and screen title.
 */
export function Header(props: HeaderProps) {
  const {
    onLeftPress,
    onRightPress,
    rightIcon,
    leftIcon,
    headerText,
    headerTx,
    style,
    titleStyle,
    navigation,
    canGoBack,
  } = props
  const header = headerText || (headerTx && translate(headerTx)) || ""

  return (
    <View style={{ ...ROOT, ...style }}>
      {
        canGoBack ? leftIcon ? (
          <Button preset="link" onPress={onLeftPress}>
            <Icon icon={leftIcon} />
          </Button>
        ) : (
          <TouchableOpacity style={LEFT} onPress={() => navigation.goBack()}>
            <FAIcon name={'chevron-left'} size={28} color={'black'}/>
          </TouchableOpacity>
        ) : <View style={LEFT}/>
      }
      <View style={TITLE_MIDDLE}>
        <Text style={{ ...TITLE, ...titleStyle }} text={header} />
      </View>
      {rightIcon ? (
        <Button preset="link" onPress={onRightPress}>
          <Icon icon={rightIcon} />
        </Button>
      ) : (
        <View style={RIGHT} />
      )}
    </View>
  )
}
