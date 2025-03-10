import { Button } from '@ui-kitten/components'
import React from 'react'
import { MyIcon } from './MyIcon'
import { StyleProp, ViewStyle } from 'react-native'

interface Props {
    iconName: any;
    style?: StyleProp<ViewStyle>;
    onPress: () => void;
}

export const Fab = ({ style, iconName, onPress }: Props) => {
  return (
    <Button style={[style, { shadowColor: 'black', shadowOffset: {
        width: 0, height: 10
    },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 3,
    borderRadius: 13,
 }]}
 accessoryLeft={<MyIcon name={iconName} white />}
 onPress={onPress}
  />
  )
}
