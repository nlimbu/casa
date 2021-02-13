/**
 * The root navigator is used to switch between major navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow (which is contained in your PrimaryNavigator) which the user
 * will use once logged in.
 */
import React, { useState, useEffect } from "react"
import { NavigationContainer, NavigationContainerRef } from "@react-navigation/native"

import { createNativeStackNavigator } from "react-native-screens/native-stack"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeScreen, Settings, WelcomeScreen, SignupScreen, Quiz } from "../screens"
import { ActivityIndicator, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import AsyncStorage from '@react-native-community/async-storage'

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * We recommend using MobX-State-Tree store(s) to handle state rather than navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type RootParamList = {
  primaryStack: undefined
}

const iconForRoute = {
  Home: 'home',
  Settings: 'cog'
}
const Tab = createBottomTabNavigator()

const HomeStack = (props) => {
  const { logout } = props
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: function renderTabBarIcon({ color }) {
          return <Icon name={iconForRoute[route.name]} size={20} color={color} />
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Home">
        {props => <HomeScreen {...props} />}
      </Tab.Screen>
      <Tab.Screen name="Settings">
        {props => <Settings logout={logout} {...props} />}
      </Tab.Screen>
    </Tab.Navigator>
  )
}

export type PrimaryParamList = {
  welcome: undefined
  demo: undefined,
  signup: undefined,
  homeTabNav: undefined,
  quizScreen: undefined,
}
const Stack = createNativeStackNavigator<PrimaryParamList>()
const OnboardingStack = (props) => {
  const { loggedIn } = props
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        // stackPresentation: "modal",
      }}
    >
      <Stack.Screen name="welcome">
        {props => <WelcomeScreen loggedIn={loggedIn} {...props} />}
      </Stack.Screen>
      <Stack.Screen name="signup">
        {props => <SignupScreen loggedIn={loggedIn} {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  )
}

type AppMain = {
  logout: () => {}
}

const AppMain = (props: AppMain) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        // stackPresentation: "modal",
      }}
    >
      <Stack.Screen name="homeTabNav">
        {() => <HomeStack {...props} />}
      </Stack.Screen>
      <Stack.Screen name="quizScreen" component={Quiz}/>
    </Stack.Navigator>
  )
}

export const RootNavigator = React.forwardRef<
  NavigationContainerRef,
  Partial<React.ComponentProps<typeof NavigationContainer>>
>((props, ref) => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [loading, isLoading] = useState(true)
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('@bearer_token')
        if (token) {
          setLoggedIn(true)
        }
      } catch (e) {
        // saving error
      } finally {
        isLoading(false)
      }
    }
    checkToken()
  }, [])
  return (
    <NavigationContainer {...props} ref={ref}>
      {
        loading ? (<View><ActivityIndicator size={'large'}/></View>) : loggedIn
          ? <AppMain
            logout={async () => {
              await AsyncStorage.removeItem('@bearer_token')
              setLoggedIn(false)
            }}/>
          : <OnboardingStack loggedIn={() => setLoggedIn(true)}/>
      }
    </NavigationContainer>
  )
})

RootNavigator.displayName = "RootNavigator"
