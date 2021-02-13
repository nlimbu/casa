import React from 'react'
import { View } from 'react-native'
import { RowProps } from '../props/row.props'

declare let Styles: any
export const Row: React.FC<RowProps> = (props: RowProps) => (
  <View style={[Styles.row, props.style]} onLayout={props.onLayout}>
    {props.children}
  </View>
)
