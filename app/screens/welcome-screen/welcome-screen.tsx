import React, { useState } from "react"
import { Alert, View, Image, ViewStyle, TextStyle, ImageStyle, SafeAreaView, ActivityIndicator, Text } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Button, Header, Screen, Wallpaper } from "components/index"
import { color, spacing, typography } from "theme/index"
import { Api } from "services/api"
import _ from 'lodash'
// import Config from 'react-native-config'
import { TextField } from 'components/text-field/text-field'

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
const ERROR_STYLE: TextStyle = {
  fontFamily: typography.primary,
  color: 'red',
  padding: 5,
  backgroundColor: 'white'
}
type WelcomeScreenProps = {
  loggedIn: () => void,
}
export const WelcomeScreen = observer(function WelcomeScreen(props: WelcomeScreenProps) {
  const navigation = useNavigation()
  const signupScreen = () => navigation.navigate("signup")
  // define the api
  const api = new Api()
  const [username, setUsername] = useState(__DEV__ ? 'test@dev1.dev' : '')
  const [password, setPassword] = useState(__DEV__ ? 'Password1' : '')
  const [isLoggingIn, setLoggingIn] = useState(false)
  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const onLoginPressed = async () => {
    setLoggingIn(true)
    await api.setup()
    const res = await api.login(username, password)
    setLoggingIn(false)
    console.log(res)
    if (res.ok) {
      props.loggedIn()
    } else {
      const errors = _.get(res, 'data.errors')
      if (_.size(errors) > 0) {
        // error scenario
        _.forEach(_.get(res, 'data.errors'), ({ msg, param }) => {
          if (param === 'username') setUsernameError(msg)
          if (param === 'password') setPasswordError(msg)
        })
      } else {
        Alert.alert(`Login Error!`)
      }
    }
  }

  return (
    <View testID="loginScreen" style={FULL}>
      <Wallpaper />
      <Screen preset="scroll" backgroundColor={color.transparent}>
        <SafeAreaView style={FOOTER}>
          <Header headerTx="welcomeScreen.headerText" style={HEADER} titleStyle={HEADER_TITLE} />
          <View style={CONTENT_CENTER}><Image source={require('images/app_icon.png')} style={ICON}/></View>
          <View style={FOOTER_CONTENT}>
            <TextField value={username} onChangeText={changedUsername => {
              setUsernameError('')
              setUsername(changedUsername)
            }} inputStyle={INPUT_STYLE} labelTx={'onboarding.username'}/>
            {usernameError ? <Text style={ERROR_STYLE}>{usernameError}</Text> : null}
            <TextField value={password} onChangeText={changedPassword => {
              setPasswordError('')
              setPassword(changedPassword)
            }} secureTextEntry inputStyle={INPUT_STYLE} labelTx={'onboarding.password'}/>
            {passwordError ? <Text style={ERROR_STYLE}>{passwordError}</Text> : null}
            {isLoggingIn ? <View style={Styles.mt20}><ActivityIndicator size={'large'}/></View>
              : <><Button
                testID="loginButton"
                style={CONTINUE}
                textStyle={CONTINUE_TEXT}
                tx="onboarding.login"
                onPress={onLoginPressed}
              />
              <Button
                testID="joinButton"
                style={JOIN}
                textStyle={CONTINUE_TEXT}
                tx="onboarding.register"
                onPress={signupScreen}
              /></>}
          </View>
        </SafeAreaView>
      </Screen>
    </View>
  )
})
