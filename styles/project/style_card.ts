import { Dimensions } from 'react-native'
const windowWidth = Dimensions.get('window').width
// const windowHeight = Dimensions.get('window').height;
const cardStyle = {
  cardSquareSmall: {
    width: windowWidth * 0.25,
    height: windowWidth * 0.25,
  },
  cardSquareMedium: {
    width: windowWidth * 0.4,
    height: windowWidth * 0.4,
  },
  cardSquareLarge: {
    width: windowWidth * 0.7,
    height: windowWidth * 0.7,
  },
  cardRectFullMed: {
    width: '100%',
    height: 160,
  }
}

export { cardStyle }
