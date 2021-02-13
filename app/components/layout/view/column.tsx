import React from 'react'
import { View } from 'react-native'
import { ColumnProps } from '../props/column.props'

declare let Styles: any
export const Column: React.FC<ColumnProps> = (props: ColumnProps) => (
  <View style={[Styles.column, props.style]}>{props.children}</View>
)
