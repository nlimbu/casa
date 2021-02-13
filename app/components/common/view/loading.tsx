import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { LoadingProps } from '../props/loading.props'

declare let Styles: any
const Loading: React.FC<LoadingProps> = (props: LoadingProps) => (
  <View style={[Styles.justifyCenter, Styles.alignCenter, Styles.m10, props.style]}>
    <ActivityIndicator size={props.size} color={props.color}/>
    <Text style={Styles.mt5}>{props.loadingText}</Text>
  </View>
)

Loading.defaultProps = {
  size: 'large',
  color: 'black',
  loadingText: 'Loading...'
}

export { Loading }
