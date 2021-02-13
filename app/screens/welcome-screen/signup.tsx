import React, { useState } from "react"
import { View, Platform, ViewStyle, TextStyle, ImageStyle, SafeAreaView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Button, Header, Screen, Text, Wallpaper } from "components/index"
import { color, spacing, typography } from "../../theme"
import { TextField } from 'components/text-field/text-field'
import { Api } from "services/api"
import _ from 'lodash'

const bowserLogo = require("./bowser.png")
const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[4] + spacing[1],
  paddingHorizontal: spacing[4],
}
const HEADER_TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}
const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
}
const BOLD: TextStyle = { fontWeight: "bold" }

const CONTINUE: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: "#5D2555",
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
const FOOTER: ViewStyle = { }
const FOOTER_CONTENT: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
}
// the base styling for the TextInput
const INPUT_STYLE: TextStyle = {
  fontFamily: typography.primary,
  color: 'black',
  marginTop: 5,
  borderRadius: 3,
  paddingLeft: 5
}
const ERROR_STYLE: TextStyle = {
  fontFamily: typography.primary,
  color: 'red',
  padding: 5,
  backgroundColor: 'white'
}
type WelcomeScreenProps = {
  loggedIn: () => void,
}
export const SignupScreen = observer(function SignupScreen(props: WelcomeScreenProps) {
  const navigation = useNavigation()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const api = new Api()
  const signUp = async () => {
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match')
      return
    }
    await api.setup()
    const res = await api.registerUser(username, password)
    console.log({ res })
    if (res.ok) {
      props.loggedIn()
    }
    // error scenario
    _.forEach(res.data.errors, ({ msg, param }) => {
      if (param === 'username') setUsernameError(msg)
      if (param === 'password') setPasswordError(msg)
    })
  }
  return (
    <View testID="SignupScreen" style={FULL}>
      <Wallpaper />
      <Screen preset="scroll" backgroundColor={color.transparent}>
        <SafeAreaView style={FOOTER}>
          <Header leftIcon="back" onLeftPress={() => navigation.goBack()} headerTx="welcomeScreen.signUpHeader" style={HEADER} titleStyle={HEADER_TITLE} />
          <View style={FOOTER_CONTENT}>
            <TextField value={username} inputStyle={INPUT_STYLE} labelTx={'onboarding.username'} onChangeText={changedUsername => {
              setUsernameError('')
              setUsername(changedUsername)
            }}/>
            {usernameError ? <Text style={ERROR_STYLE}>{usernameError}</Text> : null}
            <TextField value={password} secureTextEntry inputStyle={INPUT_STYLE}labelTx={'onboarding.password'} onChangeText={changedPassword => {
              setPasswordError('')
              setPassword(changedPassword)
            }}/>
            {passwordError ? <Text style={ERROR_STYLE}>{passwordError}</Text> : null}
            <TextField value={confirmPassword} secureTextEntry inputStyle={INPUT_STYLE}labelTx={'onboarding.confirmpw'} onChangeText={pwConfirm => setConfirmPassword(pwConfirm)}/>
            <Button
              testID="next-screen-button"
              style={CONTINUE}
              textStyle={CONTINUE_TEXT}
              tx="welcomeScreen.continue"
              onPress={signUp}
            />
          </View>
        </SafeAreaView>
      </Screen>
    </View>
  )
})
