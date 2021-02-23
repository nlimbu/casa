import React, { useState } from "react"
import { View, Image, ImageStyle, SafeAreaView, Text, TouchableOpacity, TextInput } from "react-native"
import { observer } from "mobx-react-lite"
import { Header, Screen, Row, Button } from "components/index"
import { color } from "theme/index"
import { Todo } from 'models/data/todos'
import _ from 'lodash'

declare let Styles: any
const ICON_WIDTH = 40
const ICON: ImageStyle = {
  height: ICON_WIDTH, width: ICON_WIDTH,
}

interface NavProps {
    route: any, navigation: any
}
// the base styling for the TextInput
export const Todos = observer(function TodoScreen({ route, navigation }: NavProps) {
//   const navigation = useNavigation()
  console.log({ navigation, route })
  const [todoText, setTodoText] = useState('')
  const { params: { todoList } } = route
  return (
    <Screen statusBar={'dark-content'} preset="scroll" backgroundColor={color.transparent}>
      <SafeAreaView >
        <Header canGoBack navigation={navigation} />
        <View style={[Styles.justifyCenter, Styles.alignCenter]}><Image source={require('images/app_icon.png')} style={ICON}/>
          <View style={[Styles.p10, Styles.fullWidth]}>
            <TextInput
              style={[Styles.bordered, Styles.mb10, Styles.p5]}
              value={todoText}
              onChangeText={text => setTodoText(text)}
            />
            <Button
              text="Add To Do"
              onPress={() => {
                if (_.size(todoText) < 1) return
                const newTodo = Todo.create({
                  task: todoText, completed: false
                })
                setTodoText('')
                todoList.add(newTodo)
              }}
            />
          </View>
          {_.map(todoList.list, ({ task }) => (
            <Text>{task}</Text>
          ))}
        </View>
      </SafeAreaView>
    </Screen>
  )
})
