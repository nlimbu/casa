// eslint-disable-next-line
import merge from 'lodash/merge';
import { StyleSheet } from 'react-native'
import { heroStyles } from './project/style_hero'
import { layoutStyle } from './project/style_layout'
import { formStyle } from './project/style_forms'
import { cardStyle } from './project/style_card'
import { shadowStyles } from './project/style_shadow'
import { textStyle } from './project/style_text'

window.Styles = StyleSheet.create(merge({},
  layoutStyle,
  heroStyles,
  formStyle,
  cardStyle,
  textStyle,
  shadowStyles,
  // eslint-disable-next-line
    // require('./project/style_platform'),
))
