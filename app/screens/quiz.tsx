/* eslint-disable camelcase */
import React, { useEffect, useState, useRef } from "react"
import { View, SafeAreaView, FlatList, TouchableOpacity, Alert } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Header, Screen } from "components/index"
import { color } from "theme/index"
import _ from 'lodash'
import { Loading } from 'components/common'
// showLastCommitMessageForThisLibrary.js
import { create } from 'apisauce'
// import { v4 as uuidv4 } from 'uuid'
import Html from "react-native-render-html"

declare let Styles: any

export const Quiz = observer(function HomeScreen(props) {
  const navigation = useNavigation()
  const [quizData, setQuizData] = useState([])
  const [isFetchingQuizData, setFetchingQuizData] = useState(false)
  // define the api
  const api = create({
    baseURL: 'https://opentdb.com/api.php',
  })
  const getQuizQuestions = () => {
    return api.get('?amount=200&difficulty=hard&type=multiple')
  }
  useEffect(() => {
    setFetchingQuizData(true)
    getQuizQuestions().then(quiz => {
      let qNum = 1
      const shuffledData = _.map(_.get(quiz, 'data.results'), (question) => {
        question.choices = _.shuffle(_.concat(question.incorrect_answers, question.correct_answer))
        question.id = qNum++
        return question
      })
      console.log({ quiz, shuffledData })
      setQuizData(shuffledData)
    }).finally(() => setFetchingQuizData(false))
  }, [])

  return (
    <Screen nonScroll statusBar={'dark-content'} preset="scroll" backgroundColor={color.transparent}>
      <SafeAreaView style={Styles.flex}>
        <Header canGoBack navigation={navigation} />
        <View style={Styles.flex}>
          <FlatList
            keyExtractor={({ id }) => `${id}`}
            data={quizData}
            ListHeaderComponent={() => {
              return isFetchingQuizData ? <Loading/> : null
            }}
            renderItem={({ item }) => {
              return <MultipleChoiceQuestion question={item}/>
            }}
          />
        </View>
      </SafeAreaView>
    </Screen>
  )
})

type Question = {
  id: number,
  question: string,
  choices: string[],
  correct_answer: string
}
interface MultipleChoiceProp {
  question: Question
}

const MultipleChoiceQuestion: React.FC<MultipleChoiceProp> = (props: MultipleChoiceProp) => {
  const { question } = props
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const totalAttempts = useRef(0)
  return (
    <View style={Styles.ph10}>
      <Html source={{ html: `<h3>${question.id}. ${question.question}</h3>` }}/>
      <View>
        {_.map(question.choices, (choice) => {
          const isSelected = choice === selectedAnswer
          const isCorrectAnswer = question.correct_answer === selectedAnswer
          return (
            <TouchableOpacity key={choice} style={[Styles.p10, Styles.m10, Styles.br10, Styles.shadowBlackDark, isSelected ? isCorrectAnswer ? Styles.positiveGreenBG : Styles.errorBG : {}]} activeOpacity={0.7} onPress={() => {
              if (choice === selectedAnswer) return
              if (isCorrectAnswer) {
                Alert.alert('', 'Your answer is correct.')
                return
              }
              if (totalAttempts.current >= 2) {
                Alert.alert('', `Exceeded total number of attempts for question ${question.id}.`)
                return
              }
              totalAttempts.current++
              setSelectedAnswer(choice)
            }}>
              <Html source={{ html: `<span style=color:${isSelected ? 'white' : 'black'}>${choice}</span>` }}/>
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  )
}
