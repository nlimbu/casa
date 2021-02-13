import { Dimensions } from 'react-native'
// Precalculate Device Dimensions for better performance
const x = Dimensions.get('window').width

// Calculating ratio from iPhone breakpoints
const ratioX = x < 375 ? (x < 320 ? 0.75 : 0.875) : 1

// We set our base font size value
const baseUnit = 14
// We're simulating EM by changing font size according to Ratio
const unit = baseUnit * ratioX

// We add an em() shortcut function
const em = function (value) {
  return unit * value
}

const layoutStyle = {
  flex: {
    flex: 1
  },
  flexRow: { flexDirection: 'row' },
  maxZindex: { zIndex: 9999 },
  alignStart: {
    alignItems: 'flex-start',
  },
  row: {
    alignSelf: 'stretch',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
  },
  column: {
    flexDirection: 'column',
  },

  alignEnd: {
    alignItems: 'flex-end',
  },

  alignCenter: {
    alignItems: 'center',
  },

  justifySpaceAround: { justifyContent: 'space-around' },
  justifyBetween: { justifyContent: 'space-between' },

  alignSelfCenter: {
    alignSelf: 'center',
  },
  alignSelfStart: {
    alignSelf: 'flex-start'
  },
  alignSelfEnd: {
    alignSelf: 'flex-end'
  },
  absJustifyCenter: { position: 'absolute', justifyContent: 'center' },
  absRight: { position: 'absolute', right: 0 },
  absPos: { position: 'absolute' },

  justifyStart: {
    justifyContent: 'flex-start',
  },

  justifyEnd: {
    justifyContent: 'flex-end',
  },

  justifyCenter: {
    justifyContent: 'center',
  },
  bordered: { borderWidth: 1, borderColor: 'grey' },
  bottomCenterAbsView: { position: 'absolute', bottom: 0, left: 0, right: 0 },

  br5: { borderRadius: 5 },
  br10: { borderRadius: 10 },
  br15: { borderRadius: 15 },
  bbrr10: { borderBottomRightRadius: 10 },
  btrr10: { borderTopRightRadius: 10 },
  bblr10: { borderBottomLeftRadius: 10 },
  btlr10: { borderTopLeftRadius: 10 },
  noBorder: { borderWidth: 0 },
  borderWhite: { borderWidth: 1, borderColor: `white` },

  m0: { margin: 0 },
  m3: { margin: 3 },
  m5: { margin: em(0.5) },
  m10: { margin: em(1) },
  m15: { margin: em(1.5) },
  m20: { margin: em(2) },

  p0: { padding: em(0) },
  p5: { padding: em(0.5) },
  p10: { padding: em(1) },
  p15: { padding: em(1.5) },
  p20: { padding: em(2) },

  mb0: { marginBottom: 0 },
  mb3: { marginBottom: 3 },
  mb5: { marginBottom: em(0.5) },
  mb10: { marginBottom: em(1) },
  mb15: { marginBottom: em(1.5) },
  mb20: { marginBottom: em(2) },
  mb25: { marginBottom: em(2.5) },
  mb30: { marginBottom: em(3) },

  ml0: { marginLeft: 0 },
  ml5: { marginLeft: em(0.5) },
  ml10: { marginLeft: em(1) },
  ml15: { marginLeft: em(1.5) },
  ml20: { marginLeft: em(2) },
  ml30: { marginLeft: em(3) },

  mr0: { marginRight: 0 },
  mr5: { marginRight: em(0.5) },
  mr10: { marginRight: em(1) },
  mr15: { marginRight: em(1.5) },
  mr20: { marginRight: em(2) },

  mt0: { marginTop: 0 },
  mt5: { marginTop: em(0.5) },
  mt10: { marginTop: em(1) },
  mt15: { marginTop: em(1.5) },
  mt20: { marginTop: em(2) },
  mt30: { marginTop: em(3) },
  mt40: { marginTop: em(4) },

  mh0: { marginHorizontal: 0 },
  mh2: { marginHorizontal: em(0.2) },
  mh5: { marginHorizontal: em(0.5) },
  mh10: { marginHorizontal: em(1) },
  mh15: { marginHorizontal: em(1.5) },
  mh20: { marginHorizontal: em(2) },
  mh30: { marginHorizontal: em(3) },

  mv0: { marginVertical: 0 },
  mv5: { marginVertical: em(0.5) },
  mv10: { marginVertical: em(1) },
  mv15: { marginVertical: em(1.5) },
  mv20: { marginVertical: em(2) },
  mv25: { marginVertical: em(2.5) },
  mv30: { marginVertical: em(3) },

  pb0: { paddingBottom: 0 },
  pb5: { paddingBottom: em(0.5) },
  pb10: { paddingBottom: em(1) },
  pb15: { paddingBottom: em(1.5) },
  pb20: { paddingBottom: em(2) },
  pb30: { paddingBottom: em(3) },

  pl0: { paddingLeft: 0 },
  pl5: { paddingLeft: em(0.5) },
  pl10: { paddingLeft: em(1) },
  pl15: { paddingLeft: em(1.5) },
  pl20: { paddingLeft: em(2) },

  pr0: { paddingRight: 0 },
  pr5: { paddingRight: em(0.5) },
  pr10: { paddingRight: em(1) },
  pr15: { paddingRight: em(1.5) },
  pr20: { paddingRight: em(2) },

  pt0: { paddingTop: 0 },
  pt5: { paddingTop: em(0.5) },
  pt10: { paddingTop: em(1) },
  pt15: { paddingTop: em(1.5) },
  pt20: { paddingTop: em(2) },

  ph0: { paddingHorizontal: 0 },
  ph5: { paddingHorizontal: em(0.5) },
  ph10: { paddingHorizontal: em(1) },
  ph15: { paddingHorizontal: em(1.5) },
  ph20: { paddingHorizontal: em(2) },

  pv0: { paddingVertical: 0 },
  pv5: { paddingVertical: em(0.5) },
  pv7: { paddingVertical: em(0.7) },
  pv10: { paddingVertical: em(1) },
  pv15: { paddingVertical: em(1.5) },
  pv20: { paddingVertical: em(2) },

  r0: { right: 0 },
  l0: { left: 0 },
  t0: { top: 0 },
  b0: { bottom: 0 },
  l10: { left: 10 },
  r10: { right: 10 },
  r20: { right: 20 },
  b35: { bottom: 35 },
  b10: { bottom: 10 },
  b80: { bottom: 80 },
}
export { layoutStyle, em }
