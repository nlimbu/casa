import React, { useEffect, useState } from "react"
import { View, Image, ImageStyle, SafeAreaView, Text, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Header, Screen, Wallpaper, Row } from "components/index"
import { color } from "theme/index"

declare let Styles: any
const ICON_WIDTH = 40
const ICON: ImageStyle = {
  height: ICON_WIDTH, width: ICON_WIDTH,
}
// the base styling for the TextInput

export const HomeScreen = observer(function HomeScreen(props) {
  const navigation = useNavigation()

  return (
    <Screen statusBar={'dark-content'} preset="scroll" backgroundColor={color.transparent}>
      <SafeAreaView >
        <Header />
        <View style={[Styles.justifyCenter, Styles.alignCenter]}><Image source={require('images/app_icon.png')} style={ICON}/>
          <Row style={[Styles.m10, Styles.justifyBetween]}>
            <TouchableOpacity style={[Styles.cardRectFullMed, Styles.br10, Styles.shadowBlackDark]} activeOpacity={0.6} onPress={() => { navigation.navigate('quizScreen') }}>
              <Image source={require('images/quiz.png')} style={[Styles.cardRectFullMed, Styles.br10]} resizeMode={'cover'}/>
              <View style={[Styles.shadowBlackDark, Styles.absPos, Styles.m5, Styles.r0, Styles.p5, Styles.bgInfoGreen, Styles.br5]}>
                <Text style={[Styles.textWhite, Styles.textCenter, Styles.semiBold]}>Take a random Quiz</Text>
              </View>
            </TouchableOpacity>
          </Row>
        </View>
      </SafeAreaView>
    </Screen>
  )
})
