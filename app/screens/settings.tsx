import React from "react"
import { View, Image, ViewStyle, TextStyle, ImageStyle, SafeAreaView } from "react-native"
import { observer } from "mobx-react-lite"
import { Button, Header, Screen } from "components/index"
import { color, spacing, typography } from "theme/index"
declare const Styles: any

const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[4] + spacing[1],
  paddingHorizontal: 0,
}
const HEADER_TITLE: TextStyle = {
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}
const FULL: ViewStyle = { flex: 1 }

const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
}
const BOLD: TextStyle = { fontWeight: "bold" }

const CONTINUE: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: "#5D25",
  marginTop: spacing[8]
}

const JOIN: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  marginTop: spacing[4],
}

const CONTINUE_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}
const FOOTER: ViewStyle = { backgroundColor: "transparent" }
const FOOTER_CONTENT: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
}
const CONTENT_CENTER: ViewStyle = {
  justifyContent: 'center', alignItems: 'center'
}
const ICON_WIDTH = 40
const ICON: ImageStyle = {
  height: ICON_WIDTH, width: ICON_WIDTH,
}
// the base styling for the TextInput
const INPUT_STYLE: TextStyle = {
  fontFamily: typography.primary,
  color: 'black',
  marginTop: 5,
  borderRadius: 3,
  paddingLeft: 5
}

export const Settings = observer(function SettingsScreen(props: {logout: () => {}}) {
  return (
    <View testID="SignupScreen" style={[FULL, Styles.blueBackground]}>
      <Screen preset="scroll" backgroundColor={color.transparent}>
        <SafeAreaView style={FOOTER}>
          <Header headerTx="welcomeScreen.headerText" style={HEADER} titleStyle={HEADER_TITLE} />
          <View style={CONTENT_CENTER}><Image source={require('images/app_icon.png')} style={ICON}/>
            <Button
              testID="next-screen-button"
              style={CONTINUE}
              textStyle={CONTINUE_TEXT}
              text="Log Out"
              onPress={() => { props.logout() }}
            />
          </View>
        </SafeAreaView>
      </Screen>
    </View>
  )
})
